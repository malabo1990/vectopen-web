# Pen, Bézier & Node Editing

## Pen

A quick polyline tool: every click adds a straight point.

- **Left-click** — start a line, or add the next point.
- **Right-click** — finish the line. Switching tools also finishes it.

## Bézier (D)

The classic anchor-point pen:

1. **Click** to place a corner point.
2. **Click and drag** to place a smooth point with handles; the handles stay symmetric.
3. Hold **Alt** while dragging to move each handle independently.
4. Move near the **first point** — it highlights; click to close the shape.
5. **Enter** or **Escape** finishes an open path.

The result is an editable path: fill, stroke (including [gradients](../objects/color-gradients.md)), stroke width and open/closed are all in the inspector.

## Editing nodes

Select a path and choose the **Node edit** tool to edit its points.

| Action | How |
|---|---|
| Select a point | Click it · **Shift+click** adds or removes from the selection |
| Select all points | **A** |
| Move points | Drag them |
| Add a point | **Double-click** on the path |
| Delete points | **X**, **Delete** or **Backspace** |
| Pull handles out of a point (make it smooth) | **Alt + drag** from the point |
| Move a handle | Drag the handle |
| **Grab** mode | **G**, then move the mouse; **X** / **Y** lock to an axis; click or **Enter** to confirm, **Escape** to cancel |
| Back to Select | **Escape** |
