export interface TenantMembership {
  tenantId: string;
  tenantName: string;
  tenantStatus: 'active' | 'suspended' | 'trial' | 'cancelled' | string;
  roles: string[];
  permissions: string[];
}

export interface ActiveTenantContext {
  tenantId: string;
  tenantName: string;
  tenantStatus: TenantMembership['tenantStatus'];
}

export interface SessionUser {
  id: string;
  email: string;
  displayName: string;
}

export interface SessionContext {
  user: SessionUser;
  memberships: TenantMembership[];
  activeTenant: ActiveTenantContext | null;
  effectiveRoles: string[];
  effectivePermissions: string[];
  availableRoles: string[];
}

export interface AuthResponse {
  token: string;
  session: SessionContext;
}

export interface SessionResponse {
  session: SessionContext;
}

export interface WorkspaceSummary {
  tenant: ActiveTenantContext | null;
  user: SessionUser;
  effectiveRoles: string[];
  effectivePermissions: string[];
  highlights: string[];
}
