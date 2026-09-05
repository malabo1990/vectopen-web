# Project Format (.vtc)

Vectopen saves projects as **`.vtc`** files — a single-file container holding a project manifest plus each artboard's contents, compressed. This is what **Save** / **Save As** write, and what **Open** reads back.

A few things worth knowing:

- **One file, one project.** A `.vtc` bundles every artboard, layer, and shape in the project — it's the file you'd back up or hand to someone else.
- **Undo history is not part of the file.** Only the current state of the project is saved; the undo/redo stack resets when you reopen a project.
- A **`.json`** export option also exists in the Save dialog, useful as a plain-text backup or for inspecting a project's data outside Vectopen — it is not meant as the primary save format.

## Where files are saved

Vectopen doesn't force a specific folder — **Save As** opens a normal file picker, and **Save** writes back to wherever the project was last saved (or prompts for a location the first time).
