# Woodland Conservation Foundation

> A platform for preserving and showcasing the natural beauty of woodland areas

## Overview

Woodland Conservation Foundation is dedicated to preserving and protecting natural woodland areas for future generations. This app presents a clean, modern site showcasing trails, points of interest, and conservation zones.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Leaflet + React Leaflet
- Cypress (E2E)
- Supabase (integrations ready)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```sh
   git clone <YOUR_GIT_URL>
   cd WoodlandConservationArea
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. Start the development server
   ```sh
   npm run dev
   ```
   Vite will start on http://localhost:8080

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run build:dev` — Development-mode build
- `npm run preview` — Preview the production build
- `npm run lint` — Lint the project

## Project Structure

```
├─ public/
├─ server/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ map/
│  │  │  └─ MapLegend.tsx
│  │  └─ ui/          # shadcn/ui components
│  ├─ data/
│  │  └─ map.json     # source of truth for map data (center, areas, POIs)
│  ├─ lib/
│  │  └─ mapIcons.ts  # icon mapping helpers
│  ├─ pages/
│  │  ├─ SiteMap.tsx  # renders the map using typed config from JSON
│  │  └─ SiteMap.css  # map-specific styles
│  ├─ types/
│  │  └─ map.ts       # shared types (MapArea, POI, MapConfig)
│  └─ ...
├─ cypress/
├─ vite.config.ts
├─ tsconfig*.json
└─ package.json
```

## Map Architecture

- Data: `src/data/map.json`
  - Contains `center`, `areas` (site boundary, zones), and `pois`.
- Types: `src/types/map.ts`
  - `MapArea`, `POI`, `MapConfig` shared across the app.
- Map UI: `src/pages/SiteMap.tsx`
  - Builds `typedMapConfig` from `map.json` and renders polygons, trail, and POIs.
- Legend: `src/components/map/MapLegend.tsx`
  - Clean, minimal legend component used on the Site Map page.
- Styles: `src/pages/SiteMap.css`
  - Extracted Leaflet/map-related styles.

## Configuration

- Vite alias: `@` → `./src` (see `vite.config.ts`).
- TypeScript: `resolveJsonModule: true` to import `map.json` directly.
- Dev server: host `::`, port `8080`.

## Testing

- Cypress E2E scaffold present under `cypress/`.
- Run Cypress (examples):
  ```sh
  npx cypress open
  # or
  npx cypress run
  ```

## Build & Preview

```sh
npm run build
npm run preview
```
Build output is emitted to `dist/`.

## Contributing

- Keep map data in `src/data/map.json` only (the root `map.json` has been removed).
- Add new types in `src/types/` and reuse across components.
- Prefer modular components under `src/components/` (e.g., `components/map/*`).
- Use shadcn/ui and Tailwind for consistent styling.


