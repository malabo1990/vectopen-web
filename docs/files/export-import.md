# Export & Import

Export and import work per-artboard, from the **Export** panel.

## Export formats

| Format | Notes |
|---|---|
| **SVG** | Vector export — the most portable option for sharing artwork with other tools. |
| **PNG** | Raster export, with a configurable scale factor. |
| **JPEG** | Raster export. |
| **JPEG XL**, **WEBP** | Modern raster formats. |
| **PDF** | Basic vector PDF export. |
| **EPS** | Encapsulated PostScript. |
| **TSCN** / **SCN** | Godot scene formats — useful if you're pulling artwork into a Godot project. |
| **VOP** | Vectopen's own project-snapshot format. |
| **JSON** | Plain-text data dump of the artboard. |

`.ai` (Adobe Illustrator) and `.dxf` (AutoCAD) are recognized but **not supported** for export.

## Import formats

| Format | Notes |
|---|---|
| **SVG** | Vector import, parsed into real editable shapes. |
| **PNG**, **JPEG** | Imported as a raster `Sprite2D` — not vectorized. |
| **EPS**, **TSCN**, **SCN** | Supported. |
| **VOP** | Vectopen's own format. |

`.ai`, `.pdf`, `.dxf`, `.jpeg xl` and `.webp` are not yet supported for import.

## Exporting from an AI agent

If you have the **[MCP server](../integrations/mcp-server.md)** enabled, the `export_artboard` tool exposes PNG/SVG export directly to an AI agent, waiting for the export to actually finish before returning.
