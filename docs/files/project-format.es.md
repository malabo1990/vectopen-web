# Formato de proyecto (.vtc)

Vectopen guarda los documentos como archivos **`.vtc`**. **Ctrl+S** guarda (la primera vez pregunta dónde), **Ctrl+N** empieza un documento nuevo; Abrir y Guardar como están en el menú de archivo.

- **Un archivo, un documento.** Un `.vtc` contiene todas las mesas de trabajo, capas y objetos, con sus colores, degradados (de relleno y de trazo), efectos, filtros y shaders — es el archivo que guardas como copia o envías a otra persona.
- **Pensado para documentos grandes.** Cada mesa de trabajo se guarda y comprime por separado. Al abrir solo se lee la lista de páginas; una página se carga cuando llegas a ella, y al guardar solo se reescriben las páginas que cambiaste. Un documento de prueba con 1.000 páginas y 100.000 objetos se abre en unos 1,4 segundos.
- **El historial de deshacer no se guarda.** Al volver a abrir un documento, el historial empieza vacío.
- Las imágenes colocadas en el documento se guardan dentro del archivo.

## Seguridad y archivos dañados

- **Guarda una copia del trabajo importante.** Al guardar se reescribe el archivo `.vtc` en su sitio; si el ordenador se apaga o se cuelga *durante* el guardado, el archivo puede quedar incompleto.
- Si la **cabecera o la lista de páginas** del archivo está dañada, Vectopen no lo abre: no se carga a medias.
- Si solo **una página** está dañada, el resto del documento se abre, pero esa página aparece **vacía**. En ese caso no guardes encima del original: usa **Guardar como** con otro nombre y envía el archivo en [GitHub](https://github.com/malabo1990/-Vectopen/issues) o [Telegram](https://t.me/vectopen).

## Compatibilidad

- Vectopen lee el formato **actual** y los **anteriores**: el primer `.vtc` (un único JSON comprimido), los proyectos en JSON plano y el contenido guardado con la versión 1 del formato de objetos.
- Siempre se **guarda en el formato actual**. Un Vectopen más antiguo puede no abrir un archivo guardado por uno más nuevo.
- Mientras Vectopen esté en **alfa**, el formato aún puede cambiar. El objetivo es que cada versión nueva siga abriendo los archivos de las anteriores; la garantía formal de compatibilidad llegará con la versión 1.0.

## Detalles técnicos

Para desarrolladores y herramientas que quieran leer archivos `.vtc`. Todos los números son little-endian.

| Bytes | Contenido |
|---|---|
| 4 | Firma: ASCII `VTC2` |
| 4 | `uint32` — longitud del manifiesto en bytes |
| *n* | **Manifiesto**: JSON UTF-8 comprimido con gzip |
| … | **Región de datos**: un bloque JSON comprimido con gzip por cada mesa de trabajo, uno tras otro |

El **manifiesto** es un objeto JSON:

| Clave | Significado |
|---|---|
| `v` | Versión del formato de objetos (ahora `2`; los archivos de la versión `1` se siguen leyendo) |
| `artboards` | Lista, una entrada por mesa de trabajo: `name`, `pos` `[x, y]`, `size` `[ancho, alto]`, `off` (posición de su bloque *dentro de la región de datos*), `len` (bytes comprimidos), `rlen` (bytes sin comprimir) |
| `loose` | Objetos que están fuera de todas las mesas de trabajo |
| `project`, `session`, … | Metadatos del documento |

Cada **bloque de mesa de trabajo**, una vez descomprimido, es una lista JSON con los objetos de esa página (formas, trazados, textos, grupos con sus hijos, imágenes como PNG incrustado, efectos, filtros y shaders).

¿Por qué no un ZIP? Leer una entrada de un ZIP recorre todo su directorio, y guardar un documento de 1.000 páginas tardaba segundos. Con `VTC2`, leer una página es un salto y una descompresión, y al guardar se copian tal cual los bytes comprimidos de las páginas que no cambiaron.

Si quieres un formato pensado para que lo lean *otros* programas, exporta a **VOP** (una descripción neutra en JSON de lo dibujado) — ver [Exportar e importar](export-import.md).

## Dónde se guardan

Donde tú elijas — **Guardar como** abre el diálogo normal de archivos, y **Guardar** escribe en el mismo archivo.

## Proyectos antiguos

Los proyectos antiguos (el primer formato `.vtc` y los archivos `.vectopen` / JSON) se siguen abriendo; guárdalos de nuevo para convertirlos al `.vtc` actual.
