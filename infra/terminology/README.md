# Terminology Assets

This directory holds local terminology artifacts used to initialize infrastructure services in development.

## IPS Terminology

The IPS SNOMED CT terminology snapshot is stored at:

`infra/terminology/ips/IPS-Terminology.zip`

This package is a SNAPSHOT-only RF2 archive. In this repository it is intended to be imported into an empty Snowstorm instance on the `MAIN` branch as the local baseline terminology for development.

Run the initializer from the repository root:

```bash
npm run snowstorm:init:ips
```

The script talks to the Snowstorm specialist API at `http://localhost:8082` by default and waits for the import to complete.

Helpful options:

```bash
npm run snowstorm:init:ips -- --help
npm run snowstorm:init:ips -- --force
npm run snowstorm:init:ips -- --base-url http://localhost:8082 --file /absolute/path/to/another.zip
```

By default the initializer refuses to run if Snowstorm already appears to contain code systems, because this IPS package is meant to seed a clean local instance.
