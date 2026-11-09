---
title: "Vectopen 0.2.3-beta: a new vector brush, text on a path, precise editing and 10,000-element documents"
date: 2026-11-09
summary: "Six days and 64 changes since 0.2.2: a new brush engine (Krita-like pencil, shape and pattern brushes), text on a path with on-canvas handles, professional node editing and selection, zoom up to 190,000 %, smooth 10,000-element documents, five ad campaigns as tests, lower memory use and a first Android preview."
tags: [release, brush, text, performance, android]
draft: false
---

[0.2.2-beta](./post.html?p=2026-11-vectopen-0-2-2-beta) came out on November 3.
In the six days since, **64 changes** have landed, mostly around
three ideas: a real **vector brush**, **text on a path** like in Illustrator or
Affinity, and the **precision and speed** you expect from a professional editor,
even with huge documents. The result is **0.2.3-beta**.

**[Download 0.2.3-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.3-beta)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz) · Android (.apk, preview)

![0.2.3-beta splash screen](../media/shots/023_splash.webp)

If you already have 0.2.2, the logo window will tell you there is a new version
and install it with one click.

## 1. A new brush engine (VGSE)

The brush was rebuilt in phases on its own engine, the *Vectopen Geometric
Stroke Engine*. Every stroke stays vector: you can edit, move, scale and export
it without losing quality.

- **A Krita-like pencil**, with grades from 2H to 8B, paper grain and no wedges
  on tight turns. Tablet pressure changes width and darkness.
- **Marker, stamp-based airbrush and calligraphy**, all anti-aliased and with
  no blotches where the stroke crosses itself.
- **The stroke goes exactly where you put the pen**, even at high zoom, and
  doesn't change when you lift it. Width is yours: switching style no longer
  changes it.

![Pencil grades from 2H to 8B](../media/shots/023_lapiz_durezas.webp)

![Fast pencil scribbles: no wedges or spikes](../media/shots/023_lapiz_garabatos.webp)

![Calligraphy style](../media/shots/023_caligrafico.webp)

- **Shape and pattern brushes.** Stamp shapes along the stroke or bend them to
  follow the curve. "Selection" turns the shapes, groups or curves you have
  selected into the brush (for example, your own polygon).
- **Textures inside the stroke** (also from your own image), **colour
  variation** along the stroke and **geometric effects**: wave, zigzag and
  rough.
- **"My brushes"**: save your favourite settings and come back to them.
- **Edit the nodes of a brush stroke** with a double click: it becomes a curve
  with few nodes and keeps its pressure.
- The stroke mesh is computed in Rust: **up to 28× faster**.

![Shape brush: stars, circles and your own shapes along the stroke](../media/shots/023_pincel_figuras.webp)

![A brush stroke edited by its nodes](../media/shots/023_pincel_nodos.webp)

## 2. Text on a path

Right-click a text and a curve ▸ **"Text on path"**, in all three modes (Smart,
Modern and Pro). The text stays linked to its path: move or edit the curve and
the text follows.

- **Rigid letters sitting on their real baseline**, like Illustrator or
  Affinity: they don't warp with the curve and keep even spacing from start to
  end.
- **On-canvas handles**: ▶ marks the start, ◀ the end and ◆ slides the text
  along the curve.
- **Above, below or centred**, **reverse direction** and **mirror**.
- All text panels (font, weight, size, colour, spacing, advanced letters) keep
  working on placed text.

![Coffee label: text above the circle and, reversed, below](../media/shots/023_etiqueta_cafe.webp)

![Start, end and slide handles](../media/shots/023_texto_tiradores.webp)

![The same text below the curve](../media/shots/023_texto_debajo.webp)

## 3. Precise, professional editing

- **Nodes and handles stay the same size at any zoom**, with a thin red line
  and short blue ticks, Affinity-style.
- **Full undo history while editing nodes**.
- **Adding a node no longer deforms the curve** (De Casteljau subdivision).
- **Correct fills on self-intersecting outlines** (non-zero rule), with no
  flicker and no debugger errors.
- **Selection by real shape**, not by bounding box or image transparency:
  curves, thin strokes, unfilled shapes. The selection box is exact even at
  7400 % zoom, and dragging always works.
- **Extreme zoom, up to about 190,000 %**: smooth edges, truly thin strokes
  (not transparent ones), widths down to **0.005**, decimals in every field and
  crisp handles. Shift + drag changes stroke width on any shape.

![Same-size nodes at 2000 % zoom](../media/shots/023_nodos_zoom.webp)

![Correct fill on a self-intersecting outline](../media/shots/023_relleno_cruzado.webp)

![Shapes and strokes at 6000 %: smooth edges](../media/shots/023_zoom_6000.webp)

## 4. Performance: smooth at 10,000 elements, and heading for 50,000

To measure it for real we built a "brand wall" with shapes, curves, texts,
brush strokes, shape brushes, masks and text on paths, at 3,000, 10,000 and
50,000 elements. With 10,000 mixed elements:

| | 0.2.2-beta | 0.2.3-beta |
|---|---|---|
| Open the document | 25 s | 2.4 s |
| Everything in view | 21 fps | 45–53 fps |
| Drag the whole selection | froze (40 s per step) | 38 ms per step |
| Hover highlight | 50 ms | 0.06 ms |
| Create by script | 85 s | 11.6 s |
| Layers panel with thousands of layers | froze | in batches, smooth |

![The 10,000-element wall, exported](../media/shots/023_muro_10000.webp)

With **50,000 elements** on a modest PC Vectopen already works (saves in 2.5 s,
exports SVG in 4.3 s), but it is still slow and uses about 3 GB. **That is now
the main goal**: very high performance at 50,000 elements, with new algorithms
for drawing, memory layout and selection.

## 5. Lower memory use

- At start-up, the panels of modes you don't use (the Modern inspector, the
  Pro side panel) and the keyboard & mouse panel **are created when you open
  them**: half as many interface elements at launch. On desktop, 792 → 702 MB;
  on Android, 374 → 279 MB.
- The Layers panel now creates rows **in batches of 200** when shapes are
  added one by one too: each shape used to add a row (~10 KB) even when hidden.
- We tried the OpenGL renderer on desktop: it saved 170 MB more, but dropped
  from 49 to 20 fps with 10,000 elements. Vulkan stays.

## 6. Five ad campaigns as tests

On top of the usual tests (over 860 unit tests and about 130 that drive the
interface like a person), this release was tested with **five complete
campaigns, the way an agency would make them**. Each one builds its artboards
with Bézier curves, polygons, masks, brushes, shape brushes made from a
selected shape and text on a path; organises them into layers and groups;
exports to SVG, PDF, EPS, PNG, JPEG, WEBP and VOP; imports them back; and
checks nothing is lost when saving and reopening.

![Campaign 1: festival poster](../media/shots/023_cartel_festival.webp)

![Campaign 2: running shoe for Instagram](../media/shots/023_zapatilla_ig.webp)

![Campaign 4: real-estate billboard with about 1,000 shapes](../media/shots/023_valla_bahia.webp)

![The festival reopened in Vectopen, with its three artboards](../media/shots/023_festival_reabierto.webp)

The campaigns uncovered thirteen bugs, all fixed. Among them: SVG, PDF and EPS
came out **without brush strokes**, dragging a 10,000-element selection took
40 s per step, and exporting a huge artboard to PNG failed (it now scales down
just enough and tells you).

## 7. Export and import

- **SVG, PDF and EPS include brush strokes**, shape brushes and text on paths
  with their real shape.
- Opening files with very detailed imported outlines is **up to 40× faster**,
  and exports no longer contain duplicate points.
- PNG, JPEG and WEBP of artboards larger than 16,384 px scale down and warn.

## 8. Interface

- **Interface size**: automatic for 4K monitors, tablets and small screens,
  and manual in **Settings ▸ Window** with large buttons designed for using a
  tablet without a keyboard (also Ctrl+Alt+= / −).
- A calm, accessible **"Unsaved changes" dialog**.
- **Keyboard & mouse panel** with a virtual keyboard showing which keys are
  free, assigned or in conflict.
- Open files by double-clicking, autosave and 1000 undo steps.

![Settings ▸ Window, usable without a keyboard](../media/shots/023_ajustes_tableta.webp)

![Unsaved changes dialog, dark theme](../media/shots/023_dialogo_salir.webp)

## 9. Platforms

- **Windows 10 / 11**, **Linux** (.deb, .rpm, .tar.gz) and **universal macOS**.
  Intel Macs now work **from macOS 10.13** (previously 10.15); Apple Silicon
  from macOS 11. Older isn't possible: Godot 4.7 itself requires 10.13.
- **Android (experimental preview).** Vectopen starts and works on Android,
  with the interface at a readable size on dense screens. **The interface is
  not designed for tablets or touch yet**: it's for the curious. A proper
  Android and tablet design will come later.
- iPhone / iPad: not for now, since it has to be built on a Mac.

![Vectopen on Android (preview)](../media/shots/023_android.webp)

## 10. What's next

1. **Ultra-high performance at 50,000 elements**, with new algorithms.
2. An interface for **tablets and Android**.
3. A new, more compact context menu and inspector in Smart.
4. Less memory per text (about 35 KB each today).

## Every change, one by one

If you want to read the code: the full comparison is at
**[v0.2.2-beta…v0.2.3-beta](https://github.com/malabo1990/-Vectopen/compare/v0.2.2-beta...v0.2.3-beta)**,
and here is every change with its link (commit messages are in Spanish):

**November 3** (13 changes)

- [`ed44682`](https://github.com/malabo1990/-Vectopen/commit/ed44682) Ventana del logo: X (@malabo_6) en Comunidad, botones en cuadrícula 2 × 2
- [`c2ea826`](https://github.com/malabo1990/-Vectopen/commit/c2ea826) Smart: sin iconos Shader/Script/Vectorizar/Complementos repetidos en la barra de abajo (ya están en la ventana Efectos)
- [`c905ecc`](https://github.com/malabo1990/-Vectopen/commit/c905ecc) Duplicar textos y párrafos (Alt + arrastrar, Ctrl+D, pegar): la copia se ve igual; Alt + arrastrar es un solo paso de deshacer
- [`014f86f`](https://github.com/malabo1990/-Vectopen/commit/014f86f) PENDIENTE: tanda del usuario USR-01…06
- [`d886c0e`](https://github.com/malabo1990/-Vectopen/commit/d886c0e) Panel Teclado y ratón: pestañas, teclado simulado y gestos del ratón (USR-03/04)
- [`c996e1b`](https://github.com/malabo1990/-Vectopen/commit/c996e1b) Pincel: borde con antialias, opacidad sin manchas y vista previa de calidad (USR-05)
- [`26c4a03`](https://github.com/malabo1990/-Vectopen/commit/26c4a03) VGSE fase 1: convertir trazo en contorno + plan por fases (USR-06)
- [`bdaf97c`](https://github.com/malabo1990/-Vectopen/commit/bdaf97c) Abrir con doble clic, guardado automático, aviso al salir y 1000 pasos de deshacer (USR-07/10/11/12)
- [`4baf9fe`](https://github.com/malabo1990/-Vectopen/commit/4baf9fe) Pincel: lápiz, rotulador, aerógrafo y caligráfico con el render de calidad (USR-08)
- [`823c30a`](https://github.com/malabo1990/-Vectopen/commit/823c30a) Panel Pincel compacto, sin deslizadores y siempre dentro de la ventana (USR-09)
- [`823d1e7`](https://github.com/malabo1990/-Vectopen/commit/823d1e7) Menú contextual: el botón Tema ya no congela; trazos sin rayos a mucho zoom
- [`7e862c5`](https://github.com/malabo1990/-Vectopen/commit/7e862c5) Aerógrafo: inicio y final suaves, presión = flujo; trazo 6× más rápido de dibujar
- [`6e26eca`](https://github.com/malabo1990/-Vectopen/commit/6e26eca) Pincel con lápiz real: sin pinchos ni aletas; aerógrafo por sellos; el estilo se guarda

**November 8** (16 changes)

- [`edd6bd4`](https://github.com/malabo1990/-Vectopen/commit/edd6bd4) Lápiz con durezas (2H…8B) y el trazo ya no cambia al soltar
- [`98aeae9`](https://github.com/malabo1990/-Vectopen/commit/98aeae9) Selector de color en tiempo real: 60 fps al arrastrar, un solo deshacer
- [`83476f5`](https://github.com/malabo1990/-Vectopen/commit/83476f5) VGSE fase 1: la presión se reparte sobre el trazado ajustado
- [`7034c4b`](https://github.com/malabo1990/-Vectopen/commit/7034c4b) VGSE fase 1: geometría del trazo en caché; la pintura solo repinta
- [`60dc641`](https://github.com/malabo1990/-Vectopen/commit/60dc641) Lápiz más natural (como Krita): borde que se deshace en grano
- [`bade73c`](https://github.com/malabo1990/-Vectopen/commit/bade73c) Lápiz: el centro deja ver el grano del papel aunque se apriete
- [`d4502dc`](https://github.com/malabo1990/-Vectopen/commit/d4502dc) Lápiz como el de Krita: sólido, borde fino, sin cuñas en giros cerrados
- [`4b50933`](https://github.com/malabo1990/-Vectopen/commit/4b50933) Pincel: el trazo va exactamente donde se pone el lápiz, también con zoom
- [`1400595`](https://github.com/malabo1990/-Vectopen/commit/1400595) Prueba e2e: todos los estilos del pincel con zoom 8× (curva, zigzag, garabato)
- [`127f7ba`](https://github.com/malabo1990/-Vectopen/commit/127f7ba) Pincel con zoom extremo (~5000 %): aerógrafo continuo, grano fino, muestras por px
- [`2de93f9`](https://github.com/malabo1990/-Vectopen/commit/2de93f9) Malla del trazo de pincel en Rust (vectopen_io): 28× más rápida
- [`e57cfbd`](https://github.com/malabo1990/-Vectopen/commit/e57cfbd) Pincel: el grosor es del usuario; cambiar de estilo ya no lo cambia
- [`3df6e0e`](https://github.com/malabo1990/-Vectopen/commit/3df6e0e) test/run_e2e.sh: pruebas con ventana sin tocar los ajustes del usuario
- [`11dd924`](https://github.com/malabo1990/-Vectopen/commit/11dd924) VGSE fase 2: pincel de OBJETO (estampa figuras a lo largo del trazo)
- [`8634389`](https://github.com/malabo1990/-Vectopen/commit/8634389) VGSE fase 2: pincel de PATRÓN (se dobla con la curva) y trazo → figuras
- [`8b85c97`](https://github.com/malabo1990/-Vectopen/commit/8b85c97) PENDIENTE: estado de la fase 2 del VGSE

**November 9** (35 changes)

- [`52caa27`](https://github.com/malabo1990/-Vectopen/commit/52caa27) Pincel de objeto: «Selección» funciona con el flujo real y con todo objeto
- [`287ad17`](https://github.com/malabo1990/-Vectopen/commit/287ad17) Pincel de objeto: reponer _normalize_all (se borró al reescribir «Selección»)
- [`ff2169f`](https://github.com/malabo1990/-Vectopen/commit/ff2169f) Panel Pincel más claro: secciones en tarjetas con título
- [`fe83fe4`](https://github.com/malabo1990/-Vectopen/commit/fe83fe4) VGSE fase 3: texto como pincel y TEXTO EN TRAZADO enlazado
- [`d93e786`](https://github.com/malabo1990/-Vectopen/commit/d93e786) Diálogo «Cambios sin guardar» con el estilo de la app, sobrio y accesible
- [`133477a`](https://github.com/malabo1990/-Vectopen/commit/133477a) Rendimiento: el panel de Capas ya no congela la app con miles de capas
- [`e6494af`](https://github.com/malabo1990/-Vectopen/commit/e6494af) Benchmark: recuento igual antes de guardar y tras cargar (sin pérdida de datos)
- [`9a13c63`](https://github.com/malabo1990/-Vectopen/commit/9a13c63) Tamaño de la interfaz: automático para 4K y pantallas pequeñas, Ajustes y atajos
- [`bbde60a`](https://github.com/malabo1990/-Vectopen/commit/bbde60a) Memoria: el editor en línea de cada texto se crea al editar, no al cargar
- [`de4ec25`](https://github.com/malabo1990/-Vectopen/commit/de4ec25) Rendimiento al dibujar: 10 000 elementos visibles de 21 a 52 fps
- [`02cad19`](https://github.com/malabo1990/-Vectopen/commit/02cad19) Rendimiento: el inspector ya no lee miles de objetos al seleccionar
- [`9ce6985`](https://github.com/malabo1990/-Vectopen/commit/9ce6985) Texto en trazado: alinear, desplazar y dar la vuelta desde el inspector
- [`58e0642`](https://github.com/malabo1990/-Vectopen/commit/58e0642) VGSE fase 4: texturas dentro de los trazos de pincel
- [`e90204c`](https://github.com/malabo1990/-Vectopen/commit/e90204c) VGSE fase 5: efectos geométricos en trazos de pincel (ondulado, zigzag, rugoso)
- [`775abd0`](https://github.com/malabo1990/-Vectopen/commit/775abd0) VGSE fase 6: benchmark de trazos y aerógrafo en Rust (51 → 17 ms con 10 000)
- [`e239f15`](https://github.com/malabo1990/-Vectopen/commit/e239f15) VGSE fase 6: «Mis pinceles» y prueba de compatibilidad de trazos antiguos
- [`d9cd9ad`](https://github.com/malabo1990/-Vectopen/commit/d9cd9ad) Lápiz más rápido: opacidad por vértice en Rust y en la caché de geometría
- [`610a396`](https://github.com/malabo1990/-Vectopen/commit/610a396) VGSE fase 4: variación de color a lo largo del trazo de pincel
- [`e9a8f7e`](https://github.com/malabo1990/-Vectopen/commit/e9a8f7e) VGSE fase 4: textura del trazo desde una imagen del usuario
- [`7f38a03`](https://github.com/malabo1990/-Vectopen/commit/7f38a03) Rendimiento: mover miles de figuras seleccionadas sin atascos
- [`4d99afb`](https://github.com/malabo1990/-Vectopen/commit/4d99afb) PENDIENTE: estado de la memoria por figura tras la tanda nocturna
- [`84a2650`](https://github.com/malabo1990/-Vectopen/commit/84a2650) Texto en trazado: letras rígidas, tiradores y paneles de texto
- [`3c92d44`](https://github.com/malabo1990/-Vectopen/commit/3c92d44) Configuración ▸ Ventana pensada para tableta (sin teclado)
- [`f488564`](https://github.com/malabo1990/-Vectopen/commit/f488564) Nodos: tamaño fijo con zoom, historial, nodo nuevo sin deformar y relleno
- [`8bf358f`](https://github.com/malabo1990/-Vectopen/commit/8bf358f) Selección precisa y arrastre fiable
- [`f68e88f`](https://github.com/malabo1990/-Vectopen/commit/f68e88f) Zoom extremo: bordes lisos, trazos finos de verdad y grosor hasta 0,005
- [`bd48388`](https://github.com/malabo1990/-Vectopen/commit/bd48388) Docs: guía de texto en trazado y edición precisa, artículo del blog
- [`673e374`](https://github.com/malabo1990/-Vectopen/commit/673e374) Nodos en trazos de pincel y zoom extremo en la interfaz
- [`306bf1a`](https://github.com/malabo1990/-Vectopen/commit/306bf1a) Campañas 31–33 y tres fallos que han destapado
- [`6409cb6`](https://github.com/malabo1990/-Vectopen/commit/6409cb6) Rendimiento con 10 000 elementos: arrastre, ratón, crear y abrir
- [`a02cd72`](https://github.com/malabo1990/-Vectopen/commit/a02cd72) Exportar raster enorme ajusta la escala; pool de recuadros sin referencias muertas
- [`df3eb7e`](https://github.com/malabo1990/-Vectopen/commit/df3eb7e) Versión 0.2.3-beta
- [`fb0fce5`](https://github.com/malabo1990/-Vectopen/commit/fb0fce5) Android, macOS 10.13 y menos memoria al arrancar
- [`3c8945b`](https://github.com/malabo1990/-Vectopen/commit/3c8945b) Librerías nativas para Windows y macOS desde Linux (rust/build_cross.sh)
- [`c3510a8`](https://github.com/malabo1990/-Vectopen/commit/c3510a8) Aviso de versión nueva en Android (APK); notas de la 0.2.3-beta; la release avisa a la web


Thanks for trying Vectopen. If something breaks, tell us on
[GitHub](https://github.com/malabo1990/-Vectopen/issues),
[Reddit](https://www.reddit.com/r/Vectopen_editor/) or
[Telegram](https://t.me/vectopen).
