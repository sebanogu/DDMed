# Compose MVP Execution Plan

## Objective

Turn the current project into a commercially deployable MVP using:

- a single GitHub monorepo
- Docker Compose for local development and first production deployments
- frontend + backend + HAPI FHIR + Snowstorm
- a disciplined path from local development to staging and production

This plan is intentionally written so both humans and LLM-based agents can execute it.

## Execution Principles

- Prefer one monorepo with clear internal separation:
  - `frontend/`
  - `backend/`
  - `infra/`
- Start with single-host production.
- Keep public exposure limited to reverse proxy, frontend, and backend.
- Keep HAPI FHIR, PostgreSQL, Snowstorm, and Elasticsearch on internal-only networks.
- Optimize for reproducibility, not sophistication.
- Treat development and production as the same conceptual platform with environment-specific overrides.

## Target Monorepo Shape

```text
platform/
  frontend/
  backend/
  infra/
    compose.yaml
    compose.dev.yaml
    compose.prod.yaml
    traefik/
    backup/
  docs/
  scripts/
  .env.example
```

## Environments

### Local development

- Fast feedback
- Bind mounts where useful
- Hot reload for frontend and backend
- Optional full stack
- Demo/bootstrap data

### Staging

- Same service topology as production
- Real deployment flow
- Production-like config with non-production secrets

### Production

- Single Linux VM
- Docker Compose
- Reverse proxy with TLS
- Persistent storage
- Automated backups
- Healthchecks
- Controlled deployments

## Backlog

### 1. Decide product scope and define the MVP clinical slice

#### Why

The current repository is broader than the target product. The MVP needs one clinically meaningful vertical slice.

#### Tasks

- Identify which current modules belong to the commercial MVP.
- Mark demo-only or experimental modules that should stay out of the product surface.
- Define the first clinical workflow to ship.
- Define the first terminology workflow to ship.
- Define the minimum set of user roles for MVP.

#### Suggested output

- product scope document
- MVP route map
- list of excluded demo modules

#### Done when

- product scope is written
- one vertical slice is agreed
- route ownership is explicit

### 2. Create the target platform layout inside the repository

#### Why

A clean repo structure is the foundation for Docker, CI/CD, and agent-based execution.

#### Tasks

- Decide whether the existing Angular app becomes `frontend/` directly or is moved progressively.
- Create `backend/` scaffold.
- Create `infra/` folder for Compose, proxy, env examples, and operational scripts.
- Add `docs/` area for deployment and environment documentation.
- Define ownership boundaries between frontend, backend, and infra.

#### Suggested output

- monorepo directory structure
- backend scaffold
- infra scaffold

#### Done when

- repo structure exists
- all core areas have a home
- future work no longer lands in root ad hoc

### 3. Define the runtime architecture and internal networking model

#### Why

The deployment shape must be explicit before writing production Compose files.

#### Tasks

- Define public and internal Docker networks.
- Decide container naming conventions.
- Define which services are internet-facing.
- Define service-to-service communication paths.
- Define port exposure rules for dev and production.

#### Suggested output

- runtime topology diagram
- network and port policy

#### Done when

- every service has a place in the topology
- internal-only services are identified

### 4. Containerize the frontend for dev and prod

#### Why

The frontend must run consistently in local development and production.

#### Tasks

- Create development-oriented Dockerfile or dev container strategy.
- Create production Dockerfile that builds immutable frontend artifacts.
- Decide production serving strategy:
  - static assets via Nginx
  - static assets via reverse proxy path
- Define frontend environment variable strategy.
- Add health endpoint or equivalent readiness strategy if needed.

#### Suggested output

- frontend Dockerfile(s)
- documented env handling

#### Done when

- frontend runs in local Compose
- frontend runs in production-like container

### 5. Create the backend service foundation

#### Why

The backend should mediate access to HAPI and Snowstorm rather than exposing them directly to the browser.

#### Tasks

- Choose backend framework and language.
- Create backend scaffold with:
  - configuration
  - health endpoint
  - logging
  - API base routing
- Add client adapters for:
  - HAPI FHIR
  - Snowstorm
- Define backend environment variables.
- Define secrets strategy for all environments.

#### Suggested output

- backend app scaffold
- adapter/service layout
- env contract

#### Done when

- backend container starts
- `/health` responds
- backend can reach internal dependencies

### 6. Introduce HAPI FHIR in the platform

#### Why

Clinical persistence should land in a real FHIR server from the start of the platform effort.

#### Tasks

- Choose HAPI FHIR deployment image/config approach.
- Add HAPI service to Compose.
- Add PostgreSQL for HAPI persistence.
- Configure internal network-only exposure.
- Define startup order and readiness assumptions.
- Document data persistence volumes.

#### Suggested output

- HAPI service definition
- PostgreSQL service definition
- persistence setup

#### Done when

- HAPI starts inside Compose
- HAPI persists to PostgreSQL
- backend can talk to HAPI

### 7. Introduce Snowstorm and Elasticsearch in the platform

#### Why

Terminology services are core to the product and should be modeled explicitly in the deployment stack.

#### Tasks

- Add Elasticsearch service definition.
- Add Snowstorm service definition.
- Configure Snowstorm to use Elasticsearch.
- Restrict exposure to internal networking only.
- Define persistent storage requirements.
- Document terminology release loading strategy.

#### Suggested output

- Snowstorm service definition
- Elasticsearch service definition
- terminology operations notes

#### Done when

- Snowstorm starts correctly
- backend can query Snowstorm
- storage strategy is explicit

### 8. Create the base Compose platform

#### Why

`compose.yaml` should express the shared service model used across environments.

#### Tasks

- Create `infra/compose.yaml` with common services.
- Add named volumes for persistent data.
- Add reusable environment patterns.
- Add healthchecks where meaningful.
- Add restart policies where appropriate for production-oriented services.

#### Suggested output

- base Compose file

#### Done when

- base stack describes the platform coherently
- dev and prod overrides can layer on top cleanly

### 9. Create development overrides and profiles

#### Why

Local development should be fast and flexible, not forced to mimic full production all the time.

#### Tasks

- Create `infra/compose.dev.yaml`.
- Add bind mounts and hot reload where useful.
- Add optional profiles such as:
  - `core`
  - `fhir`
  - `terminology`
- Decide whether Snowstorm is local optional or shared-dev by default.
- Add demo bootstrap path for local data.

#### Suggested output

- dev override file
- profile conventions
- local startup documentation

#### Done when

- developers can start a minimal local stack
- full local stack is possible when needed

### 10. Create production overrides and operational defaults

#### Why

Production Compose must be stricter than development and ready for repeatable deploys.

#### Tasks

- Create `infra/compose.prod.yaml`.
- Remove code mounts.
- Use immutable application images.
- Add production restart policies.
- Add resource constraints where practical.
- Add secure port exposure rules.
- Ensure only intended services are published.

#### Suggested output

- production override file
- production env template

#### Done when

- production stack can be launched with Compose on a clean server

### 11. Add reverse proxy and TLS termination

#### Why

Production needs a clean public entrypoint with HTTPS and routing control.

#### Tasks

- Choose Traefik or Nginx.
- Add reverse proxy to production stack.
- Configure TLS.
- Configure routing for frontend and backend.
- Ensure internal services are not directly published.
- Document DNS expectations.

#### Suggested output

- reverse proxy config
- TLS and routing notes

#### Done when

- HTTPS works
- frontend and backend are reachable publicly
- internal services are not exposed

### 12. Define environment variables and secret handling

#### Why

Environment management must be repeatable and safe before the first commercial deploy.

#### Tasks

- Create `.env.example`.
- Create `.env.dev.example` and `.env.prod.example` if needed.
- Separate config from secrets.
- Document secret injection strategy.
- Ensure no sensitive values live in git.

#### Suggested output

- env templates
- env documentation

#### Done when

- a new environment can be configured from docs
- secrets are not hardcoded

### 13. Add backups and restore procedures

#### Why

Backups are mandatory before commercial use.

#### Tasks

- Define PostgreSQL backup strategy.
- Define retention policy.
- Define restore verification procedure.
- Decide how Snowstorm-related state is backed up or reconstructed.
- Add scheduled backup scripts or job definitions.

#### Suggested output

- backup scripts
- restore runbook

#### Done when

- backups run automatically
- restore steps are documented and testable

### 14. Add observability and operational basics

#### Why

The MVP must be operable, not just deployable.

#### Tasks

- Standardize container logging.
- Add log rotation strategy.
- Define basic metrics to watch:
  - CPU
  - memory
  - disk
  - container health
- Add healthchecks where useful.
- Define a minimal alerting strategy.

#### Suggested output

- ops checklist
- health and logging policy

#### Done when

- failures are visible
- logs and health signals are available

### 15. Add CI/CD for image build and deployment

#### Why

Deployments should be reproducible and versioned.

#### Tasks

- Decide GitHub Actions workflow boundaries.
- Build frontend and backend images in CI.
- Tag images deterministically.
- Define deploy trigger policy:
  - branch-based
  - tag-based
- Implement production deployment command flow.
- Document rollback process.

#### Suggested output

- CI workflows
- deployment workflow
- rollback instructions

#### Done when

- a tagged version can be built and deployed repeatably

### 16. Add local developer workflows and bootstrap data

#### Why

Local friction slows down both humans and LLM agents.

#### Tasks

- Add startup commands for:
  - minimal local stack
  - full local stack
- Add demo/test users if applicable.
- Add sample clinical resources.
- Add terminology test scenarios.
- Document first-run flow.

#### Suggested output

- bootstrap scripts
- local quickstart

#### Done when

- a new contributor can reach a usable local system quickly

### 17. Deliver the first end-to-end clinical vertical slice

#### Why

Infrastructure is only useful if a real workflow crosses the whole stack.

#### Tasks

- Implement controlled user access path.
- Implement patient create/edit flow.
- Implement one simple Encounter or Composition workflow.
- Integrate terminology lookup or validation with SNOMED.
- Persist to HAPI FHIR through backend APIs.
- Expose the vertical slice in the frontend.

#### Suggested output

- one complete functional workflow

#### Done when

- user can complete the chosen workflow end to end

### 18. Prepare staging and production runbooks

#### Why

Commercial deployment needs a predictable operational playbook.

#### Tasks

- Document server provisioning steps.
- Document initial deployment steps.
- Document upgrade steps.
- Document rollback steps.
- Document backup/restore operations.
- Document incident first-response actions.

#### Suggested output

- staging runbook
- production runbook

#### Done when

- another engineer can deploy and operate the system from docs

## Suggested Execution Order

1. product scope
2. repo/platform layout
3. runtime topology
4. backend foundation
5. HAPI and PostgreSQL
6. Snowstorm and Elasticsearch
7. base Compose
8. dev overrides
9. prod overrides
10. reverse proxy and TLS
11. env and secret handling
12. backups
13. observability
14. CI/CD
15. local bootstrap
16. vertical slice
17. staging runbook
18. production deployment

## LLM Execution Guidance

When assigning these tasks to an LLM agent:

- give it one task or subtask at a time
- include the target files it owns
- include acceptance criteria
- require verification commands
- require docs updates for every infra change
- avoid mixing architecture decisions and implementation in one prompt unless the decision is already made

## Human Review Guidance

Humans should explicitly review:

- security boundaries
- public exposure of ports
- secret management
- backup strategy
- data persistence paths
- production DNS and TLS config
- any decision that affects clinical data handling
