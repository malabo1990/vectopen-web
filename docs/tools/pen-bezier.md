# Pen & Bézier Curves

Vectopen has two path-drawing tools, for two different workflows.

## Pen tool

A quick freehand/polyline tool: every click adds a straight point to the current line.

- **Left-click** on empty artboard: start a new line, or add the next point to the one in progress.
- **Right-click**: finish the current line.
- Switching tools also finishes whatever line is in progress.

Good for quick sketches and straight-edged shapes; for curved, precisely-editable paths, use the **Bézier** tool instead.

## Bézier tool

A proper anchor-point pen tool, the same interaction model found in professional vector editors:

1. **Click** to place an anchor point.
2. **Click and drag** (instead of a plain click) to place an anchor *with* a curve handle — the segment leading into that point becomes curved. By default the two handle arms stay symmetric.
3. Hold **Alt** while dragging a handle to break the symmetry and shape each arm of the curve independently.
4. Move the mouse near the **first anchor point** — it snaps and highlights to show the path will close into a loop if you click there.
5. Press **Enter** or **Escape** to finish an open path without closing it.

The result is a `VectorPath` — a real editable Bézier path, with fill color, stroke color, stroke width, and open/closed state all editable afterward from the **Inspector**, same as any other shape.
