# Project Format (.vtc)

Vectopen saves documents as **`.vtc`** files. **Ctrl+S** saves (the first time it asks where), **Ctrl+N** starts a new document; Open and Save As are in the file menu.

- **One file, one document.** A `.vtc` holds every artboard, layer and object, with their colours, gradients (fill and stroke), effects, filters and shaders — the file to back up or send to someone.
- **Built for big documents.** Each artboard is stored and compressed separately. Opening a file reads only the list of pages; a page loads when you scroll to it, and saving rewrites only the pages you changed. A test document with 1,000 pages and 100,000 objects opens in about 1.4 seconds.
- **Undo history is not saved.** Reopening a document starts with an empty history.
- Images placed in the document are stored inside the file.

## Safety and damaged files

- **Keep a backup of important work.** Saving rewrites the `.vtc` file in place; if the computer loses power or crashes *during* a save, the file can be left incomplete.
- If the file's **header or page list** is damaged, Vectopen won't open it — nothing is half-loaded.
- If only **one page** is damaged, the rest of the document opens, but that page opens **empty**. Don't save over the original in that case: use **Save As** with a new name and report the file on [GitHub](https://github.com/malabo1990/-Vectopen/issues) or [Telegram](https://t.me/vectopen).

## Compatibility

- Vectopen reads the **current** format and the **older** ones: the first `.vtc` (a single compressed JSON document), plain JSON projects, and content saved with version 1 of the object format.
- Files are always **saved in the current format**. An older Vectopen may not open a file saved by a newer one.
- While Vectopen is in **alpha**, the format can still change. The aim is that every new version keeps opening files from earlier versions; a formal compatibility guarantee will come with version 1.0.

## Technical details

For developers and tools that want to read `.vtc` files. All numbers are little-endian.

| Bytes | Content |
|---|---|
| 4 | Magic: ASCII `VTC2` |
| 4 | `uint32` — length of the manifest in bytes |
| *n* | **Manifest**: UTF-8 JSON, gzip-compressed |
| … | **Data region**: one gzip-compressed JSON chunk per artboard, concatenated |

The **manifest** is a JSON object:

| Key | Meaning |
|---|---|
| `v` | Version of the object format (currently `2`; version `1` files are still read) |
| `artboards` | Array, one entry per artboard: `name`, `pos` `[x, y]`, `size` `[w, h]`, `off` (offset of its chunk *inside the data region*), `len` (compressed bytes), `rlen` (uncompressed bytes) |
| `loose` | Objects that sit outside every artboard |
| `project`, `session`, … | Document metadata |

Each **artboard chunk**, once decompressed, is a JSON array of the objects on that page (shapes, paths, text, groups with their children, images as embedded PNG, effects, filters and shaders).

Why not a ZIP? Reading one entry from a ZIP scans its whole directory, which made saving a 1,000-page document take seconds. With `VTC2`, reading a page is one seek and one decompress, and saving copies the untouched pages' compressed bytes as they are.

For a format meant for *other* programs to read, export to **VOP** (a neutral JSON description of what's drawn) — see [Export & Import](export-import.md).

## Where files go

Wherever you choose — **Save As** opens the normal file dialog, and **Save** writes back to the same file.

## Older projects

Older projects (the first `.vtc` format and `.vectopen` / JSON files) still open; save them again to convert them to the current `.vtc`.
