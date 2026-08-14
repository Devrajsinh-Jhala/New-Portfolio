---
title: npx-vibe
published: June 23, 2026
category: npm Package
summary: An evidence-first package security checkpoint that inspects npm packages and project dependencies before execution, with deterministic scans, agent output, and a read-only MCP server.
liveUrl: https://devrajsinh-jhala.github.io/NPM-Vibe-check/
codeUrl: https://github.com/Devrajsinh-Jhala/NPM-Vibe-check
packageName: npx-vibe
packageRegistry: npm
installCommand: npx npx-vibe --check esbuild
order: 3
tech:
  - Node.js
  - JavaScript
  - npm
  - MCP
  - GitHub API
  - Ollama
features:
  - Pre-execution package review
  - Integrity-verified tarball scans
  - Lifecycle script detection
  - Project dependency scans
  - Stable agent JSON contract
  - Read-only MCP server
  - Optional AI review
  - Review memory
---

## About

npx-vibe is an open-source npm package that adds a visible security checkpoint before unfamiliar package code runs. It resolves an exact version, downloads the tarball without executing it, verifies npm integrity metadata, inspects bounded source files, and returns evidence with a risk verdict.

The default scan is deterministic, local, and requires no account or API key. Optional AI interpretation is explicitly opt-in, while the core decision remains grounded in registry data, package contents, and reproducible findings.

## Quick start

Review a package without executing it:

```bash
npx npx-vibe --check esbuild
```

Use the CLI as a guarded replacement for an ordinary npx command:

```bash
npx npx-vibe cowsay -- hello from npx-vibe
```

## Why It Exists

Running an npm package through npx can download code and execute a binary immediately. Packages may also declare installation lifecycle scripts with access to the local environment.

npx-vibe inserts a review step before that execution path so developers and coding agents can see what a package contains, why it received a verdict, and whether human approval is required.

## What It Checks

- Registry age, version age, downloads, maintainers, publisher, license, and deprecation status
- Preinstall, install, postinstall, prepare, and related lifecycle behavior
- Tarball integrity, unsafe paths, escaping symlinks, archive size, and entry limits
- Environment access, network calls, shell execution, obfuscation, persistence, and mining indicators
- Remote dependency protocols and lockfile install-script signals
- Repository stars, activity, latest updates, and commit context
- Integrity-keyed review history and changes between versions

## Built for Developers and Agents

The CLI can review one package, act as a guarded replacement for npx, or scan the direct registry dependencies of an existing project. Agent mode produces a stable JSON decision contract and rejects execution flags so automation can fail closed instead of interpreting terminal prose.

Version 1.5 also includes a zero-dependency, read-only MCP server with tools for package scans, project scans, and model-catalog discovery. The package is listed in the official MCP Registry and includes a portable skill for compatible coding agents.

## Evidence-First Design

- Every deterministic source finding includes its matched line and a bounded excerpt
- Popularity stays contextual and cannot override suspicious code behavior
- Package code is downloaded and inspected without being executed
- Install scripts remain disabled unless a user deliberately allows reviewed root scripts
- Optional AI providers and selected models are disclosed in the result
- API keys are excluded from MCP tool arguments and prompt history

## Results and impact

- Published to npm with live adoption tracked through the public registry API
- Listed in the official MCP Registry with a native read-only MCP server
- Supports human-readable terminal decisions and a stable JSON contract for coding agents
- Keeps deterministic evidence available without requiring an account, API key, or AI provider

## Engineering decisions

The central design decision was to make the deterministic scan authoritative and AI interpretation optional. Package code is inspected without execution, hard limits bound archive and source analysis, and the result explains uncertainty instead of hiding it behind an unexplained score.

The project also separates human and agent interfaces. Terminal output is optimized for review, while agent mode uses a stable, fail-closed decision envelope that automation can consume without parsing prose.
