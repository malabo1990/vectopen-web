# Vectorize

**Vectorize** turns a bitmap image — a photo, a scanned drawing, a logo in PNG — into editable vector shapes.

!!! warning "Linux only in 0.2.0-alpha"
    Vectorize is available in the Linux build. Windows and macOS support is planned.

## How to use it

1. Place an image on the artboard (Image tool, or drag a file in) and select it.
2. Open **Vectorize** (inspector section in Modern, Effects tab in Pro).
3. Choose a **preset** — *Logo / icon*, *Illustration* or *Photo (more detail)* — or adjust the options.
4. Click **Vectorize**. The result is a group of shapes placed over the image.

## Options

| Option | Meaning |
|---|---|
| **Paths** | **Bézier curves** (smooth), **Polygons** (straight segments) or **Pixels** |
| **Detail** | Ignore specks smaller than N pixels — lower means more detail |
| **Colours** | Colour precision — higher means more colour layers |
| **Corners** | Angle above which a point becomes a sharp corner |
| **Black and white** | Black strokes on a transparent background — for logos and signatures |
| **Remove background first (AI)** | Removes the background with an AI model before tracing |
| **Upscale ×4 first (AI)** | Enlarges small images for cleaner curves |
| **Hide the original image** | Hides (doesn't delete) the image afterwards |

The two AI tools are also available on their own: **Remove background** and **Upscale ×4** work on the selected image without vectorizing it. They run on your computer; nothing is uploaded.
