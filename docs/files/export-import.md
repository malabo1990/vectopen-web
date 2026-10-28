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

## Importing

Drag a file onto the canvas, or use **Open / Import**.

| Format | Becomes |
|---|---|
| **SVG** | Editable shapes, paths and text |
| **PNG, JPEG, WEBP** | An image object (use [Vectorize](../objects/vectorize.md) to turn it into shapes) |
| **GLB / glTF** | A 3D model object |
| **TSCN / SCN** | Godot scene content |
| **VOP**, `.vectopen` | Vectopen data |

!!! note "SVG import"
    In 0.2.0-alpha, SVG import turns curves into many short straight segments. Importing real Bézier curves is planned.

Not supported: `.ai`, `.dxf`, `.pdf` import and JPEG XL.

## Exporting from scripts or an AI agent

[Scripts](../automation/scripts-addons.md) and the [MCP server](../integrations/mcp-server.md) can export artboards too.
