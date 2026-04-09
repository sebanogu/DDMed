# SaaS Hosting Roadmap

## Goal

Move the current demonstrator into a hostable, scalable multi-tenant SaaS for clinics, with a clear path from the current Angular codebase to production deployment.

## Working Assumptions

- The current Angular application remains the starting point for the frontend.
- The target product is a subscription SaaS for multiple clinics.
- Tenant isolation, billing, authentication, auditability, and deployment automation are mandatory.
- The first production target should optimize for speed of delivery, not maximum enterprise isolation.

## Recommended Target Architecture

- Frontend: Angular application
- Backend: separate API service
- Database: PostgreSQL
- Auth: organization-aware identity provider
- Billing: subscription platform
- Hosting: managed container platform plus CDN/static hosting
- CI/CD: automated build and deployment pipelines

## Phase 0: Discovery And Scope

- Define the actual product boundary:
  - what parts of the current demo app will become the SaaS product
  - what parts stay as demos, experiments, or internal tools
- Identify the primary user types:
  - clinic admin
  - clinician
  - support/admin operator
- Decide the first paid offering:
  - single plan MVP or multiple plans
  - monthly or annual billing
- Define the first regulated data boundary:
  - no clinical PHI in MVP
  - limited patient data
  - full clinical records
- Create the first system inventory:
  - current frontend modules
  - current external APIs
  - current Firebase usage
  - current scripts and report generation dependencies

## Phase 1: Product And Tenant Model

- Define the tenant model:
  - one clinic = one tenant
  - optional multi-site clinic support
- Define user-to-tenant relationships:
  - single-tenant users only
  - multi-tenant operator accounts
- Define core entities:
  - tenant
  - subscription
  - user
  - membership
  - plan
  - feature flag
  - audit event
- Define tenant lifecycle:
  - trial
  - active
  - suspended
  - canceled
- Define role model:
  - owner
  - admin
  - clinician
  - staff
  - support

## Phase 2: Architecture Decisions

- Choose the production platform:
  - preferred: GCP with Cloud Run + Cloud SQL + Firebase Hosting
  - alternative: Azure with Container Apps/App Service + PostgreSQL
- Choose the backend stack:
  - NestJS if you want alignment with TypeScript/Angular
  - FastAPI if you want faster backend iteration in Python
- Choose the identity platform:
  - Microsoft Entra External ID for B2B-heavy clinics
  - Auth0 if you want faster SaaS auth setup
- Choose the billing platform:
  - Stripe Billing
- Choose observability baseline:
  - application logs
  - request tracing
  - error tracking
  - audit logs

## Phase 3: Frontend Restructuring

- Separate product modules from demo modules.
- Keep the root shell small.
- Move non-core screens out of `AppModule` where appropriate.
- Convert product feature areas into lazy-loaded modules consistently.
- Create a clear app navigation structure for SaaS users.
- Remove or isolate experimental areas:
  - games
  - internal demos
  - showcase-only screens
- Introduce application layout for authenticated users:
  - tenant-aware header
  - organization switcher if needed
  - account and billing access

## Phase 4: Backend Foundation

- Create a separate backend service repository or backend folder.
- Implement core APIs:
  - auth/session bootstrap
  - tenants
  - memberships
  - subscriptions
  - billing webhooks
  - audit events
- Introduce service boundaries:
  - identity/access
  - tenant management
  - billing
  - clinical/domain services
- Implement configuration management:
  - environment-based config
  - secrets handling
  - per-environment URLs and keys

## Phase 5: Data Model And Multi-Tenancy

- Design PostgreSQL schema with tenant awareness from day one.
- Add `tenant_id` to every tenant-owned table.
- Define which tables are:
  - global
  - tenant-scoped
  - internal/admin only
- Implement authorization rules in the backend for every query path.
- Add migration tooling.
- Add seed data for local development.
- Decide future isolation path:
  - shared database, shared schema for MVP
  - schema-per-tenant or database-per-tenant for enterprise tiers later

## Phase 6: Authentication And Access Control

- Implement sign-in and tenant resolution.
- Support invitation flow for clinic staff.
- Implement role-based access control.
- Support suspended tenant behavior.
- Add support/admin impersonation rules only if fully audited.
- Define passwordless, SSO, or email/password strategy.

## Phase 7: Billing And Memberships

- Create pricing model.
- Implement subscription creation and checkout.
- Sync billing state into your application database.
- Add webhook processing for:
  - subscription created
  - payment succeeded
  - payment failed
  - cancellation
  - trial ending
- Gate features by subscription status and plan.
- Add billing/admin screens in the app.

## Phase 8: Compliance, Security, And Auditability

- Define the compliance target:
  - internal only
  - GDPR-aware
  - HIPAA-like requirements
  - country-specific health regulations
- Add structured audit logging.
- Encrypt secrets and sensitive data.
- Review tenant data access paths.
- Add backup and restore policy.
- Add retention and deletion policy.
- Add admin action tracking.
- Review third-party vendors for data handling impact.

## Phase 9: DevOps And Environments

- Create environment strategy:
  - local
  - dev
  - staging
  - production
- Set up CI/CD:
  - frontend build
  - backend build
  - test runs
  - deployment pipeline
- Set up managed infrastructure:
  - frontend hosting
  - API hosting
  - database
  - secrets
  - DNS
  - TLS certificates
- Add infrastructure-as-code.
- Add release versioning and rollback strategy.

## Phase 10: Monitoring And Support Readiness

- Add uptime monitoring.
- Add error tracking.
- Add metrics dashboard.
- Add alerts for:
  - failed deployments
  - elevated error rates
  - billing webhook failures
  - database saturation
- Document operational runbooks.

## Phase 11: Production Launch Checklist

- Confirm tenant onboarding flow works end to end.
- Confirm payment and plan changes work end to end.
- Confirm access control boundaries between clinics.
- Confirm database backups and restore process.
- Confirm logging, monitoring, and alerts.
- Confirm legal pages:
  - terms
  - privacy
  - data processing terms if needed
- Confirm support process and admin tooling.

## Immediate Next Steps For This Repository

These are the highest-value tasks from the current state:

1. Decide which existing modules are product candidates and which are demos only.
2. Define the first tenant model and pricing model in writing.
3. Choose the target cloud and backend stack.
4. Extract a product-focused frontend navigation and route map.
5. Design the backend service and PostgreSQL schema.
6. Move authentication, billing, and tenant state out of the frontend-only architecture.
7. Create deployment pipelines for a first non-production environment.

## Suggested Delivery Sequence

1. Product definition
2. Target architecture
3. Frontend cleanup
4. Backend foundation
5. Multi-tenant database model
6. Auth and access control
7. Billing integration
8. Staging deployment
9. Security and audit hardening
10. Production launch
