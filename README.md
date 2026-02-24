# Weekly Scheduler (Assessment)

This project is a **React + TypeScript** weekly scheduling UI built for assessment purposes. It uses **Vite** for the dev server and build pipeline and **Tailwind CSS** for styling.

**Author:** Ian

## What’s Included

- Weekly view (Monday–Sunday)
- Week navigation (previous/next)
- Add multiple shifts per day
- Validation: end after start, no overlaps
- Immediate rendering in chronological order
- Responsive layout

## Run Locally

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Why Vite (and Alternatives)

Vite provides fast startup, instant HMR, and optimized production builds. However, the exact same React codebase could be built and served with other tooling if required:

### Possible Alternatives

- **Webpack** (custom setup, flexible)
- **Parcel** (zero‑config bundler)
- **Create React App (CRA)** (legacy, but still common)
- **Next.js** (full‑stack React framework)
- **Rspack** or **esbuild** (modern, fast bundlers)

> The choice here is **Vite** because it’s modern, lightweight, and widely used in professional React workflows.
