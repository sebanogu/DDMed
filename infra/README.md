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

The backend auth demo users are seeded only in the development override because `compose.dev.yaml` sets `SEED_DEMO_AUTH=true`.

Run it with:

```bash
docker compose -f infra/compose.yaml -f infra/compose.dev.yaml up --build
```

Expected local ports:

- `4200`: frontend
- `3000`: backend
- `8081`: HAPI FHIR
- `8082`: Snowstorm
- `5432`: PostgreSQL
- `9200`: Elasticsearch

This is a development stack, not a hardened production deployment.
