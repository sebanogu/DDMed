function normalizeTenantSlug(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function resolveTenantScopedMembership(memberships, tenantId) {
  if (!tenantId) {
    return null;
  }

  return memberships.find((membership) => membership.tenantId === tenantId) || null;
}

function evaluateTenantScopedLogin({ tenant, memberships }) {
  if (!tenant) {
    return {
      ok: false,
      statusCode: 404,
      error: 'tenant_not_found',
      message: 'The requested tenant does not exist.',
    };
  }

  const membership = resolveTenantScopedMembership(memberships, tenant.id);
  if (!membership) {
    return {
      ok: false,
      statusCode: 403,
      error: 'membership_not_found',
      message: 'The authenticated user does not belong to the requested tenant.',
    };
  }

  return {
    ok: true,
    membership,
  };
}

module.exports = {
  normalizeTenantSlug,
  resolveTenantScopedMembership,
  evaluateTenantScopedLogin,
};
