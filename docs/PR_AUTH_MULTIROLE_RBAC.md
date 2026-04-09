# PR: Implement tenant-aware auth with PostgreSQL RBAC

## Summary

This PR implements a first end-to-end slice of tenant-aware authentication and multi-role RBAC for the DDMed platform.

The implementation includes:

- PostgreSQL-backed persistence for users, tenants, memberships, roles, and sessions
- backend auth/session APIs
- tenant switching with recalculated effective permissions
- Angular auth state, token interceptor, guards, and protected routes
- protected workspace views for overview, admin, clinical, and support flows
- suspended-tenant blocking behavior
- development-only demo users when running the Docker development stack

## Backend

- Added PostgreSQL access via `pg`
- Added schema initialization and demo seed support
- Added auth/session endpoints:
  - `POST /api/auth/login`
  - `GET /api/auth/session`
  - `POST /api/auth/switch-tenant`
  - `POST /api/auth/logout`
  - `GET /api/auth/permission-matrix`
- Added protected workspace endpoints:
  - `GET /api/workspace/summary`
  - `GET /api/workspace/admin`
  - `GET /api/workspace/clinical`
  - `GET /api/workspace/support`

## Frontend

- Added login screen and auth state service
- Added auth token interceptor
- Added route guards for:
  - authentication
  - active tenant enforcement
  - permission checks
- Added access denied and tenant suspended screens
- Added lazy-loaded protected workspace module
- Added tenant switch and auth controls to the app shell

## Demo Users

Demo users are seeded only when development Docker Compose is used.

Available in dev:

- `alex.owner@ddmed.test` / `Demo123!`
- `bianca.admin@ddmed.test` / `Demo123!`
- `sam.support@ddmed.test` / `Demo123!`

Implementation detail:

- `infra/compose.yaml` sets `SEED_DEMO_AUTH=false`
- `infra/compose.dev.yaml` overrides it with `SEED_DEMO_AUTH=true`

## Validation

- `node --check backend/src/index.js`
- `node --check backend/src/auth-repository.js`
- `npm run build` in `frontend/`
- live auth flow verified against PostgreSQL:
  - login
  - session bootstrap
  - tenant switch
  - effective role/permission recalculation

## Notes

- Auth data is stored in PostgreSQL tables prefixed with `auth_`
- The current implementation uses seeded demo credentials and server-managed sessions
- This PR does not yet introduce an external identity provider such as Auth0 or Entra
