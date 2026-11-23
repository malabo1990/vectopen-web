---
title: "Vectopen 0.2.4-beta: 2D lighting, blends, real tables, layout containers and the fastest editor yet"
date: 2026-11-23
summary: "99 changes since 0.2.3: lights with real-time 2D shadows, blends between several objects, advanced corners, tables with their own panel, flex and grid containers, components, master pages, “Convert to Bézier path”, live Shift + drag stroke width and a Windows installer. And clicking a shape drops from 11 to 6 ms."
tags: [release, lighting, blend, layout, performance]
draft: false
---

[0.2.3-beta](./post.html?p=2026-11-vectopen-0-2-3-beta) came out on November
9. Since then **99 changes** have landed. Vectopen has done **30 real design
jobs** as automated tests (posters, a magazine, packaging, a brand manual,
maps, a comic…), each one checked in all three interfaces. The result is
**0.2.4-beta**.

**[Download 0.2.4-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.4-beta)**
&nbsp;Windows (.exe installer or .zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz) · Android (.apk, preview)

If you already have 0.2.3, you will see the new-version notice in the logo
window and can install it with one click.

## 1. 2D lighting

There is a new **Light** tool in the toolbar: point, spot, directional (sun)
and ambient. You move a light with on-canvas handles (● range and direction,
◆ spot angle) and **everything updates in real time**, also while typing or
dragging a number in the panel.

- **Real 2D shadows**: each object's silhouette, dark next to it and fading
  out towards the end, following the light rays.
- They react to **every** light property: intensity, colour (complementary
  shadow tint), **height** (a low light casts a long shadow), hard edge, range
  and cone. Ambient light fills the shadows.
- Shapes, **text and paragraphs** (letter by letter), **brush strokes** and
  **Bézier paths** all cast shadows.
- Smooth with 500 shapes and 6 lights.

![A spot light on a shape: the shadow follows the light cone](../media/shots/024_luz_foco.webp)

![The compact Lighting panel](../media/shots/024_luz_panel.webp)

## 2. Blends

Intermediate steps of **shape, colour (gradients too), stroke and opacity**
between two or more objects (A → B → C), optionally along a guide path. It is
non-destructive: change one end and the steps are recalculated. It has its
own **Blend panel** (fixed steps or by distance, orient to the guide,
reverse, expand and release) and works with shapes, brush strokes, open
Bézier paths and text.

![Blends between shapes, brush strokes and text](../media/shots/024_fusion_todo.webp)

![Blending gradients](../media/shots/024_fusion_degradado.webp)

![A blend along a guide path](../media/shots/024_fusion_guia.webp)

## 3. Advanced corners

Each corner of a rectangle can be different: round, **inverted round**,
chamfer, notch, zigzag or saw-tooth. Pick them in the Shapes panel, or
**Shift + click** a corner-radius handle to cycle through the types.

![Inverted round corners](../media/shots/024_esquina_inversa.webp)

![Zigzag corners](../media/shots/024_esquina_zigzag.webp)

## 4. Real tables

A table now behaves like a table: **one click selects the whole table**, with
no Bézier handles on its grid, and **double-clicking a cell** (even an empty
one) starts typing in it. The new **Table panel** covers:

- rows and columns; insert above, below, left or right of the active cell;
  delete;
- row height, column width and “Equal columns”;
- header, alternating rows, font size, border, alignment and colours.

In the Layers panel, a table is a single object.

![A table with its panel](../media/shots/024_tabla.webp)

## 5. Layout: containers, components and master pages

- **Auto Layout containers**: flex (row, column, wrap) and grid, with
  padding, gap and alignment, and their own **Container panel**.
- **Components** (symbols) in Resources: every copy is the same and editing
  one updates the rest. Thumbnail, copy count, place, select all copies,
  rename and detach.
- **Master pages** as in InDesign: shared header, footer and page number.
- **Data merge** from CSV (catalogues, cards) and a **table of contents**.
- **Named text styles** and **global document colours**.

![The Container panel](../media/shots/024_contenedor.webp)

![Components in Resources](../media/shots/024_componentes.webp)

## 6. More direct editing

- **Convert to Bézier path** (right-click, in all three modes): polygons,
  rectangles, stars and ellipses become an editable path with the same shape
  and style; text becomes curves. The node editor opens straight away.
- **Text on a path** sits above its guide, and one click on any letter
  selects and drags it, as in Inkscape, Affinity or Illustrator.
- **Live Shift + drag stroke width**: with the brush and pencil in any
  direction (up or right = thicker), and over a selected shape or Bézier
  path, as a single undo step.

![Text on a Bézier path, selected with one click](../media/shots/024_texto_trazado.webp)

## 7. Performance

This version was measured against the previous one with the same tests:

| | 0.2.3 | 0.2.4 |
|---|---|---|
| Clicking a shape | 11 ms | **~6 ms** |
| Releasing it after a move | 28 ms | **~5 ms** |
| Opening a vectorized photo | 25 s | **0.7 s** |
| Select all with 50,000 elements | 5 s | **0.9 s** |

Moving a shape costs under 1 ms per mouse move, and changing the stroke width
of 500 selected strokes runs at about 30 ms per frame.

## 8. And more

- **Windows installer** per user (no administrator needed) and automatic
  updates from the app. The vectorizer ships on Windows, Linux and Apple
  Silicon Macs.
- **Android**: native text and import libraries.
- Discreet **error notices** and “Contact / report a bug”, which prepares the
  report with the technical details; nothing is sent on its own.
- **Middle button** (or the pen button) + drag scrolls any panel.
- **Nested masks**, layer **blend modes** (also in SVG and PDF), **PDF of
  all pages**, **simplify path** and a **pattern brush** with start, corner
  and end pieces.
- Everything new is translated into all **10 languages**.

The full list is in the
[release notes](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.4-beta)
and in the
[99 changes](https://github.com/malabo1990/-Vectopen/compare/v0.2.3-beta...v0.2.4-beta).
