# Exportar e importar

Exportar e importar funcionan por artboard, desde el panel **Export**.

## Formatos de exportación

| Formato | Notas |
|---|---|
| **SVG** | Exportación vectorial — la opción más portable para compartir arte con otras herramientas. |
| **PNG** | Exportación de trama, con un factor de escala configurable. |
| **JPEG** | Exportación de trama. |
| **JPEG XL**, **WEBP** | Formatos de trama modernos. |
| **PDF** | Exportación vectorial básica a PDF. |
| **EPS** | Encapsulated PostScript. |
| **TSCN** / **SCN** | Formatos de escena de Godot — útil si vas a llevar el arte a un proyecto de Godot. |
| **VOP** | Formato propio de instantánea de proyecto de Vectopen. |
| **JSON** | Volcado de datos del artboard en texto plano. |

`.ai` (Adobe Illustrator) y `.dxf` (AutoCAD) se reconocen pero **no están soportados** para exportación.

## Formatos de importación

| Formato | Notas |
|---|---|
| **SVG** | Importación vectorial, interpretada como figuras editables reales. |
| **PNG**, **JPEG** | Se importan como un `Sprite2D` de trama — no se vectorizan. |
| **EPS**, **TSCN**, **SCN** | Soportados. |
| **VOP** | Formato propio de Vectopen. |

`.ai`, `.pdf`, `.dxf`, `.jpeg xl` y `.webp` todavía no están soportados para importación.

## Exportar desde un agente de IA

Si tienes el **[servidor MCP](../integrations/mcp-server.md)** activado, la herramienta `export_artboard` expone exportación PNG/SVG directamente a un agente de IA, esperando a que la exportación termine de verdad antes de responder.
