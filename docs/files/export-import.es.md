# Exportar e importar

## Exportar

Abre **Exportar** — el botón de la barra superior (Modern y Pro), el botón de exportar de abajo a la izquierda (Smart) o la sección **Exportar** al final del inspector para exportar rápido la selección.

Puedes exportar una **mesa de trabajo** entera o solo los **objetos seleccionados** (recortados a su tamaño).

| Formato | Tipo | Notas |
|---|---|---|
| **SVG** | Vectorial | La mejor opción para la web y otros programas vectoriales. Conserva los degradados, también los de los trazos. Opción: **convertir el texto en curvas**, para que se vea bien sin la fuente. |
| **PDF** | Vectorial | Para imprimir y compartir. |
| **EPS** | Vectorial | Para flujos de imprenta antiguos. |
| **PNG** | Imagen | Con **escala** (1×, 2×, …) y **fondo transparente** opcional. |
| **JPEG** | Imagen | Con ajuste de **calidad**. |
| **WEBP** | Imagen | Archivos pequeños, con calidad y transparencia. |
| **TSCN / SCN** | Escena de Godot | Para usar tu dibujo en un juego de Godot. |
| **VOP** | Datos | Una descripción en JSON de la mesa de trabajo. |

## Importar

Arrastra un archivo al lienzo, o usa **Abrir / Importar**.

| Formato | Se convierte en |
|---|---|
| **SVG** | Formas, trazados y textos editables |
| **PNG, JPEG, WEBP** | Un objeto imagen (usa [Vectorizar](../objects/vectorize.md) para convertirlo en formas) |
| **GLB / glTF** | Un objeto de modelo 3D |
| **TSCN / SCN** | Contenido de una escena de Godot |
| **VOP**, `.vectopen` | Datos de Vectopen |

!!! note "Importar SVG"
    En la 0.2.0-alpha, al importar un SVG las curvas se convierten en muchos segmentos rectos cortos. Importar curvas Bézier reales está previsto.

No se puede importar: `.ai`, `.dxf`, `.pdf` ni JPEG XL.

## Exportar desde scripts o un agente de IA

Los [scripts](../automation/scripts-addons.md) y el [servidor MCP](../integrations/mcp-server.md) también pueden exportar mesas de trabajo.
