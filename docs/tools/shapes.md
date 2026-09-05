# Shapes: Rectangle & Ellipse

Both shape tools work the same way:

1. Click and drag on the artboard to define the shape's bounding box.
2. Release to create it. Drags smaller than ~3px are ignored (to avoid accidental slivers).

## Modifier keys while dragging

| Key | Effect |
|---|---|
| **Shift** | Constrain to a perfect square (Rectangle) or circle (Ellipse) |
| **Alt** | Draw outward from the center point instead of from a corner |

## Default appearance

New shapes are created with a neutral fill and a dark stroke; both are fully editable afterward from the **Inspector** (fill color, stroke color, stroke width, and — for rectangles — corner radius, including independent per-corner radii).

## Create at center

Shape tools also support inserting a default-sized shape centered on the current artboard directly, without dragging — useful when you want a shape to nudge into place afterward rather than draw it freehand.

## Which artboard?

A shape is added to whichever artboard contains the center point of your drag; if your drag falls fully outside every artboard, it goes to the currently active one instead.
