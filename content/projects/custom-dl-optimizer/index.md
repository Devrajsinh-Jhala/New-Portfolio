---
title: Custom DL Optimizer
published: March 16, 2026
category: PyPI Package
summary: An auditable, workload-aware PyTorch inference plan selector that benchmarks eligible runtimes, validates output parity, and only replaces a trusted baseline when the evidence supports the change.
liveUrl: https://devrajsinh-jhala.github.io/Custom-DL-Optimizer/
codeUrl: https://github.com/Devrajsinh-Jhala/Custom-DL-Optimizer
packageName: custom-dl-optimizer
packageRegistry: PyPI
installCommand: pip install custom-dl-optimizer
order: 2
tech:
  - Python
  - PyTorch
  - Torch FX
  - TorchInductor
  - Triton
  - CUDA
features:
  - Workload-aware plan selection
  - Output parity validation
  - Confidence-bounded benchmarking
  - Lifecycle cost analysis
  - Persistent plan cache
  - Extensible runtime providers
  - JSON evidence reports
  - Agent-ready tools
---

## About

Custom DL Optimizer is an open-source Python package for qualifying PyTorch inference plans against a real model, workload, device, and software stack. It compares eligible execution paths, validates each candidate against eager FP32, and retains the trusted baseline unless a challenger clears the configured performance and correctness policy.

The project is intentionally evidence-first. It treats compilation time, first-call latency, steady-state performance, memory use, numerical parity, and expected request volume as separate deployment concerns instead of assuming that every optimization is automatically beneficial.

## Quick start

Install the base package from PyPI:

```bash
pip install custom-dl-optimizer
```

The optimizer receives a model and representative inputs, qualifies eligible plans, validates outputs against eager FP32, and returns the selected callable together with an auditable decision report.

## The Problem

Deep-learning optimizations are highly workload-dependent. A path that accelerates one architecture can regress another, reduced precision can violate numerical tolerances, and compiler setup costs may outweigh steady-state gains for short-lived jobs.

Custom DL Optimizer makes those tradeoffs measurable before a deployment decision is made.

## How It Works

- Builds eligible eager, native, FX, and TorchInductor execution plans
- Supports optional Torch-TensorRT, ONNX Runtime, TorchAO, and custom providers
- Checks output structure and numerical tolerance against eager FP32
- Measures median and tail latency, confidence bounds, setup cost, first-call cost, and peak CUDA memory
- Selects by steady-state performance or projected lifecycle cost for an expected request volume
- Revalidates cached winners before reuse

## Workload-Aware Evidence

The optimizer can evaluate weighted workload profiles containing multiple shapes, batches, positional arguments, and keyword signatures. Every candidate must pass parity for every case, and selection uses normalized traffic weights so an execution backend cannot win by optimizing an unrepresentative input.

Decision reports preserve runtime provenance, raw measurements, selection reasons, break-even calls, and comparisons against both eager FP32 and the native optimized path. Reports can be exported as JSON and research-ready artifacts.

## Package Engineering

- Published on PyPI with Python 3.10+ support
- Content-addressed plan cache with regression probes
- CLI commands for runtime inspection, report reading, cache management, and paper export
- Bounded, dependency-neutral tools for in-process coding agents
- Optional integrations remain separate so CUDA and compiler stacks can use compatible versions
- MIT licensed with documentation, security policy, contribution guide, changelog, and citation metadata

## Results and impact

- Published on PyPI with support for Python 3.10 and newer
- Produces reusable JSON evidence and research-ready performance artifacts
- Preserves eager FP32 or the native optimized path when challengers fail correctness or confidence policies
- Exposes provider interfaces for additional runtimes without forcing incompatible compiler dependencies

## Engineering decisions

The project is deliberately a qualification layer rather than another compiler. It measures the execution paths already available in the user’s stack, keeps optional runtimes isolated, and treats setup cost, tail latency, parity, and expected request volume as first-class deployment inputs.

Confidence-bounded selection and cached-plan revalidation keep a benchmark win from silently becoming a production regression.
