# Devraj Jhala Portfolio

A personal portfolio for Devrajsinh Jhala, built with Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui. The site presents selected project work, research publications, professional experience, skills, social links, a GitHub contribution graph, theme switching, and a lightweight visitor counter.

This repository uses the Next.js App Router and the installed Next.js version is newer than many older examples online. Before changing Next-specific code, read the relevant local docs in `node_modules/next/dist/docs/` and follow the note in `AGENTS.md`.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Routes](#routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
- [UI and Styling](#ui-and-styling)
- [Data Flow](#data-flow)
- [Deployment](#deployment)
- [Quality Checks](#quality-checks)
- [Troubleshooting](#troubleshooting)

## Features

- Home page with profile hero, animated role text, CV link, writing link, social links, GitHub activity graph, skills, and work timeline.
- About page with a personal story, profile highlights, CV download, contact action, and interests beyond code.
- Project archive generated from Markdown files in `content/projects`.
- Individual project pages with metadata, live/code links, tech stack, feature count, table of contents, and rendered project writeups.
- Research archive generated from typed research data in `lib/research.ts`.
- Individual research pages with paper links, metrics, keywords, and structured sections.
- Sticky responsive navigation for Home, About, Projects, and Research.
- System-aware dark/light theme powered by `next-themes`, with a theme toggle and `d` keyboard shortcut.
- GitHub contribution graph powered by the GitHub GraphQL API.
- Site-wide visitor counter powered by an external page views API.
- Vercel Analytics integration through `@vercel/analytics`.

## Tech Stack

- Framework: Next.js `16.2.6`
- UI runtime: React `19.2.4` and React DOM `19.2.4`
- Language: TypeScript `5`
- Styling: Tailwind CSS `4`, `tw-animate-css`, CSS variables, and shadcn/ui
- UI primitives and utilities: Radix UI, class-variance-authority, clsx, tailwind-merge
- Icons: lucide-react and react-icons
- Theme management: next-themes
- Animation: motion
- Analytics: Vercel Analytics
- Package manager: npm with `package-lock.json`

## Routes

| Route | Source | Description |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home page with hero, GitHub graph, skills, and experience. |
| `/about` | `app/about/page.tsx` | Personal overview, profile signals, story, and interests. |
| `/projects` | `app/projects/page.tsx` | Project archive generated from local Markdown content. |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Static project detail pages generated from project slugs. |
| `/research` | `app/research/page.tsx` | Research and publications archive. |
| `/research/[slug]` | `app/research/[slug]/page.tsx` | Static research detail pages generated from research slugs. |

## Getting Started

### Prerequisites

- Node.js `20.9` or newer.
- npm, which is the package manager used by this repository.
- A GitHub personal access token if you want the contribution graph to show live data.

### Install

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root. This repository does not rely on a committed `.env.example` file because `.env*` files are ignored by Git.

PowerShell:

```powershell
New-Item -ItemType File .env.local
```

macOS/Linux:

```bash
touch .env.local
```

Add the variables you need:

```env
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=github_pat_your-token
NEXT_PUBLIC_PAGE_VIEWS_SITE_ID=devraj-jhala-portfolio
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Production Preview

```bash
npm run build
npm run start
```

Open `http://localhost:3000` unless a different `PORT` is provided.

## Environment Variables

Store local values in `.env.local`.

| Variable | Required | Scope | Description |
| --- | --- | --- | --- |
| `GITHUB_USERNAME` | Recommended | Server only | GitHub username used by the contribution graph. |
| `GITHUB_TOKEN` | Recommended | Server only | GitHub GraphQL API token used to fetch contribution data. Do not expose this in the browser. |
| `NEXT_PUBLIC_PAGE_VIEWS_SITE_ID` | Optional | Browser | Stable site identifier for the visitor counter API. Defaults to `devraj-jhala-portfolio` when omitted. |

Notes:

- Keep `.env.local` private. The repo ignores `.env*` files.
- Variables without `NEXT_PUBLIC_` stay server-side in Next.js.
- The contribution graph calls `connection()` before reading GitHub env vars so runtime deployment values can be used.
- `NEXT_PUBLIC_PAGE_VIEWS_SITE_ID` is public by design and may be embedded in the client bundle.

## Available Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `npm run dev` | `next dev` | Starts the local development server. Next.js 16 uses Turbopack by default. |
| `npm run build` | `next build` | Creates an optimized production build. |
| `npm run start` | `next start` | Serves the production build. Run `build` first. |
| `npm run lint` | `eslint` | Runs ESLint directly. Next.js 16 no longer relies on `next lint`. |
| `npm run typecheck` | `tsc --noEmit` | Runs TypeScript without emitting files. |
| `npm run format` | `prettier --write "**/*.{ts,tsx}"` | Formats TypeScript and TSX files. |

## Project Structure

```text
.
|-- app/                    # Next.js App Router routes, layout, metadata, and global CSS
|-- components/             # Shared UI components and client components
|-- components/ui/          # shadcn/ui components
|-- content/projects/       # Markdown-backed project entries
|-- hooks/                  # Shared React hooks
|-- lib/                    # Profile, project parsing, research data, metadata, and utilities
|-- public/                 # Static assets served from the site root
|-- sections/               # Home page sections
|-- scripts/                # Project scripts, if needed
|-- AGENTS.md               # Local instructions for AI coding agents
|-- components.json         # shadcn/ui configuration
|-- eslint.config.mjs       # ESLint flat config
|-- next.config.ts          # Next.js configuration
|-- package.json            # Scripts and dependencies
|-- postcss.config.mjs      # Tailwind/PostCSS configuration
`-- tsconfig.json           # TypeScript configuration and path aliases
```

## Content Management

### Profile and Social Links

Edit `lib/profile.ts` to update:

- Display name
- Email address
- GitHub username
- X username
- LinkedIn path
- Footer and hero social links

Edit `lib/site-metadata.ts` to update the name used in generated page titles.

### Home Page Sections

The home page composes section components from `sections/`.

- `sections/HeroSection.tsx`: profile image, role text, short bio, CV link, writing link, and social actions.
- `sections/GithubCommitGraph.tsx`: GitHub contribution graph, loading skeleton, API request, cache interval, and fallback states.
- `sections/SkillsSection.tsx`: skill list, icons, and icon colors.
- `sections/ExperienceSection.tsx`: work timeline, company details, periods, locations, and highlights.

### About Page

Edit `app/about/page.tsx` to update:

- Profile summary
- Highlight cards
- Personal story paragraphs
- Interests beyond code
- CV and contact actions

Profile images are in `public/images/`.

### Projects

Projects live in `content/projects/<slug>/index.md`.

Each project file must include frontmatter followed by Markdown content.

```md
---
title: Example Project
published: June 26, 2025
category: Full Stack Project
summary: Short summary shown in project cards and metadata.
liveUrl: https://example.com
codeUrl: https://github.com/user/repo
order: 1
tech:
  - Next.js
  - TypeScript
  - Tailwind CSS
features:
  - Feature one
  - Feature two
---

## Overview

Project overview text.

## Features

- Important feature
- Another important feature
```

Project behavior:

- The folder name becomes the slug, for example `content/projects/petcom/index.md` maps to `/projects/petcom`.
- `getProjects()` sorts projects by most recent `published` date first, then by `order`.
- `liveUrl` and `codeUrl` are optional. Buttons only render when the fields exist.
- `tech` appears in cards and the project detail sidebar.
- `features` is used for feature counts and project snapshot metadata.
- The custom Markdown renderer supports `##` headings, `###` headings, paragraphs, and `-` unordered lists.
- Avoid unsupported Markdown features such as tables, images, blockquotes, and fenced code blocks unless `components/project-markdown.tsx` is extended.

### Research

Research entries are defined in `lib/research.ts` as typed objects.

Each research item includes:

- `slug`
- `title`
- `published`
- `category`
- `summary`
- `keywords`
- `paperUrl`
- `metrics`
- `sections`

Research behavior:

- `getResearchWorks()` powers `/research`.
- `getResearchWork(slug)` powers `/research/[slug]`.
- `generateStaticParams()` creates static detail routes from the research slug list.
- Section titles become anchor links in the page sidebar.

## UI and Styling

- Global CSS is in `app/globals.css`.
- Tailwind CSS is configured through CSS-first Tailwind 4 imports and design tokens.
- shadcn/ui is configured in `components.json` with the `radix-nova` style and lucide icons.
- Shared class merging uses `cn()` from `lib/utils.ts`.
- The app uses `Inter` and `Geist_Mono` through `next/font/google` in `app/layout.tsx`.
- Theme values are CSS variables for light and dark modes.
- The root layout wraps all routes with `ThemeProvider`, `Navbar`, `SiteFooter`, and Vercel Analytics.

## Data Flow

### GitHub Contribution Graph

`sections/GithubCommitGraph.tsx` fetches contribution data from `https://api.github.com/graphql`.

Flow:

1. `GithubCommitGraph` waits for a request with `connection()`.
2. It reads `GITHUB_USERNAME` and `GITHUB_TOKEN`.
3. If either value is missing, it renders an empty graph fallback.
4. It queries the last year of contribution data.
5. It renders contribution squares, month labels, weekday labels, totals, and a legend.

The fetch request uses `next: { revalidate: 60 * 60 }`, so successful API data can be revalidated hourly.

### Visitor Counter

`components/page-visitor-counter.tsx` is a client component.

Flow:

1. It tracks the site-wide `/` path through the page views API.
2. It fetches the current view count.
3. It renders an ordinal message such as `You are the 123rd visitor`.
4. If the API fails, it renders `Visitor count unavailable`.

### Project Markdown

`lib/projects.ts` reads project files from disk and parses frontmatter with a small custom parser. `components/project-markdown.tsx` renders the supported Markdown blocks into styled React elements.

## Development Conventions

- Use the App Router. Public routes are created with `page.tsx` files inside `app/`.
- Dynamic route `params` are asynchronous in this project. Await `params` before reading values in dynamic pages and metadata functions.
- Keep shared code outside `app/` unless it is route-specific.
- Use the `@/*` TypeScript alias instead of long relative imports.
- Keep browser-only code in files marked with `"use client"`.
- Keep secrets server-side. Only use `NEXT_PUBLIC_` for values that are safe to expose.
- Before changing Next.js routing, metadata, caching, server/client component behavior, or data fetching, read the relevant installed docs under `node_modules/next/dist/docs/`.

## Deployment

Vercel is the simplest deployment target for this app.

Recommended Vercel settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output: handled automatically by Next.js/Vercel
- Environment variables: set `GITHUB_USERNAME`, `GITHUB_TOKEN`, and optionally `NEXT_PUBLIC_PAGE_VIEWS_SITE_ID`

For another Node.js host:

```bash
npm install
npm run build
npm run start
```

Set the `PORT` environment variable if the host does not use port `3000`.

## Quality Checks

Run these before shipping code changes:

```bash
npm run lint
npm run typecheck
npm run build
```

Formatting:

```bash
npm run format
```

If route types are stale, run one of the Next.js commands that generates route types:

```bash
npm run dev
```

or:

```bash
npx next typegen
```

## Troubleshooting

### GitHub graph shows an empty fallback

- Confirm `GITHUB_USERNAME` is set.
- Confirm `GITHUB_TOKEN` is set and valid for GitHub GraphQL requests.
- Restart the dev server after changing `.env.local`.
- Check GitHub API rate limits or token permissions.

### Visitor counter says unavailable

- Confirm the browser can reach `https://page-views-api.ratneshc.com/api/v1`.
- Confirm `NEXT_PUBLIC_PAGE_VIEWS_SITE_ID` is stable across deployments if you want shared counts.
- The site still works if the visitor API fails.

### TypeScript reports missing generated route types

- Run `npm run dev`, `npm run build`, or `npx next typegen`.
- Keep `.next/types` and `.next/dev/types` generated locally; they are not meant for manual editing.

### Project page fails while building

- Check that every `content/projects/<slug>/index.md` file has frontmatter.
- Make sure required fields exist: `title`, `published`, `category`, `summary`, and numeric `order`.
- Make sure `tech` and `features` are simple lists.
- Avoid unsupported Markdown syntax unless the custom renderer is updated.

### Changes to environment variables do not appear

- Restart `npm run dev` after editing `.env.local`.
- Remember that `NEXT_PUBLIC_` values are inlined into browser bundles at build time.
- For production, update environment variables in the deployment platform and redeploy when needed.

## Notes for AI Coding Agents

This project includes `AGENTS.md` because the installed Next.js version has conventions that may differ from older training data. Use the bundled docs in `node_modules/next/dist/docs/` as the source of truth for Next.js APIs, file conventions, routing, caching, and environment behavior.
