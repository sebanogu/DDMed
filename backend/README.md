# Backend

This folder is reserved for the future product backend.

Planned responsibilities:

- expose the application API used by the frontend
- enforce tenant and authorization boundaries
- mediate access to HAPI FHIR and Snowstorm
- own business workflows, billing integration, and audit logging

Current implemented slice:

- tenant-aware authentication
- multi-role RBAC
- PostgreSQL-backed users, memberships, roles, and sessions
- optional demo seed data for local development

Local auth demo users:

- `alex.owner@ddmed.test` / `Demo123!`
- `bianca.admin@ddmed.test` / `Demo123!`
- `sam.support@ddmed.test` / `Demo123!`

These demo users are only seeded when `SEED_DEMO_AUTH=true`.

Required backend environment variables:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `SEED_DEMO_AUTH`
