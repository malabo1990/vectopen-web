# Effects, Filters & Shaders

Three ways to change how an object looks, from simplest to most powerful. None of them changes the object itself: you can switch any of them off or remove it at any time.

| | You use it with | Think of it as |
|---|---|---|
| **Effects** | sliders | finishing touches: shadow, outline, bevel |
| **Filters** | sliders | a photo filter for the whole object |
| **Shaders** | code (or a template) | your own filter |

Where to find them:

- **Effects** and **Filters** — the inspector sections in Modern, the **Effects** tab in Pro, and the **Effects** window in Smart.
- **Shaders** — the **Shader** tab of the Effects window, in the **Smart** interface.

!!! note "Shaders in Modern and Pro"
    In 0.2.0-alpha the Shader tab is only in Smart's Effects window. Switch to Smart to write a shader; the result stays on the object in every interface. Bringing it into the Modern and Pro right panel is planned.

## Effects

Click **+ Add effect** and choose:

- **Drop Shadow** and **Inner Shadow**
- **Outline**
- **Blur**
- **Color Overlay** and **Gradient Overlay**
- **Inner Glow**
- **Bevel & Emboss**
- **3D** and **Extrusion**

Effects stack: an object can have several, and you can move them up or down, switch each one on or off, or remove it. Each has its own sliders (distance, size, colour, opacity…). Dragging a slider updates the canvas live and records one undo step when you let go.

## Filters

Click **+ Add filter**. A filter transforms the pixels of the object as it is drawn:

| Filter | What it does |
|---|---|
| **Frosted Glass** | Blurs what's behind and tints it, like frosted glass |
| **Grain** | Film grain (colour or monochrome) |
| **Duotone** | Maps the object to two colours: shadows and highlights |
| **Neon** | A coloured glow around the object |
| **Chromatic Aberration** | Splits the colour channels, like a cheap lens |
| **Glitch** | Shifts horizontal bands, like a broken screen |
| **Halftone** | Turns it into print-style dots |
| **Pixelate** | Big square pixels |

One of each kind per object.

## Shaders

A **shader** is a small program that runs on the graphics card and decides the colour of every pixel of the object. The **Shader** tab has:

- a code editor with line numbers and highlighting, which **checks your code as you type** and marks the line with the error;
- **Live** mode — the object updates while you type;
- **templates** to start from: invert, greyscale, wave, pixelate, hologram, rim light, animated rainbow, blur;
- a **library** of your own shaders: save, load, rename, duplicate, delete.

Shaders use Godot's shading language (similar to GLSL). Applying a shader is one undo step, and it's saved in the `.vtc` file.

!!! note
    Shader parameters of type *texture* are not saved in the file yet.
