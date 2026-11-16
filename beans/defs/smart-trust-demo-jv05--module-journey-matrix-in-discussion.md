# smart-trust-demo-jv05
title: 'JV-05: journeys viewer, a module × journey matrix in the Discussion lab'
status: todo
type: feature
priority: normal
tags:
    - upstream
    - journeys-viewer-parity
created_at: 2026-11-16T10:00:00Z
updated_at: 2026-11-16T10:00:00Z
---

The owner asked (2026-11-16) for the Discussion tab to show where each module (M1–M7) meets the journey steps, with the technical and policy overlaps at each meeting point.

**Today (this repository):** the lab step `map` ("Modules × journey") lists every module's questions with the step each is asked at (`modules: [M1…M7]`), and links the full matrix, rendered by `tools/workshop/module-journey-map.ts` from `workshops/module-journey-map.json` to the IG page `module-journey-map.html`. Because the workshop schema is strict, the matrix itself cannot be drawn in the viewer. Questions shown in both this step and an earlier one (M3 in Mapping, M6 and M7 in Pathway) are listed twice in the summary, with one answer, because they share a key.

**Fix (upstream, cat-harness-tools `schemas/process/workshop.ts`, `scripts/journeys/present-views.ts`):** a lab-step part `matrix: true` that draws modules × steps from `steps[].questions`. Each cell links to its step, and an optional `workshop.matrix` holds `{module, step, technical, policy}` text and cross-module `overlaps`, in the shape of `workshops/module-journey-map.json`. The summary should also de-duplicate items by key.

## Done when

- the Discussion tab draws the matrix, with the technical and policy text on hover or expanded;
- the summary lists each answer once;
- this repository moves `workshops/module-journey-map.json` into the workshop and keeps the IG page.
