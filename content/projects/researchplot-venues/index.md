---
title: ResearchPlot
published: August 2, 2026
category: PyPI Package
summary: A local, source-backed preflight workspace that audits research figures and submission artifacts against immutable venue profiles while keeping coverage gaps and evidence visible.
liveUrl: https://devrajsinh-jhala.github.io/ResearchPlot/
codeUrl: https://github.com/Devrajsinh-Jhala/ResearchPlot
packageName: researchplot-venues
packageRegistry: PyPI
installCommand: pip install researchplot-venues
order: 1
tech:
  - Python
  - Matplotlib
  - PDF
  - SVG
  - SARIF
  - GitHub Actions
features:
  - Venue-aware figure audits
  - Source-backed immutable profiles
  - Coverage-aware verdicts
  - Multi-format artifact inspection
  - Deterministic submission bundles
  - Local browser workspace
  - SARIF and JSON reports
  - Offline-first checks
---

## About

ResearchPlot is an open-source Python package that checks the files researchers actually submit. It resolves a locked, source-backed venue profile, plans the evidence required for each rule, inspects live Matplotlib figures and saved artifacts, and reports both known violations and anything it could not establish.

It is designed as a compliance assistant rather than an acceptance guarantee. Official sources, interpretation notes, caveats, skipped checks, and coverage gaps remain visible so a researcher can understand exactly why a result is compliant, non-compliant, or indeterminate.

## Quick start

Install the package and audit an existing figure against a pinned venue profile:

```bash
pip install researchplot-venues
researchplot audit figures/figure1.pdf --profile nature@2026.08.0
```

The same checks are available through Python, a local browser workspace, CI, and machine-readable JSON or SARIF reports.

## The Problem

Publication requirements are scattered across journal, publisher, and conference guidance. A visually correct chart may still fail because of physical dimensions, font handling, effective DPI, color mode, embedded content, inaccessible styling, or submission-bundle structure.

ResearchPlot turns those requirements into inspectable, versioned profiles and repeatable preflight checks without modifying scientific data or silently inventing missing guidance.

## What It Inspects

- PDF page boxes, dimensions, fonts, images, color spaces, transparency, annotations, actions, and embedded files
- SVG dimensions, font declarations, external references, scripts, handlers, and foreign objects
- PNG, JPEG, and TIFF dimensions, DPI, color mode, bit depth, compression, alpha, and frame information
- EPS format integrity and bounding boxes
- Grayscale and color-vision previews, contrast, clipping, overlap, whitespace, font size, and colormap luminance
- Submission manifests, path safety, hashes, deterministic archives, JATS metadata, and optional RO-Crate metadata

## Venue Profiles and Evidence

ResearchPlot 2.0 includes 22 bundled profiles spanning journals, publisher guidance, and 2026 computer-science and machine-learning conferences. Profiles are immutable JSON records with coordinates, hashes, typed checks, official source locators, verification dates, caveats, and coverage boundaries.

Project locks prevent silent updates or rollback. Missing official guidance stays unspecified, and generic publisher rules are never presented as journal-specific guarantees.

## Research Workflow

- Audit an existing figure before changing plotting code
- Create strict, schema-validated research projects with captions, descriptions, source data, and deliverables
- Style Matplotlib figures at a venue width without mutating global settings
- Export HTML, JSON, SARIF, and verified submission bundles
- Run the same checks locally, through Python, in a browser workspace, or in CI
- Keep normal checks offline, local, and free of telemetry

## Results and impact

- Published on PyPI with 22 bundled, source-backed venue and publisher profiles
- Audits PDF, SVG, PNG, JPEG, TIFF, EPS, live Matplotlib figures, and submission bundles
- Produces deterministic HTML, JSON, SARIF, and verified archive outputs
- Keeps normal checks local, offline, and free of telemetry

## Engineering decisions

ResearchPlot treats every rule as an evidence-planning problem. Profiles are immutable and source-backed, unsupported assumptions remain visible, and missing evidence produces an indeterminate result rather than a false pass.

That model connects documentation provenance, file-format parsing, path safety, accessibility, and reproducibility into one system while keeping scientific data unchanged.
