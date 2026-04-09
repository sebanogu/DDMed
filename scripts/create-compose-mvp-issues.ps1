param(
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$labelsToEnsure = @(
  'mvp',
  'docker-compose',
  'infra',
  'frontend',
  'backend',
  'fhir',
  'terminology',
  'security',
  'devops',
  'docs',
  'llm-ready',
  'priority-high',
  'priority-medium',
  'phase-foundation',
  'phase-platform',
  'phase-operations',
  'phase-delivery'
)

$issues = @(
  @{
    Title = 'MVP Foundation: define product scope and first clinical vertical slice'
    Labels = @('mvp', 'docs', 'llm-ready', 'priority-high', 'phase-foundation')
    Body = @"
## Objective
Define the commercial MVP boundary and the first end-to-end workflow that this platform must support.

## Context
The current repository contains more functionality than the target commercial product. We need a written scope before restructuring the platform.

## Tasks
- Identify current modules that belong to the commercial MVP.
- Identify modules that remain demos or internal tooling.
- Define the first clinical workflow to ship.
- Define the first SNOMED terminology workflow to ship.
- Define MVP user roles.

## Deliverables
- product scope document
- MVP route map
- list of excluded demo modules

## Acceptance Criteria
- there is one written MVP scope document in the repository
- the first vertical slice is explicitly named
- excluded modules are explicitly listed

## Execution Notes For LLM
- do not invent product scope from scratch if repo context contradicts it
- inspect existing Angular modules before proposing the final classification
- update docs after classification
"@
  }
  @{
    Title = 'Platform Layout: establish monorepo structure for frontend, backend, and infra'
    Labels = @('mvp', 'infra', 'docs', 'llm-ready', 'priority-high', 'phase-foundation')
    Body = @"
## Objective
Create a clean platform layout that supports Docker Compose, CI/CD, and future agent execution.

## Tasks
- define or create `frontend/`, `backend/`, and `infra/` boundaries
- create `docs/` and operational script locations if needed
- decide how the current Angular app maps into the new structure
- document ownership boundaries

## Deliverables
- monorepo structure in the repository
- platform layout documentation

## Acceptance Criteria
- frontend, backend, and infra all have clear homes
- future platform work no longer depends on ad hoc root-level placement

## Execution Notes For LLM
- preserve existing app behavior while improving structure
- avoid destructive moves without documenting migration impact
"@
  }
  @{
    Title = 'Runtime Architecture: document service topology, networks, and public exposure rules'
    Labels = @('mvp', 'infra', 'security', 'docs', 'llm-ready', 'priority-high', 'phase-foundation')
    Body = @"
## Objective
Define the target runtime topology before implementing production Compose files.

## Tasks
- define public and internal Docker networks
- define service-to-service communication paths
- define which services are internet-facing
- define port exposure policy for dev and production
- document the topology

## Deliverables
- runtime topology document
- network and port policy

## Acceptance Criteria
- every service has an explicit position in the topology
- internal-only services are identified and documented

## Execution Notes For LLM
- Snowstorm, HAPI FHIR, PostgreSQL, and Elasticsearch must not be exposed directly to the public internet in the target design
"@
  }
  @{
    Title = 'Frontend Containerization: add dev and production container strategy for the Angular app'
    Labels = @('mvp', 'frontend', 'docker-compose', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Run the frontend consistently in local development and production.

## Tasks
- create frontend Dockerfile or Dockerfiles for dev and prod
- define production serving approach
- define frontend environment variable strategy
- ensure the frontend works in local Compose
- ensure the frontend can run as an immutable production image

## Deliverables
- frontend container build definitions
- frontend env documentation

## Acceptance Criteria
- frontend runs in a Compose-based local environment
- frontend has a production-oriented container path

## Execution Notes For LLM
- prefer reproducibility over clever optimizations
- document build and run commands
"@
  }
  @{
    Title = 'Backend Foundation: scaffold the API service with config, health endpoint, and dependency adapters'
    Labels = @('mvp', 'backend', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Create the backend service that will mediate access to HAPI FHIR and Snowstorm.

## Tasks
- choose and scaffold the backend framework
- add configuration handling
- add `/health` endpoint
- add logging baseline
- add adapters for HAPI FHIR and Snowstorm
- define backend env and secret contract

## Deliverables
- backend scaffold
- health endpoint
- dependency adapter structure

## Acceptance Criteria
- backend container starts
- `/health` responds successfully
- backend can be configured entirely via environment

## Execution Notes For LLM
- keep the service small and modular
- avoid exposing internal dependency credentials through logs or docs
"@
  }
  @{
    Title = 'FHIR Platform: add HAPI FHIR and PostgreSQL to the Compose stack'
    Labels = @('mvp', 'fhir', 'infra', 'docker-compose', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Introduce a persistent FHIR server layer into the platform.

## Tasks
- add HAPI FHIR service definition
- add PostgreSQL service definition
- connect HAPI to PostgreSQL
- define storage volumes
- define startup and readiness assumptions
- restrict service exposure to internal networks

## Deliverables
- HAPI Compose service
- PostgreSQL Compose service
- persistence documentation

## Acceptance Criteria
- HAPI starts successfully in Compose
- HAPI persists data through PostgreSQL
- backend can reach HAPI through internal networking

## Execution Notes For LLM
- keep public exposure disabled unless explicitly required for local debugging
"@
  }
  @{
    Title = 'Terminology Platform: add Snowstorm and Elasticsearch to the Compose stack'
    Labels = @('mvp', 'terminology', 'infra', 'docker-compose', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Introduce the SNOMED terminology platform into the runtime environment.

## Tasks
- add Elasticsearch service definition
- add Snowstorm service definition
- configure Snowstorm to use Elasticsearch
- define storage needs
- document terminology release loading strategy
- restrict exposure to internal networking

## Deliverables
- Snowstorm Compose service
- Elasticsearch Compose service
- terminology operations notes

## Acceptance Criteria
- Snowstorm starts successfully in Compose
- backend can query Snowstorm through internal networking
- terminology loading strategy is documented

## Execution Notes For LLM
- avoid exposing Snowstorm directly to the public internet in production-oriented config
"@
  }
  @{
    Title = 'Compose Base: create shared compose.yaml for the platform'
    Labels = @('mvp', 'docker-compose', 'infra', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Create the base Compose file that defines the shared application model across environments.

## Tasks
- create `infra/compose.yaml`
- define common services and named volumes
- add healthchecks where useful
- add reusable environment patterns
- define restart policies where appropriate for the base model

## Deliverables
- base Compose file

## Acceptance Criteria
- base Compose file can act as the foundation for both dev and prod overrides
- all major services are modeled coherently

## Execution Notes For LLM
- keep environment-specific behavior out of the base file unless genuinely shared
"@
  }
  @{
    Title = 'Compose Dev: create local development overrides, profiles, and bootstrap flow'
    Labels = @('mvp', 'docker-compose', 'infra', 'docs', 'llm-ready', 'priority-medium', 'phase-platform')
    Body = @"
## Objective
Create a developer-friendly local runtime without forcing full production behavior on every machine.

## Tasks
- create `infra/compose.dev.yaml`
- add bind mounts and hot reload where useful
- define Compose profiles such as `core`, `fhir`, and `terminology`
- decide what runs locally by default and what is optional
- document local bootstrap and first-run flow

## Deliverables
- development override Compose file
- local startup documentation

## Acceptance Criteria
- minimal local stack can start quickly
- full local stack is possible when needed

## Execution Notes For LLM
- optimize for developer speed and reproducibility
"@
  }
  @{
    Title = 'Compose Prod: create production overrides with immutable images and hardened exposure'
    Labels = @('mvp', 'docker-compose', 'infra', 'security', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Create production-oriented Compose overrides suitable for a first commercial single-host deployment.

## Tasks
- create `infra/compose.prod.yaml`
- remove code mounts
- use immutable images
- add production restart policies
- harden port exposure
- add resource controls where practical

## Deliverables
- production override Compose file
- production environment template

## Acceptance Criteria
- production stack can be launched on a clean host using Compose
- only intended services are publicly exposed

## Execution Notes For LLM
- preserve a clean separation between base and production-only configuration
"@
  }
  @{
    Title = 'Reverse Proxy and TLS: add Traefik or Nginx as the production public entrypoint'
    Labels = @('mvp', 'infra', 'security', 'devops', 'llm-ready', 'priority-high', 'phase-platform')
    Body = @"
## Objective
Provide HTTPS, routing, and public ingress control for production.

## Tasks
- choose Traefik or Nginx
- add reverse proxy service to production stack
- configure TLS
- configure routing for frontend and backend
- keep internal services unpublished
- document DNS expectations

## Deliverables
- reverse proxy config
- TLS and routing documentation

## Acceptance Criteria
- HTTPS works for public application routes
- frontend and backend are reachable as intended
- internal services remain non-public

## Execution Notes For LLM
- do not expose HAPI, Snowstorm, PostgreSQL, or Elasticsearch directly
"@
  }
  @{
    Title = 'Environment and Secrets: create env templates and document secret management'
    Labels = @('mvp', 'infra', 'security', 'docs', 'llm-ready', 'priority-high', 'phase-operations')
    Body = @"
## Objective
Make environment configuration repeatable and safe across local, staging, and production.

## Tasks
- create `.env.example`
- create environment-specific templates if needed
- separate config from secrets
- document how secrets are injected
- ensure no sensitive values are committed

## Deliverables
- env templates
- environment management docs

## Acceptance Criteria
- a new environment can be configured from repository docs
- secrets are not embedded in tracked files

## Execution Notes For LLM
- prefer examples and placeholders over real values
"@
  }
  @{
    Title = 'Backups and Restore: add backup automation and recovery documentation'
    Labels = @('mvp', 'infra', 'security', 'devops', 'docs', 'llm-ready', 'priority-high', 'phase-operations')
    Body = @"
## Objective
Protect critical platform data before the first commercial deployment.

## Tasks
- define PostgreSQL backup strategy
- define retention policy
- define restore verification procedure
- define Snowstorm state backup or rebuild strategy
- add backup scripts or scheduled job definitions

## Deliverables
- backup automation
- restore runbook

## Acceptance Criteria
- backups can run automatically
- restore process is written and testable

## Execution Notes For LLM
- document assumptions clearly if some data is reconstructed rather than backed up directly
"@
  }
  @{
    Title = 'Observability Basics: add logging, healthchecks, and minimal operational visibility'
    Labels = @('mvp', 'infra', 'devops', 'docs', 'llm-ready', 'priority-medium', 'phase-operations')
    Body = @"
## Objective
Make the MVP operable with basic health and logging signals.

## Tasks
- standardize container logging expectations
- add log rotation strategy
- add healthchecks where useful
- define baseline operational metrics to watch
- document a minimal alerting strategy

## Deliverables
- observability notes
- logging and health configuration

## Acceptance Criteria
- service health is visible
- logs are available and not unmanaged

## Execution Notes For LLM
- keep the first version simple and operational rather than enterprise-grade
"@
  }
  @{
    Title = 'CI/CD: build images, version releases, and define deployment workflow'
    Labels = @('mvp', 'devops', 'infra', 'llm-ready', 'priority-high', 'phase-operations')
    Body = @"
## Objective
Create a reproducible path from git changes to deployable artifacts and deployments.

## Tasks
- define GitHub Actions workflow boundaries
- build frontend and backend images in CI
- tag images deterministically
- define deploy trigger policy
- document deployment commands and rollback flow

## Deliverables
- CI workflows
- deployment workflow docs
- rollback instructions

## Acceptance Criteria
- a tagged version can be built and deployed repeatably
- rollback path is documented

## Execution Notes For LLM
- keep deployment logic understandable by humans reviewing the workflow
"@
  }
  @{
    Title = 'Developer Experience: add local startup commands, profiles, and bootstrap data'
    Labels = @('mvp', 'docs', 'docker-compose', 'llm-ready', 'priority-medium', 'phase-delivery')
    Body = @"
## Objective
Make local onboarding and iterative development fast for both humans and agents.

## Tasks
- add documented startup commands for minimal and full local stacks
- add demo or test bootstrap data where useful
- add sample clinical resources
- add sample terminology scenarios
- document first-run flow

## Deliverables
- local quickstart
- bootstrap scripts or data

## Acceptance Criteria
- a new contributor can reach a usable local system quickly

## Execution Notes For LLM
- prefer deterministic bootstrap data over manual setup steps
"@
  }
  @{
    Title = 'Clinical Vertical Slice: deliver the first end-to-end workflow through frontend, backend, HAPI, and Snowstorm'
    Labels = @('mvp', 'frontend', 'backend', 'fhir', 'terminology', 'llm-ready', 'priority-high', 'phase-delivery')
    Body = @"
## Objective
Validate the platform with a real end-to-end clinical workflow.

## Tasks
- implement controlled user access path if needed for the slice
- implement patient create or edit flow
- implement one simple Encounter or Composition flow
- integrate terminology lookup or validation with SNOMED
- persist through backend APIs into HAPI FHIR
- expose the workflow in the frontend

## Deliverables
- one complete end-to-end workflow

## Acceptance Criteria
- the selected user workflow works from UI through persistence and terminology integration

## Execution Notes For LLM
- keep the first slice narrow and demonstrable
- prefer a complete thin slice over partially implemented breadth
"@
  }
  @{
    Title = 'Runbooks: document staging, production deployment, upgrade, and incident procedures'
    Labels = @('mvp', 'docs', 'devops', 'llm-ready', 'priority-medium', 'phase-delivery')
    Body = @"
## Objective
Create operational documentation so another engineer can deploy and maintain the MVP.

## Tasks
- document staging provisioning and deployment
- document production provisioning and deployment
- document upgrade steps
- document rollback steps
- document backup and restore operations
- document first-response incident actions

## Deliverables
- staging runbook
- production runbook

## Acceptance Criteria
- another engineer can follow the docs to deploy and operate the system

## Execution Notes For LLM
- prefer explicit commands and file references over vague prose
"@
  }
)

function Ensure-Label {
  param([string]$Name)

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
  param([string]$Title)

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

  if ($DryRun) {
    Write-Host "[DRY RUN] Create issue: $($issue.Title)"
    Write-Host "[DRY RUN] Labels: $($issue.Labels -join ', ')"
    continue
  }

  $labelArgs = @()
  foreach ($label in $issue.Labels) {
    $labelArgs += @('--label', $label)
  }

  gh issue create --title $issue.Title --body $issue.Body @labelArgs | Out-Host
}
