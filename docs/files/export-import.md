# Export & Import

## Exporting

Open **Export** — the button in the top bar (Modern and Pro), the export button at the bottom-left (Smart), or the **Export** section at the end of the inspector for a quick export of the selection.

You can export a whole **artboard** or only the **selected objects** (cropped to their bounds).

| Format | Type | Notes |
|---|---|---|
| **SVG** | Vector | The best choice for the web and other vector apps. Gradients — including stroke gradients — are kept. Option: **convert text to curves**, so it looks right without the font. |
| **PDF** | Vector | For printing and sharing. |
| **EPS** | Vector | For older print workflows. |
| **PNG** | Image | With a **scale** factor (1×, 2×, …) and optional **transparent background**. |
| **JPEG** | Image | With a **quality** setting. |
| **WEBP** | Image | Small files, with quality and transparency. |
| **TSCN / SCN** | Godot scene | To use your artwork in a Godot game. |
| **VOP** | Data | A JSON description of the artboard. |

## What each format keeps

*Compatible* doesn't mean *identical*. Vector formats keep shapes as editable curves, but some things only exist when Vectopen draws the pixels, so they can't be written as vectors.

| | SVG | PDF | EPS | PNG · JPEG · WEBP |
|---|:-:|:-:|:-:|:-:|
| Shapes and paths (real Bézier curves) | ✓ | ✓ | ✓ | as pixels |
| Solid fill and stroke, stroke width | ✓ | ✓ | ✓ | ✓ |
| **Fill gradients** | ✓ | first colour only | first colour only | ✓ |
| **Stroke gradients** | ✓ | first colour only | first colour only | ✓ |
| Opacity and transparency | ✓ | ✓ | — | ✓ (PNG, WEBP) |
| Text | editable text, or curves (option) | curves | curves | as pixels |
| Images | ✓ (embedded) | ✓ | ✓ | ✓ |
| **Drop shadow** | ✓ (SVG filter) | — | — | ✓ |
| Other **effects**, **filters**, **shaders** | — | — | — | ✓ |
| Clipping masks | — | — | — | ✓ |

- **—** means it's left out of the file. When that happens, the export panel warns you and suggests PNG.
- **PDF and EPS** always turn text into curves, so it looks right without the font installed (but it's no longer editable as text).
- To keep **everything exactly as on screen**, export to **PNG** (or WEBP) at 2× or more.
- **TSCN / SCN** export creates plain Godot nodes (polygons, lines, labels, images) that open in any Godot project without Vectopen; effects, filters and shaders are not included.

## Importing

Drag a file onto the canvas, or use **Open / Import**.

| Format | Becomes |
|---|---|
| **SVG** | Editable paths (real Bézier curves), text and images — see below |
| **PNG, JPEG, WEBP** | An image object (use [Vectorize](../objects/vectorize.md) to turn it into shapes) |
| **GLB / glTF** | A 3D model object |
| **TSCN / SCN** | Godot scene content |
| **VOP**, `.vectopen` | Vectopen data |

### Importing SVG from other programs

SVG files from Inkscape, design apps, the web or Vectopen itself become editable Vectopen objects.

| Kept | Notes |
|---|---|
| Paths with **real Bézier curves** | The full path syntax, including arcs (converted to Bézier) and holes |
| Rectangles, circles, ellipses, lines, polylines, polygons | Imported as editable paths |
| Groups, nested at any depth | With their transforms (move, scale, rotate, skew) and the `viewBox` |
| Fill, stroke, stroke width, line caps, dashes, opacity | From attributes, `style="…"` and `<style>` CSS rules |
| `<use>` copies | Resolved into real objects |
| Text (`<text>`, `<tspan>`) | Becomes Vectopen text |
| Images embedded in the file (`data:` URIs) | Become image objects |
| **Gradient fills** | Kept on simple closed shapes (the curves are then approximated with points). On compound shapes and on strokes, only the first gradient colour is used |

| Not imported | |
|---|---|
| Clipping paths and masks (`clipPath`, `mask`) | The content is imported, unclipped |
| Patterns, markers (arrow heads), symbols not used by `<use>` | Skipped |
| SVG filters (blur, shadows…) | Skipped — add Vectopen [effects](../objects/effects-filters-shaders.md) instead |
| Images linked to external files | Skipped — only embedded images are imported |

Not supported: `.ai`, `.dxf`, `.pdf` import and JPEG XL.

## Exporting from scripts or an AI agent

[Scripts](../automation/scripts-addons.md) and the [MCP server](../integrations/mcp-server.md) can export artboards too.
