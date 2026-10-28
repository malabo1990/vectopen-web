# Brush

The **Brush** (**B**) draws freehand vector strokes: **click and drag** on the artboard, release to finish.

The stroke isn't a bitmap. Vectopen drops redundant points from the mouse or pen trail and smooths it into a clean curve as you draw, so the result is a light, editable vector stroke rather than thousands of raw samples.

## Brush settings

Shown in the brush panel (in Modern and Pro, inside the right-hand panel):

| Setting | What it does |
|---|---|
| **Style** | Presets: pencil, pen, marker, calligraphy, airbrush and **eraser** |
| **Width (px)** | Stroke width |
| **Opacity (%)** | Stroke opacity |
| **Smoothing** | *Fast (sketch)*, *Balanced* (default), *High (precise)* or *Ultra smooth* |

## Pen pressure (graphics tablets)

With a graphics tablet, the **stroke width follows the pen pressure** — press harder for a thicker line. The **Pen pressure** section of the brush panel has:

| Setting | What it does |
|---|---|
| **Pressure meter** | Shows the pressure arriving from the pen right now — a quick way to check your tablet is detected |
| **Width follows pressure** | Turn pressure on or off |
| **Minimum width** | Width at the lightest pressure, as a % of the brush width |
| **Curve** | *Soft*: a light touch already gives a thick line · *Firm*: you need to press harder |
| **Stabilise** | Filters pen tremor so the width doesn't wobble (higher = more even) |
| **No pen: simulate with speed** | With a mouse: fast = thin, slow = thick |

These settings are remembered between sessions.

!!! info "Tested tablets"
    Tested with a **Huion Kamvas 20** on Linux (KDE Plasma, Wayland). Other tablets that report pen pressure to the operating system should work the same way, but haven't been tested yet. Turning the pen over to its **eraser** end erases strokes, like the eraser style. Pen **tilt** doesn't change the stroke. If your tablet doesn't show pressure in the meter, please tell us on [Telegram](https://t.me/vectopen) or [GitHub](https://github.com/malabo1990/-Vectopen/issues) with the tablet model and your system.

A mouse stroke made right after using the pen is drawn at full width — pressure only applies to strokes that come from the pen.
