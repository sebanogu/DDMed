const crypto = require('crypto');
const { query, withTransaction } = require('./db');
const { buildPermissions } = require('./permissions');

function mapMembershipRows(rows) {
  const membershipsByTenant = new Map();

  for (const row of rows) {
    if (!membershipsByTenant.has(row.tenant_id)) {
      membershipsByTenant.set(row.tenant_id, {
        tenantId: row.tenant_id,
        tenantName: row.tenant_name,
        tenantStatus: row.tenant_status,
        roles: [],
      });
    }

    membershipsByTenant.get(row.tenant_id).roles.push(row.role_name);
  }

  return Array.from(membershipsByTenant.values())
    .map((membership) => ({
      ...membership,
      roles: membership.roles.sort(),
      permissions: buildPermissions(membership.roles),
    }))
    .sort((a, b) => a.tenantName.localeCompare(b.tenantName));
}

async function ensureSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS auth_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      display_name TEXT NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auth_tenants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('trial', 'active', 'suspended', 'cancelled'))
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auth_memberships (
      user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
      tenant_id TEXT NOT NULL REFERENCES auth_tenants(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id, tenant_id)
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auth_membership_roles (
      user_id TEXT NOT NULL,
      tenant_id TEXT NOT NULL,
      role_name TEXT NOT NULL,
      PRIMARY KEY (user_id, tenant_id, role_name),
      FOREIGN KEY (user_id, tenant_id) REFERENCES auth_memberships(user_id, tenant_id) ON DELETE CASCADE
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES auth_users(id) ON DELETE CASCADE,
      active_tenant_id TEXT REFERENCES auth_tenants(id) ON DELETE SET NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function seedDemoData() {
  const users = [
    {
      id: 'user-alex',
      email: 'alex.owner@ddmed.test',
      password: 'Demo123!',
      displayName: 'Alex Owner',
      memberships: [
        { tenantId: 'tenant-north', roles: ['owner', 'clinician'] },
        { tenantId: 'tenant-south', roles: ['staff'] },
      ],
    },
    {
      id: 'user-bianca',
      email: 'bianca.admin@ddmed.test',
      password: 'Demo123!',
      displayName: 'Bianca Admin',
      memberships: [
        { tenantId: 'tenant-north', roles: ['admin'] },
        { tenantId: 'tenant-east', roles: ['clinician', 'staff'] },
      ],
    },
    {
      id: 'user-sam',
      email: 'sam.support@ddmed.test',
      password: 'Demo123!',
      displayName: 'Sam Support',
      memberships: [
        { tenantId: 'tenant-north', roles: ['support'] },
        { tenantId: 'tenant-east', roles: ['support', 'staff'] },
      ],
    },
  ];

  const tenants = [
    { id: 'tenant-north', name: 'North Clinic', status: 'active' },
    { id: 'tenant-south', name: 'South Clinic', status: 'suspended' },
    { id: 'tenant-east', name: 'East Clinic', status: 'active' },
  ];

  await withTransaction(async (client) => {
    for (const tenant of tenants) {
      await client.query(
        `INSERT INTO auth_tenants (id, name, status)
         VALUES ($1, $2, $3)
         ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status`,
        [tenant.id, tenant.name, tenant.status]
      );
    }

    for (const user of users) {
      const passwordHash = crypto.createHash('sha256').update(user.password).digest('hex');
      await client.query(
        `INSERT INTO auth_users (id, email, password_hash, display_name)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE
         SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash, display_name = EXCLUDED.display_name`,
        [user.id, user.email, passwordHash, user.displayName]
      );

      for (const membership of user.memberships) {
        await client.query(
          `INSERT INTO auth_memberships (user_id, tenant_id)
           VALUES ($1, $2)
           ON CONFLICT (user_id, tenant_id) DO NOTHING`,
          [user.id, membership.tenantId]
        );

        for (const role of membership.roles) {
          await client.query(
            `INSERT INTO auth_membership_roles (user_id, tenant_id, role_name)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, tenant_id, role_name) DO NOTHING`,
            [user.id, membership.tenantId, role]
          );
        }
      }
    }
  });
}

async function clearDemoSessions() {
  await query(`
    DELETE FROM auth_sessions
    WHERE user_id IN ('user-alex', 'user-bianca', 'user-sam')
  `);
}

async function findUserByCredentials(email, password) {
  const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
  const result = await query(
    `SELECT id, email, display_name
     FROM auth_users
     WHERE LOWER(email) = LOWER($1) AND password_hash = $2`,
    [email, passwordHash]
  );
  return result.rows[0] || null;
}

async function findUserById(userId) {
  const result = await query(
    `SELECT id, email, display_name
     FROM auth_users
     WHERE id = $1`,
    [userId]
  );
  return result.rows[0] || null;
}

async function getUserMemberships(userId) {
  const result = await query(
    `SELECT
       t.id AS tenant_id,
       t.name AS tenant_name,
       t.status AS tenant_status,
       r.role_name
     FROM auth_memberships m
     JOIN auth_tenants t ON t.id = m.tenant_id
     JOIN auth_membership_roles r ON r.user_id = m.user_id AND r.tenant_id = m.tenant_id
     WHERE m.user_id = $1
     ORDER BY t.name, r.role_name`,
    [userId]
  );

  return mapMembershipRows(result.rows);
}

async function createSession(userId, activeTenantId) {
  const token = crypto.randomUUID();
  await query(
    `INSERT INTO auth_sessions (token, user_id, active_tenant_id)
     VALUES ($1, $2, $3)`,
    [token, userId, activeTenantId]
  );
  return token;
}

async function getSession(token) {
  const result = await query(
    `SELECT token, user_id, active_tenant_id, created_at
     FROM auth_sessions
     WHERE token = $1`,
    [token]
  );
  return result.rows[0] || null;
}

async function updateSessionTenant(token, tenantId) {
  await query(
    `UPDATE auth_sessions
     SET active_tenant_id = $2
     WHERE token = $1`,
    [token, tenantId]
  );
}

async function deleteSession(token) {
  await query(`DELETE FROM auth_sessions WHERE token = $1`, [token]);
}

module.exports = {
  ensureSchema,
  seedDemoData,
  findUserByCredentials,
  findUserById,
  getUserMemberships,
  createSession,
  getSession,
  updateSessionTenant,
  deleteSession,
  clearDemoSessions,
};
