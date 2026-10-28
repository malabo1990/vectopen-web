# Text

## Creating text

- **Point text:** with the Text tool (**T**), click on the artboard and type. The box grows with the text.
- **Paragraph text:** with the Paragraph tool (**P**), drag a frame. Text wraps inside the frame, and frames can be **linked** so text flows from one to the next.
- **Double-click** a text to edit it. Click outside to finish; you're returned to the Select tool with the text selected.

Hold **Ctrl** (**Cmd** on macOS) and drag vertically on a text to scale its size interactively.

## Typography

With a text selected, the typography controls are in the inspector (Modern), in the **Text** tab (Pro) or in the text panel (Smart):

- font family (including **Google Fonts**), weight and style;
- size, line spacing, letter spacing;
- bold, italic, underline; case (UPPER, Title, lower);
- alignment, text colour (solid or gradient) and stroke;
- **advanced letters** — styles and effects per letter.

**Ctrl+Alt+.** and **Ctrl+Alt+,** make the selected text heavier or lighter.

## Text effects

Shadows, outlines, 3D and the other [effects](../objects/effects-filters-shaders.md) work on text too. When exporting to SVG you can convert text to curves, so it looks right even where the font isn't installed.

## Performance

Text is drawn as crisp vector outlines when you zoom in, and off-screen text is skipped, so documents with hundreds of text blocks stay fast.
