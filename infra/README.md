# Infra

This folder will host the runtime and deployment assets for the platform.

Planned contents:

- `compose.yaml`
- `compose.dev.yaml`
- `compose.prod.yaml`
- reverse proxy configuration
- environment templates
- backup scripts

## Local development

The repository now includes a first development-oriented Docker Compose stack for:

- frontend
- backend
- PostgreSQL
- HAPI FHIR
- Elasticsearch
- Snowstorm
- SNOMED CT Browser

Run it with:

```bash
docker compose -f infra/compose.yaml -f infra/compose.dev.yaml up --build
```

The repository root also exposes platform-agnostic npm wrappers:

```bash
npm run dev:up
npm run dev:down
npm run dev:logs
```

## Initializing IPS terminology in Snowstorm

The repository includes a local IPS RF2 archive at `infra/terminology/ips/IPS-Terminology.zip` and a platform-agnostic initializer script.

After the stack is running, load it into an empty Snowstorm instance with:

```bash
npm run snowstorm:init:ips
```

The initializer uses the Snowstorm specialist API on `http://localhost:8082` and waits until the import reaches a terminal status.

Expected local ports:

- `4201`: frontend
- `3000`: backend
- `8081`: HAPI FHIR
- `8082`: Snowstorm
- `8083`: SNOMED CT Browser
- `5432`: PostgreSQL
- `9200`: Elasticsearch

This is a development stack, not a hardened production deployment.
