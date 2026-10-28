# Colour & Gradients

Every shape, path and text has a **fill** and a **stroke**. Both can be a solid colour or a gradient.

## Choosing a colour

Click the **Fill** or **Stroke** swatch (in the inspector, or the Color tab in Pro). The colour picker has:

- a colour wheel and saturation/brightness square, plus an opacity slider;
- a **hex** field (`#RRGGBB`);
- an **eyedropper** to pick a colour from anywhere on the canvas;
- **palettes** and recently used colours (the Swatches tab in Pro).

Changes apply immediately and are a single undo step.

## Gradients

At the top of the picker, switch from **Solid** to **Linear** or **Radial**:

- Click on the gradient bar to add a colour stop; drag stops to move them; select a stop and press **Delete** (or **−**) to remove it.
- Each stop has its own colour and opacity.
- Set the **angle** for linear gradients; drag the handles on the canvas to place the gradient on the object.

### Gradients on strokes

Strokes can have gradients too — select **Stroke** before choosing the gradient. A stroke gradient follows the path from start to end. It's saved in the `.vtc` file and exported to SVG as a real gradient, so it looks the same in a browser.

## Stroke options

Width, alignment (inside / centre / outside), line caps, dashes (dash and gap length) and arrow heads at the start and end. In Pro they're in the **Stroke** tab; in Modern, in the inspector's Stroke section.

## Default colours

The colours and stroke width used for new objects are set in **Preferences → Theme**.
