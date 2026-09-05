# Tools Overview

Vectopen's toolbar has nine tools:

| Tool | Purpose |
|---|---|
| [Selection](selection-move.md) | Select, move, and resize existing shapes |
| [Move](selection-move.md) | Currently identical to Selection (see note below) |
| [Pen](pen-bezier.md) | Freehand drawing |
| [Bézier](pen-bezier.md) | Draw precise Bézier curves, point by point |
| [Rectangle](shapes.md) | Create rectangles |
| [Ellipse](shapes.md) | Create ellipses |
| [Text](text.md) | Insert and edit text |
| [Hand](hand-navigation.md) | Currently identical to Selection (see note below) |
| [Brush](brush.md) | Freehand vector brush strokes |

Click a tool in the toolbar to activate it. Only one tool is active at a time, and each tool interprets mouse and keyboard input differently while active — the pages in this section describe that per tool.

!!! warning "Move and Hand are work in progress"
    As of this writing, **Move** and **Hand** both run the exact same implementation as **Selection** — clicking either one gives you shape selection/drag/resize, not a dedicated artboard-pan or canvas-navigation mode. Panning the canvas itself doesn't require any of these tools: it works from **any** tool via **Space+drag** or **middle-click+drag** — see **[Hand & Navigation](hand-navigation.md)**.

Shape-creating tools (Rectangle, Ellipse, Pen, Bézier, Text, Brush) always draw onto the **active artboard**; if a project has more than one artboard, make sure the right one is active first.
