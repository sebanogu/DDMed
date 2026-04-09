# DDMed Monorepo

This repository is organized as a small monorepo that separates the platform into three main components:

- `frontend/`: the Angular application and related frontend tooling
- `backend/`: the product API layer in progress, currently still a scaffold
- `infra/`: Docker Compose, runtime wiring, terminology assets, and deployment-oriented configuration

Additional supporting areas:

- `docs/`: architecture, roadmap, and execution documents
- `python/`: standalone Python tooling and reporting utilities
- `scripts/`: repository-level GitHub automation scripts

## Current State

- The main Angular application lives in `frontend/`.
- The local development stack is operational through Docker Compose.
- Snowstorm, HAPI FHIR, PostgreSQL, Elasticsearch, and the SNOMED CT Browser are wired into the local environment.
- The repository includes a bundled IPS terminology archive plus an initializer script for seeding Snowstorm.
- `backend/` is still a minimal scaffold with a health endpoint and environment wiring, but not yet the active integration layer between the frontend and the terminology/FHIR services.

## Repository Layout

```text
DDMed/
  frontend/
  backend/
  infra/
  docs/
  python/
  scripts/
```

## Frontend Development

Run the Angular application from `frontend/`:

```bash
cd frontend
npm install
npm start
```

Or use the root wrapper scripts:

```bash
npm run frontend:install
npm run frontend:start
```

## Backend Development

The backend is currently a scaffold, but it can be started from the repo root:

```bash
npm run backend:start
```

## Local Full Stack With Docker Compose

The repository now includes a first local development stack with:

- Angular frontend
- backend scaffold
- PostgreSQL
- HAPI FHIR
- Elasticsearch
- Snowstorm
- SNOMED CT Browser

Start it from the repository root with:

```bash
npm run dev:up
```

These root scripts are platform-agnostic wrappers around `docker compose`, so they work the same way on Windows, macOS, and Linux as long as Docker Compose is installed.

Or directly:

```bash
docker compose -f infra/compose.yaml -f infra/compose.dev.yaml up --build
```

Default local endpoints:

- frontend: `http://localhost:4201`
- backend: `http://localhost:3000`
- backend health: `http://localhost:3000/health`
- HAPI FHIR: `http://localhost:8081/fhir`
- Snowstorm: `http://localhost:8082`
- SNOMED CT Browser: `http://localhost:8083`

When the frontend is opened from `localhost`, it now defaults to the local terminology stack:

- Snowstorm FHIR default: `http://localhost:8082/fhir`
- HAPI FHIR default for questionnaire/patient FHIR flows: `http://localhost:8081/fhir`
- Benefits Demo resets to the local HAPI FHIR server by default when it loads.

## Local Onboarding

For a new local environment, the shortest path is:

1. Start the stack:

```bash
npm run dev:up
```

2. Seed Snowstorm with the bundled IPS terminology:

```bash
npm run snowstorm:init:ips
```

After that, the local environment is ready to use.

Notes:

- `npm run dev:up` is used every time you want to start the stack.
- `npm run snowstorm:init:ips` is typically only needed once for a fresh Snowstorm instance, or again if you want to reseed an empty instance.

Stop the stack with:

```bash
npm run dev:down
```

For collaborator onboarding, see [Local Setup](docs/LOCAL_SETUP.md).

## Documentation

Start with:

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [SaaS Hosting Roadmap](docs/SAAS_HOSTING_ROADMAP.md)
- [Compose MVP Execution Plan](docs/COMPOSE_MVP_EXECUTION_PLAN.md)
- [Original App README](docs/README_APP.md)
