# The Interface

Vectopen's window is organized around a central canvas, with tool and inspection panels docked around it.

## Canvas

The large central area where artboards live. Rulers run along the top and left edges, showing world coordinates; you can toggle them from **Preferences → Rulers**.

- **Pan**: use the Hand tool, or hold **Space** while dragging.
- **Zoom**: **Ctrl+=** / **Ctrl+-** to step in/out, **5** to reset zoom, scroll wheel to zoom under the cursor.
- Multiple **artboards** can exist in the same project; the active one receives new shapes.

## Toolbar

Down the left side: the drawing tools (Selection, Move, Pen, Bézier, Rectangle, Ellipse, Text, Hand, Brush). See **[Tools](../tools/index.md)** for what each one does. The active tool is highlighted.

## Layers panel

On the right: a searchable tree of every shape on the active artboard, matching the actual stacking order on the canvas. From here you can:

- Search/filter layers (including special filters like `is:hidden`, `is:group`).
- Add, delete, duplicate, merge, or group layers.
- Toggle a layer's visibility or lock state.
- Click a layer to select the matching shape on the canvas (selection is synced both ways).

## Inspector

Selecting one or more shapes exposes their properties for direct editing: position, size, rotation, fill/stroke color, stroke width, corner radius, opacity, and — for text — font, size, alignment, and content. Editing a value here is a single undoable action, and editing multiple selected shapes at once applies the change to all of them.

## Preferences

Opened from the small icon in the top-left corner (where the two rulers meet). It's organized into tabs:

- **Window** — window mode, size, interface scale.
- **Rulers** — ruler visibility and units.
- **Theme** — light/dark mode, accent colors, default fill/stroke/text color and size, interface language, and the **[MCP server toggle](../integrations/mcp-server.md)**.
- **Snap** — smart snapping behavior (edge/center alignment guides while dragging).
- **Panels** — show/hide individual UI panels.

## Undo history

Nearly every mutation — creating, moving, resizing, recoloring, or deleting a shape — is a single step in the undo stack (**Ctrl+Z** / **Ctrl+Shift+Z**). See **[Keyboard Shortcuts](../keyboard-shortcuts.md)** for the full list of wired shortcuts.
