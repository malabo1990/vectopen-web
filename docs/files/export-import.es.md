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

## Qué conserva cada formato

*Compatible* no significa *idéntico*. Los formatos vectoriales guardan las formas como curvas editables, pero algunas cosas solo existen cuando Vectopen dibuja los píxeles, así que no se pueden escribir como vectores.

| | SVG | PDF | EPS | PNG · JPEG · WEBP |
|---|:-:|:-:|:-:|:-:|
| Formas y trazados (curvas Bézier reales) | ✓ | ✓ | ✓ | como píxeles |
| Relleno y trazo sólidos, grosor del trazo | ✓ | ✓ | ✓ | ✓ |
| **Degradados de relleno** | ✓ | solo el primer color | solo el primer color | ✓ |
| **Degradados de trazo** | ✓ | solo el primer color | solo el primer color | ✓ |
| Opacidad y transparencia | ✓ | ✓ | — | ✓ (PNG, WEBP) |
| Texto | texto editable, o curvas (opción) | curvas | curvas | como píxeles |
| Imágenes | ✓ (incrustadas) | ✓ | ✓ | ✓ |
| **Sombra paralela** | ✓ (filtro SVG) | — | — | ✓ |
| Otros **efectos**, **filtros**, **shaders** | — | — | — | ✓ |
| Máscaras de recorte | — | — | — | ✓ |

- **—** significa que se queda fuera del archivo. Cuando pasa, el panel de exportación te avisa y sugiere PNG.
- **PDF y EPS** convierten siempre el texto en curvas, para que se vea bien sin la fuente instalada (pero ya no se puede editar como texto).
- Para conservar **todo exactamente como en pantalla**, exporta a **PNG** (o WEBP) a 2× o más.
- La exportación **TSCN / SCN** crea nodos normales de Godot (polígonos, líneas, etiquetas, imágenes) que se abren en cualquier proyecto de Godot sin Vectopen; no incluye efectos, filtros ni shaders.

## Importar

Arrastra un archivo al lienzo, o usa **Abrir / Importar**.

| Formato | Se convierte en |
|---|---|
| **SVG** | Trazados editables (curvas Bézier reales), textos e imágenes — ver abajo |
| **PNG, JPEG, WEBP** | Un objeto imagen (usa [Vectorizar](../objects/vectorize.md) para convertirlo en formas) |
| **GLB / glTF** | Un objeto de modelo 3D |
| **TSCN / SCN** | Contenido de una escena de Godot |
| **VOP**, `.vectopen` | Datos de Vectopen |

### Importar SVG de otros programas

Los archivos SVG de Inkscape, programas de diseño, la web o el propio Vectopen se convierten en objetos editables de Vectopen.

| Se conserva | Notas |
|---|---|
| Trazados con **curvas Bézier reales** | Toda la sintaxis de trazados, incluidos los arcos (convertidos a Bézier) y los agujeros |
| Rectángulos, círculos, elipses, líneas, polilíneas, polígonos | Se importan como trazados editables |
| Grupos, anidados a cualquier profundidad | Con sus transformaciones (mover, escalar, girar, inclinar) y el `viewBox` |
| Relleno, trazo, grosor, extremos de línea, discontinuos, opacidad | De los atributos, de `style="…"` y de las reglas CSS de `<style>` |
| Copias `<use>` | Se convierten en objetos reales |
| Texto (`<text>`, `<tspan>`) | Se convierte en texto de Vectopen |
| Imágenes incrustadas en el archivo (URIs `data:`) | Se convierten en objetos imagen |
| **Rellenos degradados** | Se conservan en formas cerradas simples (sus curvas se aproximan con puntos). En formas compuestas y en trazos se usa solo el primer color del degradado |

| No se importa | |
|---|---|
| Trazados de recorte y máscaras (`clipPath`, `mask`) | Se importa el contenido, sin recortar |
| Patrones, marcadores (puntas de flecha), símbolos no usados por `<use>` | Se omiten |
| Filtros SVG (desenfoque, sombras…) | Se omiten — usa los [efectos](../objects/effects-filters-shaders.md) de Vectopen |
| Imágenes enlazadas a archivos externos | Se omiten — solo se importan las imágenes incrustadas |

No se puede importar: `.ai`, `.dxf`, `.pdf` ni JPEG XL.

## Exportar desde scripts o un agente de IA

Los [scripts](../automation/scripts-addons.md) y el [servidor MCP](../integrations/mcp-server.md) también pueden exportar mesas de trabajo.
