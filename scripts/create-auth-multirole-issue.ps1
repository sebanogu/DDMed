param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$labelsToEnsure = @(
  'saas',
  'auth',
  'backend',
  'frontend',
  'security'
)

$issues = @(
  @{
    Title = 'Implement tenant-aware authentication and multi-role RBAC'
    Labels = @('saas', 'auth', 'backend', 'frontend', 'security')
    Body = @"
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

## Implementation Subtasks
- Architecture and identity decisions
- Backend identity foundation
- Backend authorization enforcement
- Frontend authentication shell
- Frontend authorization
- Invitations and membership management
- Testing

## Source
- `docs/AUTHENTICATION_MULTI_ROLE_TASK.md`
- `docs/SAAS_HOSTING_ROADMAP.md` Phase 6
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
