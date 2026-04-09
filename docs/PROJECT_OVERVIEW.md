# Project Overview

## Purpose

`DDMed` is organized as a small monorepo. Its current implemented product surface is an Angular frontend that demonstrates SNOMED CT implementation scenarios using FHIR terminology services. The repository also contains Python automation for generating analytical reports consumed by the frontend, a still-minimal backend scaffold, and an operational local Docker-based runtime for Snowstorm, HAPI FHIR, the SNOMED CT Browser, and supporting services.

## Main Areas

### Angular app

- Location: `frontend/src/`
- Entry points: `frontend/src/app/app.module.ts` and `frontend/src/app/app-routing.module.ts`
- UI stack: Angular 21, Angular Material, Tailwind CSS
- Delivery model: one shell app with a mix of eager routes and lazy-loaded feature modules

### Backend scaffold

- Location: `backend/`
- Current state: placeholder service with a basic `/health` endpoint
- Intended role: product API, auth boundaries, and integrations with HAPI FHIR and Snowstorm

### Infra runtime

- Location: `infra/`
- Current state: working local Compose stack, runtime wiring, CORS-facing proxies for HAPI FHIR and Snowstorm, the SNOMED CT Browser, terminology assets, and environment templates
- Intended role: deployment topology, runtime integration, reverse proxy, and operational assets

### Python tooling

- Location: `python/`
- Primary tool: `python/reports-updater/`
- Purpose: download SNOMED artifacts and generate HTML/Excel reports used by the app

## Existing Documentation

Start with these files before exploring code:

- `README.md`: monorepo overview and entry points
- `AGENTS.md`: repository conventions for modularization, lazy loading, UI consistency, and terminology access
- `docs/CUSTOM_QUESTIONNAIRES_README.md`: questionnaire-specific behavior
- `docs/GA_TESTING.md`: analytics-related testing notes
- `python/README.md`: Python tooling index
- `python/reports-updater/README.md`: report-generation workflow
- `frontend/src/app/maturity/maturity-admin/README.md`: admin screen details for the maturity feature

## Frontend Structure

Important directories under `frontend/src/app/`:

- `shared/`: shared Angular Material and reusable UI modules
- `services/`: cross-feature services
- `home/`: landing screen
- `maturity/`, `reports/`, `valueset-translator/`, `cohort-definition/`, `ehds-laboratory-demo/`: lazy feature areas
- `benefits-demo/` and `phaser-game/`: feature modules exposed through thin lazy entry modules
- `questionnaires/`, `context/`, `game/`, `extensions-search/`, `crs-batch-generator/`: currently routed from the root module

## Routing Model

`frontend/src/app/app-routing.module.ts` combines:

- eager routes rendered directly from `AppModule`
- lazy routes for heavier areas
- thin entry modules for features reused under multiple top-level URLs

This means `AppModule` is still a significant dependency hub and should be treated carefully when adding new screens.

## Heavy Libraries Present

The repository already depends on several expensive frontend libraries:

- `plotly.js-dist`
- `d3`
- `phaser`
- `leaflet`
- `xlsx`
- `jszip`
- `@viz-js/viz`
- `firebase`
- `html2canvas`
- `jspdf`

Per repository conventions, features using these libraries should stay lazy-loaded whenever possible.

## Review Notes

Current architectural pressure points:

- `AppModule` still declares many feature components that are not part of the first paint
- `AppRoutingModule` still exposes many non-lazy top-level screens
- the frontend still talks directly to HAPI FHIR and Snowstorm instead of going through the backend
- documentation is uneven: some feature folders are documented well, but repository-wide architecture is not centralized
- `techstack.md` is generated and no longer reflects current dependency versions

## How To Validate Safely

If dependencies are installed, the repo conventions expect:

```bash
cd frontend && CI=1 npx ng build --progress=false
```

Useful local commands from `package.json`:

- `npm run frontend:start`
- `npm run frontend:build`
- `npm run frontend:test`
- `npm run backend:start`

## Suggested Next Review Targets

If you continue auditing the project, inspect these first:

1. `frontend/src/app/app.module.ts`
2. `frontend/src/app/app-routing.module.ts`
3. `frontend/src/app/shared/`
4. feature folders that import heavy libraries
5. `python/reports-updater/` if report generation is part of deployment or release flow
