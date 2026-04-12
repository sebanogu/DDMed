const test = require('node:test');
const assert = require('node:assert/strict');

const {
  evaluateTenantScopedLogin,
  normalizeTenantSlug,
  resolveTenantScopedMembership,
} = require('./auth-login');

test('normalizeTenantSlug trims and lowercases tenant slugs', () => {
  assert.equal(normalizeTenantSlug(' North-Clinic '), 'north-clinic');
  assert.equal(normalizeTenantSlug(null), '');
});

test('resolveTenantScopedMembership only returns memberships from the requested tenant', () => {
  const memberships = [
    { tenantId: 'tenant-north', tenantName: 'North Clinic' },
    { tenantId: 'tenant-south', tenantName: 'South Clinic' },
  ];

  assert.deepEqual(resolveTenantScopedMembership(memberships, 'tenant-south'), memberships[1]);
  assert.equal(resolveTenantScopedMembership(memberships, 'tenant-east'), null);
});

test('evaluateTenantScopedLogin rejects unknown tenants without falling back', () => {
  const result = evaluateTenantScopedLogin({
    tenant: null,
    memberships: [{ tenantId: 'tenant-north', tenantName: 'North Clinic' }],
  });

  assert.equal(result.ok, false);
  assert.equal(result.statusCode, 404);
  assert.equal(result.error, 'tenant_not_found');
});

test('evaluateTenantScopedLogin rejects users without membership in the requested tenant', () => {
  const result = evaluateTenantScopedLogin({
    tenant: { id: 'tenant-east', slug: 'east-clinic', name: 'East Clinic' },
    memberships: [{ tenantId: 'tenant-north', tenantName: 'North Clinic' }],
  });

  assert.equal(result.ok, false);
  assert.equal(result.statusCode, 403);
  assert.equal(result.error, 'membership_not_found');
});

test('evaluateTenantScopedLogin returns the matching membership for valid tenant-scoped logins', () => {
  const membership = { tenantId: 'tenant-north', tenantName: 'North Clinic' };
  const result = evaluateTenantScopedLogin({
    tenant: { id: 'tenant-north', slug: 'north-clinic', name: 'North Clinic' },
    memberships: [membership],
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.membership, membership);
});
