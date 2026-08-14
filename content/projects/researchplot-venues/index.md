---
title: ResearchPlot
published: August 2, 2026
category: PyPI Package
summary: A local, source-backed preflight workspace that audits research figures and submission artifacts against immutable venue profiles while keeping coverage gaps and evidence visible.
liveUrl: https://devrajsinh-jhala.github.io/ResearchPlot/
codeUrl: https://github.com/Devrajsinh-Jhala/ResearchPlot
packageName: researchplot-venues
packageRegistry: PyPI
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

## What I Learned

Building ResearchPlot required treating documentation, provenance, parsers, security boundaries, accessibility, and reproducibility as one system. It deepened my experience with scientific file formats, schema design, rule coverage, deterministic artifacts, and developer tooling that must explain uncertainty rather than hide it.
