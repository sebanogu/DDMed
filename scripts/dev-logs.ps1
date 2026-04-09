$ErrorActionPreference = 'Stop'

docker compose -f infra/compose.yaml -f infra/compose.dev.yaml logs -f
