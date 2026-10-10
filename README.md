# Devrajsinh Jhala Portfolio

The source for [devraj.pro](https://www.devraj.pro): a multi-page personal site built with Next.js, React and TypeScript, styled with one hand-written stylesheet.

This repository uses the Next.js App Router, and the installed Next.js version is newer than many examples online. Before changing Next-specific code, read the relevant local docs in `node_modules/next/dist/docs/` and follow the note in `AGENTS.md`.

## What is on the site

- **Home** has two sides behind one switch. The professional side shows experience as levels (a pinned stage that changes as you scroll), skills as icons that float and then line up into groups, open-source packages, research, and education. The personal side shows the latest writing, a bookshelf, anime, and a note box.
- **Projects** lists the open-source packages with live download counts, and the earlier full-stack builds. Every project has its own write-up page.
- **Research** lists the published papers. Every paper has its own page.
- **Blog** and **Books** are written as Markdown files in this repository.
- **About** is the longer personal story.
- A character portrait looks towards the pointer and reacts to the page, and Bruno the Doberman follows the pointer and does a trick when clicked.
- Light and dark themes (press `d`), page-to-page transitions, an RSS feed, a sitemap, and search metadata.

## Tech stack

- Next.js `16.2.6` (App Router, Turbopack) with React `19.2.4` and TypeScript
- Plain CSS in `app/globals.css` (no CSS framework)
- `next-themes` for the theme, `marked` for Markdown, `react-icons` for the technology logos
- React view transitions for moving between pages (`experimental.viewTransition` in `next.config.ts`)
- Vercel Analytics

## Routes

| Route | Source | Content |
| --- | --- | --- |
| `/` | `app/page.tsx` | Home, both sides |
| `/about` | `app/about/page.tsx` | Personal story |
| `/projects`, `/projects/[slug]` | `app/projects/` | From `content/projects/` |
| `/research`, `/research/[slug]` | `app/research/` | From `lib/research.ts` |
| `/blog`, `/blog/[slug]` | `app/blog/` | From `content/blog/` |
| `/books`, `/books/[slug]` | `app/books/` | From `content/books/` |
| `/feed.xml` | `app/feed.xml/route.ts` | RSS feed of the blog |
| `/api/now-playing` | `app/api/now-playing/route.ts` | The last track played, from Last.fm |

## Getting started

Requires Node.js `20.9` or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

Both are optional. Without them the "last played" line under the portrait simply stays empty.

| Variable | Description |
| --- | --- |
| `LASTFM_USERNAME` | The Last.fm account that the music app scrobbles to. |
| `LASTFM_API_KEY` | A Last.fm API key. Server only; never expose it to the browser. |

Put them in `.env.local` for local work (the repository ignores `.env*` files) and in the hosting platform's environment settings for production.

The play button beside that line plays Apple's 30-second preview of the song. The preview is found through Apple's public catalogue search (`lib/apple-music.ts`), which needs no key; the button only appears when the title and artist both match.

## Writing content

### A blog post

Add a Markdown file to `content/blog/`. The file name becomes the address: `content/blog/my-post.md` is served at `/blog/my-post`.

```md
---
title: "My post"
date: 2026-10-20
topic: practice
---

The post, in Markdown.
```

- `topic` is what the filter on the blog page groups by.
- Reading time is worked out from the text.
- A file whose name starts with `_` is a draft and is not published.
- `original` is optional: the address where the post first appeared. A post that has `original` but no text yet is listed with a link out to that address.

### A book

Add a Markdown file to `content/books/`. The shelf makes room for it, and starts a new shelf when one fills up.

```md
---
title: "Atomic Habits"
author: James Clear
order: 2
cloth: "#2f4a3a"
foil: "#e9dfc3"
height: 164
width: 36
---

My notes, in Markdown.
```

`cloth` and `foil` are the spine and lettering colours. `height` and `width` are the size of the spine in pixels. `order` sets the position on the shelf.

### A project

Projects live in `content/projects/<slug>/index.md`. Required fields: `title`, `published`, `category`, `summary`, `order`. Optional: `liveUrl`, `codeUrl`, `tech`, `features`, and for published packages `packageName`, `packageRegistry` (`npm` or `PyPI`), `installCommand`, `tagline` and `blurb`.

Package versions and download counts are read from npm and PyPI once a day by `lib/package-stats.ts`, which also holds fallback values for when a registry cannot be reached. A new package needs an entry there.

### Everything else

| What | Where |
| --- | --- |
| Name, email, social links, résumé path | `lib/profile.ts` |
| Experience levels, education and awards | `lib/experience.ts` |
| Research papers | `lib/research.ts` |
| Anime list | `lib/anime.ts` |
| Hero text for the two sides | `components/home-sides.tsx` |
| About page text | `app/about/page.tsx` |
| Skills icons and groups | `components/skills.tsx` |

## Theme

Every colour is a token at the top of `app/globals.css`, once for light and once for dark. Change the accent and the tinted neutrals there and the whole site follows. The colours of the share image (`app/opengraph-image.tsx`) and the browser bar (`app/layout.tsx`, `app/manifest.ts`) are set separately.

The portrait's backdrop is part of the artwork. `art/sprites/` holds the original sheets, which have a navy backdrop. This turns it into a soft lavender, a light tint of the theme's hue, and writes the result to `public/sprites/`:

```bash
node scripts/tint-portrait.mjs
```

Pass a hue in degrees to tint towards another colour, for example `node scripts/tint-portrait.mjs 150`. The `--portrait` token in `app/globals.css` fills the circle while the sheets load, so set it to the new backdrop colour as well.

## Project structure

```text
.
|-- app/                # Routes, layout, metadata routes and global CSS
|-- art/sprites/        # Original portrait sheets, before tinting
|-- components/         # Shared components (most interactive ones are client components)
|-- content/blog/       # Blog posts
|-- content/books/      # Book notes
|-- content/projects/   # Project write-ups
|-- lib/                # Data, content loaders and small helpers
|-- public/sprites/     # Sprite sheets for the character and Bruno
|-- scripts/            # One-off helpers (portrait tinting)
`-- public/             # Photo, résumé and other static files
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create the production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm run format` | Format TypeScript files with Prettier. |

Run `lint`, `typecheck` and `build` before shipping a change.

## Deployment

The site is deployed on Vercel with the default Next.js settings. Set `LASTFM_USERNAME` and `LASTFM_API_KEY` in the project's environment variables if the "last played" line should show.

## Credits

Anime artwork is served from AniList. Technology logos belong to their owners.
