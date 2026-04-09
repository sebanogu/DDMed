const rolePermissions = {
  owner: [
    'workspace.view',
    'tenant.read',
    'tenant.manage',
    'membership.invite',
    'clinical.read',
    'clinical.write',
  ],
  admin: [
    'workspace.view',
    'tenant.read',
    'tenant.manage',
    'membership.invite',
    'clinical.read',
  ],
  clinician: [
    'workspace.view',
    'clinical.read',
    'clinical.write',
  ],
  staff: [
    'workspace.view',
    'clinical.read',
  ],
  support: [
    'workspace.view',
    'tenant.read',
    'support.access',
  ],
};

function buildPermissions(roles) {
  return Array.from(new Set(roles.flatMap((role) => rolePermissions[role] || []))).sort();
}

module.exports = {
  rolePermissions,
  buildPermissions,
};
