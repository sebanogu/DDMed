# DDMed Monorepo

This repository is now organized as a small monorepo that separates the product platform into three main components:

- `frontend/`: the Angular application and related frontend tooling
- `backend/`: the future product API layer that will own business logic, auth boundaries, and integrations
- `infra/`: Docker Compose, reverse proxy, environment templates, and deployment-oriented assets

Additional supporting areas:

- `docs/`: architecture, roadmap, and execution documents
- `python/`: standalone Python tooling and reporting utilities
- `scripts/`: repository-level GitHub automation scripts

## Current State

- The existing application has been moved into `frontend/`.
- `backend/` has been scaffolded as a placeholder for the upcoming API service.
- `infra/` has been scaffolded for the future Compose-based runtime.

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

Start it from the repository root with:

```bash
npm run dev:up
```

Or directly:

```bash
docker compose -f infra/compose.yaml -f infra/compose.dev.yaml up --build
```

Default local endpoints:

- frontend: `http://localhost:4200`
- backend: `http://localhost:3000`
- backend health: `http://localhost:3000/health`
- HAPI FHIR: `http://localhost:8081/fhir`
- Snowstorm: `http://localhost:8082`

Stop the stack with:

```bash
npm run dev:down
```

For collaborator onboarding, see [Local Setup](docs/LOCAL_SETUP.md).
```

## Documentation

Start with:

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [SaaS Hosting Roadmap](docs/SAAS_HOSTING_ROADMAP.md)
- [Compose MVP Execution Plan](docs/COMPOSE_MVP_EXECUTION_PLAN.md)
- [Original App README](docs/README_APP.md)
