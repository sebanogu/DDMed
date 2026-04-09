param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$labelsToEnsure = @(
  'saas',
  'roadmap',
  'product',
  'frontend',
  'backend',
  'database',
  'auth',
  'billing',
  'security',
  'devops',
  'operations',
  'launch',
  'phase-0',
  'phase-1',
  'phase-2',
  'phase-3',
  'phase-4',
  'phase-5',
  'phase-6',
  'phase-7',
  'phase-8',
  'phase-9',
  'phase-10',
  'phase-11'
)

$issues = @(
  @{
    Title = 'SaaS Phase 0: Define product scope and product boundary'
    Labels = @('saas', 'roadmap', 'product', 'phase-0')
    Body = @"
## Goal
Decide which parts of the current repository become the product and which remain demos, experiments, or internal tooling.

## Tasks
- Review existing Angular modules and classify them as product, demo, or internal.
- Define the primary SaaS use case for clinics.
- Define the first paid offering and the MVP scope.
- Define whether the MVP will include clinical data, limited patient data, or no PHI.
- Document the target user types: clinic admin, clinician, support/admin operator.

## Deliverables
- Written product boundary document
- MVP feature list
- Module classification list

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 0
"@
  }
  @{
    Title = 'SaaS Phase 1: Define tenant model, roles, and lifecycle'
    Labels = @('saas', 'roadmap', 'product', 'phase-1')
    Body = @"
## Goal
Define the multi-tenant model for clinics and the core user/role structure.

## Tasks
- Define tenant = clinic model.
- Decide whether multi-site clinics are supported in MVP.
- Define user-to-tenant relationships.
- Define tenant lifecycle states: trial, active, suspended, canceled.
- Define role model: owner, admin, clinician, staff, support.
- Define the core entities: tenant, subscription, user, membership, plan, feature flag, audit event.

## Deliverables
- Tenant model document
- Role and permission matrix
- Core entity list

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 1
"@
  }
  @{
    Title = 'SaaS Phase 2: Choose target cloud, backend stack, auth, and billing'
    Labels = @('saas', 'roadmap', 'backend', 'auth', 'billing', 'devops', 'phase-2')
    Body = @"
## Goal
Lock the platform choices needed to build and host the SaaS.

## Tasks
- Choose hosting platform:
  - Preferred: GCP with Cloud Run + Cloud SQL + Firebase Hosting
  - Alternative: Azure with Container Apps/App Service + PostgreSQL
- Choose backend stack:
  - NestJS
  - FastAPI
- Choose identity provider:
  - Microsoft Entra External ID
  - Auth0
- Choose billing platform:
  - Stripe Billing
- Define baseline observability requirements.

## Deliverables
- Architecture decision record
- Initial target architecture diagram

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 2
"@
  }
  @{
    Title = 'SaaS Phase 3: Restructure Angular frontend for product mode'
    Labels = @('saas', 'roadmap', 'frontend', 'phase-3')
    Body = @"
## Goal
Refactor the current Angular app so it can serve as the product frontend instead of a mixed demo shell.

## Tasks
- Separate product modules from demos and experiments.
- Keep the root shell small.
- Move non-core screens out of `AppModule`.
- Convert product feature areas into lazy-loaded modules consistently.
- Create a clear authenticated SaaS navigation structure.
- Isolate or remove showcase-only areas such as games and experimental demos.
- Add tenant-aware application layout.

## Deliverables
- Product route map
- Updated frontend module boundaries
- Reduced root module surface area

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 3
"@
  }
  @{
    Title = 'SaaS Phase 4: Create backend foundation and core APIs'
    Labels = @('saas', 'roadmap', 'backend', 'phase-4')
    Body = @"
## Goal
Introduce a proper backend service for tenant, auth, billing, and business logic.

## Tasks
- Create a separate backend service or backend workspace.
- Implement APIs for:
  - auth/session bootstrap
  - tenants
  - memberships
  - subscriptions
  - billing webhooks
  - audit events
- Define service boundaries.
- Add environment-based configuration and secrets handling.

## Deliverables
- Backend project scaffold
- Core API contracts
- Environment configuration strategy

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 4
"@
  }
  @{
    Title = 'SaaS Phase 5: Design PostgreSQL schema and multi-tenant data model'
    Labels = @('saas', 'roadmap', 'database', 'backend', 'phase-5')
    Body = @"
## Goal
Create the first production-ready database model with tenant-aware boundaries.

## Tasks
- Design PostgreSQL schema with tenant awareness from day one.
- Add `tenant_id` to every tenant-owned table.
- Define global, tenant-scoped, and internal/admin tables.
- Implement authorization expectations for every query path.
- Add migration tooling.
- Add seed data for local development.
- Define future isolation path:
  - shared DB/shared schema now
  - schema-per-tenant or DB-per-tenant later

## Deliverables
- ERD or schema document
- Initial migrations
- Seed strategy

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 5
"@
  }
  @{
    Title = 'SaaS Phase 6: Implement authentication, invitations, and RBAC'
    Labels = @('saas', 'roadmap', 'auth', 'backend', 'phase-6')
    Body = @"
## Goal
Implement secure tenant-aware access control for clinic users and operators.

## Tasks
- Implement sign-in and tenant resolution flow.
- Support invitation flow for clinic staff.
- Implement RBAC.
- Define suspended-tenant behavior.
- Add support/admin impersonation rules only if fully audited.
- Decide authentication modes: passwordless, SSO, or email/password.

## Deliverables
- Auth flow design
- Tenant-aware access rules
- Role enforcement implementation plan

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 6
"@
  }
  @{
    Title = 'SaaS Phase 7: Implement billing, plans, and subscription lifecycle'
    Labels = @('saas', 'roadmap', 'billing', 'backend', 'phase-7')
    Body = @"
## Goal
Connect memberships and commercial plans to the product.

## Tasks
- Define pricing model.
- Implement subscription creation and checkout.
- Sync billing state into the application database.
- Process billing webhooks for:
  - subscription created
  - payment succeeded
  - payment failed
  - cancellation
  - trial ending
- Gate features by subscription status and plan.
- Add billing/admin screens.

## Deliverables
- Pricing definition
- Billing integration plan
- Subscription state machine

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 7
"@
  }
  @{
    Title = 'SaaS Phase 8: Add security, compliance, backups, and auditability'
    Labels = @('saas', 'roadmap', 'security', 'phase-8')
    Body = @"
## Goal
Prepare the platform for real customer data and regulated workflows.

## Tasks
- Define compliance target.
- Add structured audit logging.
- Encrypt secrets and sensitive data.
- Review tenant data access paths.
- Define backup and restore policy.
- Define retention and deletion policy.
- Add admin action tracking.
- Review third-party vendors for data handling impact.

## Deliverables
- Security baseline checklist
- Audit logging plan
- Backup/restore policy

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 8
"@
  }
  @{
    Title = 'SaaS Phase 9: Set up environments, CI/CD, infrastructure, and deployment'
    Labels = @('saas', 'roadmap', 'devops', 'phase-9')
    Body = @"
## Goal
Create a repeatable path to build, deploy, and operate the SaaS.

## Tasks
- Define environments: local, dev, staging, production.
- Set up CI/CD for frontend and backend.
- Provision hosting, API runtime, database, secrets, DNS, and TLS.
- Add infrastructure-as-code.
- Define release versioning and rollback strategy.

## Deliverables
- Environment strategy
- Deployment pipeline
- Infrastructure provisioning plan

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 9
"@
  }
  @{
    Title = 'SaaS Phase 10: Add monitoring, alerting, and operational support'
    Labels = @('saas', 'roadmap', 'operations', 'phase-10')
    Body = @"
## Goal
Make the system observable and supportable before production rollout.

## Tasks
- Add uptime monitoring.
- Add error tracking.
- Add metrics dashboards.
- Add alerts for:
  - failed deployments
  - elevated error rates
  - billing webhook failures
  - database saturation
- Document operational runbooks.

## Deliverables
- Monitoring stack definition
- Alerting policy
- Basic runbooks

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 10
"@
  }
  @{
    Title = 'SaaS Phase 11: Prepare production launch and go-live checklist'
    Labels = @('saas', 'roadmap', 'launch', 'phase-11')
    Body = @"
## Goal
Validate end-to-end readiness before onboarding paying clinic tenants.

## Tasks
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

## Deliverables
- Production readiness checklist
- Launch decision checklist

## Source
- `SAAS_HOSTING_ROADMAP.md` Phase 11
"@
  }
)

function Ensure-Label {
  param(
    [string]$Name
  )

  $existing = gh label list --limit 200 --json name --jq ".[] | select(.name == `"$Name`") | .name"
  if ($existing) {
    Write-Host "Label exists: $Name"
    return
  }

  if ($DryRun) {
    Write-Host "[DRY RUN] Create label: $Name"
    return
  }

  gh label create $Name | Out-Host
}

function Issue-Exists {
  param(
    [string]$Title
  )

  $existing = gh issue list --limit 200 --state all --json title --jq ".[] | select(.title == `"$Title`") | .title"
  return [bool]$existing
}

foreach ($label in $labelsToEnsure) {
  Ensure-Label -Name $label
}

foreach ($issue in $issues) {
  if (Issue-Exists -Title $issue.Title) {
    Write-Host "Issue already exists: $($issue.Title)"
    continue
  }

  $labelArgs = @()
  foreach ($label in $issue.Labels) {
    $labelArgs += @('--label', $label)
  }

  if ($DryRun) {
    Write-Host "[DRY RUN] Create issue: $($issue.Title)"
    Write-Host "[DRY RUN] Labels: $($issue.Labels -join ', ')"
    continue
  }

  gh issue create --title $issue.Title --body $issue.Body @labelArgs | Out-Host
}
