# Local Setup

## Purpose

This guide explains how a collaborator can run the current DDMed monorepo locally with the Docker-based development stack.

## Prerequisites

Install these tools locally:

- Docker Desktop or Docker Engine with Docker Compose
- Node.js 22+ and npm
- Git

Optional but useful:

- VS Code

## Repository Areas

The monorepo is organized as:

- `frontend/`: Angular application
- `backend/`: backend scaffold
- `infra/`: Docker Compose and runtime config
- `docs/`: project and platform documentation
- `python/`: supporting Python tooling

## Fast Start

From the repository root:

```bash
npm run dev:up
```

These npm scripts call `docker compose` directly, so they are intended to work across Windows, macOS, and Linux without requiring PowerShell.

This starts the current local development stack with:

- frontend
- backend
- PostgreSQL
- HAPI FHIR
- Elasticsearch
- Snowstorm
- SNOMED CT Browser

## Local Endpoints

Once the stack is up, these endpoints should be available:

- frontend: `http://localhost:4201`
- backend: `http://localhost:3000`
- backend health: `http://localhost:3000/health`
- HAPI FHIR: `http://localhost:8081/fhir`
- Snowstorm: `http://localhost:8082`
- SNOMED CT Browser: `http://localhost:8083`
- PostgreSQL: `localhost:5432`
- Elasticsearch: `http://localhost:9200`

When you access the Angular app at `http://localhost:4201`, the app now defaults to:

- local Snowstorm FHIR at `http://localhost:8082/fhir`
- local HAPI FHIR at `http://localhost:8081/fhir`

## Alternative Commands

Direct Docker Compose:

```bash
docker compose -f infra/compose.yaml -f infra/compose.dev.yaml up --build
```

Stop the stack:

```bash
npm run dev:down
```

Follow logs:

```bash
npm run dev:logs
```

## Initialize the local IPS terminology

Once Snowstorm is up, you can seed it with the bundled IPS terminology package:

```bash
npm run snowstorm:init:ips
```

The script imports `infra/terminology/ips/IPS-Terminology.zip` into the Snowstorm `MAIN` branch and waits for completion.

Use the help output for advanced options:

```bash
npm run snowstorm:init:ips -- --help
```

## Frontend Only

If Docker is not needed for a quick frontend iteration:

```bash
npm run frontend:install
npm run frontend:start
```

## Backend Only

The current backend is still a scaffold, but it can run independently:

```bash
npm run backend:start
```

## What To Expect Today

Current state of the local platform:

- the frontend is real and already moved into `frontend/`
- the backend is a minimal scaffold
- the Compose stack models the future platform topology
- HAPI and Snowstorm are present as local infrastructure dependencies
- this is a development environment, not a hardened production deployment

## Common Issues

### Port already in use

If a port is busy, stop the conflicting service or adjust published ports in:

- `infra/compose.dev.yaml`

### Docker not found

Make sure Docker is installed and running before using the `dev:*` scripts.

### Slow startup

The first run can be slow because Docker needs to build images and pull large dependencies such as Elasticsearch or Snowstorm.

### HAPI or Snowstorm not immediately ready

Some services take longer to become healthy than the frontend. Wait for container logs and retry after the stack stabilizes.

## Suggested First Checks For A Collaborator

1. Open `http://localhost:4201`
2. Open `http://localhost:3000/health`
3. Open `http://localhost:8081/fhir/metadata`
4. Open `http://localhost:8082`
5. Open `http://localhost:8083`

If those respond, the local platform is basically alive.

## Recommended Next Documents

- `README.md`
- `docs/PROJECT_OVERVIEW.md`
- `docs/COMPOSE_MVP_EXECUTION_PLAN.md`
- `infra/README.md`
