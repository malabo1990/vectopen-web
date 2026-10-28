---
title: "Vectopen 0.2.0-alpha: three interfaces and the first downloads"
date: 2026-10-28
summary: "The first build you can download for Windows, macOS and Linux. Smart, Modern and Pro interfaces, gradients on strokes, a much better layer panel, 750+ tests — and how you can help keep it going."
tags: [release, ui, layers, gradients, packaging]
draft: false
---

The [first post](./post.html?p=2026-09-artboards-layers-and-a-magnet) was
about foundations: artboards, layers, the magnet, undo. Since then the focus
moved from *the engine works* to *a person can actually use this*. The result
is **0.2.0-alpha** — the first version you can download and run without
installing Godot.

**[Download 0.2.0-alpha &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.0-alpha)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz)

> **It's an alpha: you will find bugs.** When you do, please tell me — on
> [Telegram (t.me/vectopen)](https://t.me/vectopen) for a quick chat, or as a
> [GitHub issue](https://github.com/malabo1990/-Vectopen/issues) with steps
> to reproduce. Every report becomes a test.

![Vectopen 0.2.0-alpha — the Modern interface](../media/shots/modern_light.webp)

## Three interfaces, one editor

Vectopen now has three ways to work, and you can switch between them at any
time from the top bar:

- **Smart** — a clean canvas with floating panels. The original layout.
- **Modern** — layers on the left, a single inspector on the right, tools in
  a bar at the bottom.
- **Pro** — a dense studio layout: colour, transform, text and effects always
  docked in the right panel.

The hard part was not drawing three layouts — it was making them *complete*.
The first version of Modern and Pro was missing half of what Smart could do:
no filters, no full typography, no effects, no vectorize. Selecting a circle
showed an empty inspector. That was a fair complaint, and it was fixed the
honest way: instead of re-building every panel three times, the real Smart
panels (full text, effects, filters, vectorize) are now **embedded** in the
Modern inspector and in Pro's right panel. One implementation, three homes.

Each interface also owns its panels now. Switching from Smart to Pro closes
Smart's floating colour picker instead of leaving it stranded under the
rulers.

![The Pro interface, dark theme](../media/shots/pro_dark.webp)

## Gradients on strokes

Fills could have gradients; strokes could not. Now both can — solid, linear or
radial, with stops you edit on the canvas. A stroke gradient is drawn with
per-vertex colours along the path, saved in the `.vtc` file, and exported to
SVG as a real `<linearGradient>` in user space, so it looks the same in a
browser.

## Shapes

The bottom bar in Modern went from three fixed shape buttons to one button
that opens the shape panel — the same as Smart. The panel gained a **Shapes**
tab: heart, drop, arrows, cross, moon, bolt, speech bubble and cloud.

A bug found on the way: stars and several other shapes **could not be resized
by dragging**. The transform snapshot only stored `size` for some shape
classes, so the resize silently did nothing. Fixed, and a test now drags every
shape type and fails if any of them refuses.

## Effects, filters, shaders and add-ons — what's the difference?

All four change how things look or what the app can do, which makes them
easy to mix up. A quick guide, from simplest to most powerful. None of them
destroy your drawing: you can switch any of them off or remove it, and the
original shape is still there.

**Effects** — *the classic finishing touches.* Drop shadow, inner shadow,
outline, blur, colour or gradient overlay, inner glow, bevel, 3D and
extrusion. You stack them on an object and adjust them with sliders: "give
this button a soft shadow" or "make this title look embossed". If you've
used layer styles in a design app, this is the same idea.

**Filters** — *a look for the whole object, like a photo filter.* Frosted
glass, film grain, duotone, neon glow, chromatic aberration, glitch,
halftone dots and pixelate. Where an effect *adds* something (a shadow
behind, a line around), a filter *transforms the pixels* of the object as it
is drawn. Great for posters, retro and "screen" styles.

**Shaders** — *write your own filter.* A shader is a tiny program that runs
on the graphics card and decides the colour of every pixel of the object.
The Shader tab has a code editor that checks your code as you type, marks
the line with the error and can update the object live. You don't need to
start from zero: there are templates (invert, greyscale, wave, pixelate,
hologram, rim light, animated rainbow, blur) to open and tweak, and your own
shaders are saved in a library. Shaders are saved in the `.vtc` file with
the drawing.

**Scripts and add-ons** — *automate Vectopen itself.* While shaders change
how one object *looks*, scripts change *the document*: create, move,
recolour, rename and group objects. The Script tab is a small console with
the Vectopen API — "make a grid of 100 circles", "spread the selection in a
circle", "rename everything selected" are a few lines each, and there are
templates for all of those. Every run is a single undo step, so a script
that goes wrong is one Ctrl+Z away.

An **add-on** is a script packaged to be reused and shared: it adds its own
buttons and settings to Vectopen. The add-on manager installs them from a
`.zip`, a folder or a single file, and lets you enable, disable and reload
them. Three come built in as examples: *Colours* (random colours, gradients
across a selection, invert, greyscale), *Repeat* (copy the selection in a
grid or around a circle) and *Hello Vectopen*, the smallest possible add-on
to learn from.

In short: **effects** and **filters** you use with sliders; **shaders** and
**scripts** you write (or borrow from a template); **add-ons** are scripts
someone else already wrote for you.

## A layer panel you can read

- **Sub-layers.** Children of a shape or a group deep in the tree sometimes
  didn't appear at all — the panel only watched direct children of the
  artboard. It now follows additions at any depth.
- **An icon per type** — rectangle, ellipse, star, polygon, path, text,
  image, group — so you can tell what a row is without reading its name.
- **Thumbnails**, like in a photo editor, rendered off-screen with
  supersampling so small previews stay sharp.
- **Compact view**: thumbnail plus the three buttons, no text.
- The panel can be **resized** by dragging its edge, and remembers the width
  for each interface.
- Rename got its translucent blue field back (it had turned black on white).

## Smaller things that matter

- Middle-button drag scrolls the inspector, like it already did in Layers.
- Keyboard shortcuts (Escape, Delete…) no longer stop working when the mouse
  happens to be over a panel.
- Duplicate keeps the copy inside its group, right above the original.
- Group / ungroup from the right-click menu called methods that didn't exist.
  They exist now.

## 750+ tests, and tests that click

The rule from the first post still holds: every bug found becomes a permanent
test. There are now **754 unit tests**, plus a set of interface tests that
open the real app, click real buttons in all three interfaces and check what
happens on screen.

Two lessons from this round:

- **Tests must never touch your settings.** At one point a test changed the
  layer panel width in the user's own config. Now every test run takes a copy
  of the settings before it starts and puts it back afterwards — even if the
  test crashes.
- **A test that crashes must not report "OK".** Each interface test declares
  how many checks it expects; a script that dies halfway fails loudly instead
  of passing quietly.

## Packaging, honestly

Godot exports the app; the native parts (text shaping and the image
vectorizer, written in Rust) had to be cross-compiled for each system.

- **Windows** — tested under Wine. Not signed yet, so Windows SmartScreen
  will warn you: *More info &rarr; Run anyway*.
- **macOS** — one universal build for Intel and Apple Silicon, ad-hoc signed.
  **It has not been tested on a real Mac yet.** The first time, right-click
  the app &rarr; *Open*.
- **Linux** — .deb, .rpm and a portable .tar.gz.
- **Vectorize is Linux-only in this alpha.** It depends on ONNX Runtime,
  which has no ready-made builds for the Windows and macOS targets used
  here. The rest of the app works the same everywhere.

Two bugs were found *after* the build, while taking the screenshots for this
post: switching between light and dark theme could repaint the selected
object with the colour picker's default blue (losing its gradient), and the
internal pieces of a text shadow showed up as layers. Both are fixed, with a
test, and will be in the next alpha.

## The website

The site now has direct download buttons (it highlights the one for your
system), a screenshots section, and speaks ten languages — English, Spanish,
French, German, Portuguese, Russian, Chinese, Japanese, Arabic (right to
left) and Hindi — picked automatically from your browser, like the app.

## Help keep it going

Vectopen is built by one person, with no company behind it, no account, no
telemetry and no paid tier. It will stay that way. But the work has real
costs, and right now some of them block things you'd notice directly:

- **Time.** Most of this release happened in focused stretches. A small
  monthly contribution buys more of them.
- **A Mac to test on.** The macOS build has never run on real Apple
  hardware. That's the biggest gap in this release.
- **Signing.** An Apple Developer membership and a Windows code-signing
  certificate would remove the "unknown developer" warnings on both systems.

If Vectopen is useful to you, or you'd like it to exist, you can support it on
**[GitHub Sponsors](https://github.com/sponsors/malabo1990)** — monthly or
one-time, any amount.

Can't donate? That's fine, and it helps just as much to try the alpha and
report what breaks — on [Telegram](https://t.me/vectopen) or
[GitHub](https://github.com/malabo1990/-Vectopen/issues), star the
repository, or help translate the app.

## What's next

- The fixes above, in the next alpha.
- Vectorize on Windows and macOS.
- Signed installers and an AppImage.
- Polishing the bounding box: every handle × every shape type × every zoom.
- A web version that runs in the browser.

Thanks for reading — and if you try the alpha, tell me what you made with it.
