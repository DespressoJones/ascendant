# Ascendant

Treat your life like a body of work. Ascendant turns real effort — training, focus, sleep,
nutrition, stillness, connection — into measurable growth across nine independently-leveled
skills, embodied in a **living familiar** that evolves as you do.

> _Working name._ A mobile-first, local-first PWA, built to ship to the iOS App Store via Capacitor.

## Status

Vertical slice: the flagship **Today** screen — the living Guardian Familiar (a sumi-e crane that
breathes and "paints on"), the day's generative quest, and the nine-skill ledger. Verified across
two worlds (Ink, Bronze) and both languages (EN / FR), with a real quest-completion interaction.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind v4** — a token-driven design system
- **Motion** (Framer Motion) — a single documented motion language
- **Zustand** — local-first, persisted state
- Self-hosted fonts (Fraunces, Space Mono) so the PWA works offline
- Capacitor-ready (iOS) · Supabase planned (auth + a real, human-only leaderboard)

## Design system

Every colour and type value is a runtime CSS variable scoped per "world" (`src/styles/tokens.css`).
Tailwind utilities (`bg-canvas`, `text-ink`, `text-accent`, `font-serif`, …) resolve to the active
world via `@theme inline`, so switching `[data-world]` on `<html>` re-themes everything — including
the familiar — instantly, with no re-render and no hardcoded colours. Lead world: **Ink & Paper**
(Editorial Noir).

## Structure

    src/
      components/      reusable UI + the Familiar
      features/today/  the Today screen, composed
      domain/          typed model: skills, xp curves, quests, seed state
      motion/          the motion language (durations, easings, springs, variants)
      state/           zustand store (persisted, local-first)
      lib/             i18n (EN / FR), helpers
      styles/          world tokens

## Scripts

- `npm run dev` — dev server
- `npm run build` — typecheck + production build
- `npm run preview` — serve the production build

## Voice

The guide speaks with a social worker's eye and a systems-thinker's read: grounded, dry, honest
before reassuring, dramatic only when earned, bilingual FR / EN — and never shames a missed day.
