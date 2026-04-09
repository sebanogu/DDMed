# Authentication And Multi-Role Access Task

## Goal

Implement user authentication and role-based access control for the product, with support for multiple roles per user and tenant-aware access rules.

## Why

- The product needs authenticated access before exposing clinical or administrative workflows.
- Authorization must handle users who can operate in different capacities depending on tenant membership.
- The backend is expected to enforce authorization boundaries, not only the frontend.

## Scope

- Sign-in and sign-out flow.
- Session bootstrap for the frontend.
- Backend identity validation and session/user context resolution.
- Tenant-aware membership model.
- Support for multiple roles assigned to the same user.
- Route and feature authorization in the frontend.
- API authorization in the backend.
- Basic audit logging for authentication and authorization decisions.

## Out Of Scope

- Billing and subscription enforcement beyond role checks.
- Full enterprise SSO unless explicitly chosen as the primary auth strategy.
- Support impersonation unless fully audited and separately approved.

## Proposed Role Model

- `owner`
- `admin`
- `clinician`
- `staff`
- `support`

Notes:

- A single user may have multiple roles in the same tenant.
- A single user may belong to multiple tenants.
- Effective permissions should be derived from tenant membership plus assigned roles.

## Tasks

- Choose the authentication strategy for MVP:
  - preferred candidates: Auth0, Microsoft Entra External ID, or Firebase Auth if the current stack must stay lightweight
- Define the canonical identity model:
  - `user`
  - `tenant`
  - `membership`
  - `role`
  - `session`
- Define how multiple roles are stored:
  - join table or membership record with a role collection
- Define permission rules for each protected feature and API path.
- Implement backend session bootstrap endpoint returning:
  - authenticated user
  - active tenant
  - available tenant memberships
  - effective roles
  - core permissions
- Implement frontend auth state service and route guards.
- Make protected screens URL-driven and deny access based on resolved permissions.
- Add login, logout, session restore, and unauthorized states to the app shell.
- Enforce authorization in backend handlers and service layer.
- Add invitation flow for tenant admins to add users to a tenant.
- Add audit events for:
  - sign-in
  - sign-out
  - invitation accepted
  - authorization denied
  - role assignment changed
- Add automated tests for auth and authorization behavior.

## Deliverables

- Auth architecture decision note
- Data model for users, tenants, memberships, and roles
- Frontend auth shell and route protection
- Backend authorization enforcement
- Role/permission matrix
- Test coverage for multi-role access scenarios

## GitHub Issue Draft

### Title

`Implement tenant-aware authentication and multi-role RBAC`

### Labels

- `auth`
- `backend`
- `frontend`
- `security`
- `saas`

### Body

```md
## Goal
Implement authentication and tenant-aware role-based access control with support for multiple roles per user.

## Problem
The product currently lacks an end-to-end authenticated access model. We need protected access for clinical and administrative workflows, and the authorization model must support users with multiple roles and memberships across tenants.

## Scope
- Sign-in and sign-out
- Session bootstrap
- Tenant-aware membership model
- Multi-role authorization
- Frontend route and feature guards
- Backend authorization enforcement
- Invitation flow for tenant users
- Audit events for auth/access actions

## Role Model
- owner
- admin
- clinician
- staff
- support

## Acceptance Criteria
- Users must authenticate before entering protected areas.
- A user can hold multiple roles in the same tenant.
- A user can belong to multiple tenants.
- Effective permissions are recalculated when the active tenant changes.
- Frontend guards must reflect effective permissions.
- Backend APIs must reject unauthorized access independently of the frontend.
- Suspended tenants are blocked with a clear UI state.
- Auth and authorization decisions generate audit events.

## Deliverables
- Auth architecture note
- Membership and role data model
- Frontend auth state and route protection
- Backend authorization middleware/guards
- Permission matrix
- Tests for multi-role and multi-tenant scenarios
```

## Implementation Subtasks

### 1. Architecture And Identity Decisions

- [ ] Choose the MVP auth provider and session strategy.
- [ ] Define whether sessions are cookie-based, token-based, or hybrid.
- [ ] Document user, tenant, membership, role, and session entities.
- [ ] Define how active tenant selection is stored and resolved.
- [ ] Produce a role-permission matrix for all protected features and API paths.

### 2. Backend Identity Foundation

- [ ] Add backend auth module scaffold.
- [ ] Implement identity validation against the chosen auth provider.
- [ ] Implement session bootstrap endpoint returning user, memberships, active tenant, effective roles, and permissions.
- [ ] Add membership schema supporting multiple roles per tenant.
- [ ] Add suspended-tenant enforcement in request processing.

### 3. Backend Authorization Enforcement

- [ ] Add reusable authorization guards/middleware/policies.
- [ ] Enforce tenant context on protected endpoints.
- [ ] Enforce role/permission checks at service or controller boundary.
- [ ] Reject unauthorized access with consistent error payloads.
- [ ] Add audit events for login, logout, denied access, invitation acceptance, and role changes.

### 4. Frontend Authentication Shell

- [ ] Add auth state service for session bootstrap and session restoration.
- [ ] Add login and logout flow to the application shell.
- [ ] Add unauthorized and suspended-tenant states.
- [ ] Keep protected product areas outside the root shell unless needed for first paint.
- [ ] Ensure protected screens remain URL-driven after refresh.

### 5. Frontend Authorization

- [ ] Add route guards for authentication and permissions.
- [ ] Add permission-aware navigation rendering.
- [ ] Hide or disable unauthorized actions in UI.
- [ ] Add active tenant selection handling if MVP supports multi-tenant operators.
- [ ] Ensure tenant switch recalculates effective permissions without stale UI state.

### 6. Invitations And Membership Management

- [ ] Define invitation lifecycle: invited, accepted, revoked, expired.
- [ ] Allow tenant admins to invite users.
- [ ] Link accepted invitations to the correct identity record.
- [ ] Support role assignment updates on membership.
- [ ] Prevent orphaned or duplicate memberships.

### 7. Testing

- [ ] Add unit tests for permission resolution and effective-role computation.
- [ ] Add integration tests for protected backend endpoints.
- [ ] Add frontend tests for login redirect and unauthorized routes.
- [ ] Add test cases for one user with multiple roles in one tenant.
- [ ] Add test cases for one user across multiple tenants.

## Acceptance Criteria

- Users must sign in before accessing protected application areas.
- The system must support a user having more than one role in the same tenant.
- The system must support a user belonging to more than one tenant.
- The frontend must hide or disable unauthorized actions based on effective permissions.
- The backend must reject unauthorized API access even if the frontend is bypassed.
- Refreshing the browser must restore the authenticated session correctly when valid.
- Switching active tenant must recalculate effective roles and permissions.
- Suspended tenants must be blocked from protected workflows with a clear user-facing state.
- Authentication and authorization decisions must generate auditable events.

## Suggested Technical Breakdown

### Backend

- Add identity and membership schema.
- Validate external identity tokens or sessions.
- Resolve active tenant and effective roles on every protected request.
- Centralize permission checks in reusable guards/middleware/policies.

### Frontend

- Create lazy-loaded authenticated product areas where appropriate.
- Add auth bootstrap on app startup.
- Add route guards based on authentication and permission requirements.
- Add tenant switcher only if the product allows multi-tenant operators in MVP.

### Testing

- Unit tests for permission resolution.
- Integration tests for protected API paths.
- UI tests for login redirect, unauthorized screens, and role-based navigation.

## Risks

- Frontend-only role checks would create a false sense of security.
- Role names without a permission matrix usually lead to inconsistent enforcement.
- Multi-role support becomes fragile if the active tenant context is not explicit in every request.
- Invitation flows can introduce orphaned memberships if identity linking is not defined early.

## Done When

- Authentication works end to end in local development.
- Protected routes and APIs are enforced with tenant-aware effective permissions.
- A user with multiple roles behaves correctly in at least one tested tenant scenario.
- The role/permission model is documented and no protected path relies only on UI hiding.

## Related Project Context

- [SAAS_HOSTING_ROADMAP.md](/C:/dev/DDMed/docs/SAAS_HOSTING_ROADMAP.md)
- [COMPOSE_MVP_EXECUTION_PLAN.md](/C:/dev/DDMed/docs/COMPOSE_MVP_EXECUTION_PLAN.md)
- [README.md](/C:/dev/DDMed/backend/README.md)
- [create-auth-multirole-issue.ps1](/C:/dev/DDMed/scripts/create-auth-multirole-issue.ps1)
