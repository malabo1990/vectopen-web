# Scripts & Add-ons

Scripts let Vectopen do repetitive work for you: create, move, recolour, rename and group objects. Add-ons are scripts packaged to be reused and shared.

Both live in the **Script** tab of the **Effects window** in the **Smart** interface.

!!! note "Scripts in Modern and Pro"
    In 0.2.0-alpha the Script tab is only in Smart. Switch to Smart to run a script — what it creates or changes is there in every interface. Bringing it into the Modern and Pro right panel is planned.

## Scripts

The Script tab is a small code editor and console:

- Write **GDScript** using the `api` object — the Vectopen API.
- **Run** with **Ctrl+Enter** or **F5**. `print()` output and errors (with their line) appear in the console.
- Typing `api.` shows autocompletion; the help button lists every API function.
- **Every run is one undo step.** If a script fails halfway, its changes are undone automatically.
- Save scripts to your **library** and reuse them.

Templates to start from: *grid of circles*, *random colours*, *spiral of stars*, *spread in a circle*, *Bézier wave*, *polygons 3 → 12*, *rename selection*, *group by type*.

A minimal example — 10 circles in a row, each a different colour:

```gdscript
for i in 10:
    var c = api.add_ellipse(Vector2(60 + i * 70, 200), Vector2(50, 50))
    api.set_fill(c, Color.from_hsv(i / 10.0, 0.7, 0.95))
```

Useful API functions:

| Group | Functions |
|---|---|
| Create | `add_rect`, `add_ellipse`, `add_polygon`, `add_star`, `add_shape`, `add_path`, `add_curve`, `add_line`, `add_text`, `import_svg` |
| Find & select | `shapes`, `find`, `selection`, `select`, `clear_selection`, `artboard`, `artboards` |
| Change | `set_prop`, `set_props`, `set_fill`, `set_stroke`, `set_position`, `move`, `set_rotation` |
| Organise | `group`, `duplicate`, `delete`, `arrange`, `align` |
| Effects | `effect_types`, `add_effect`, `clear_effects`, `add_filter` |

## Add-ons

The **Add-ons** section of the Script tab is the add-on manager:

- **Install** from a `.zip`, a folder or a single `.gd` file.
- **Enable / disable**, **reload** (after editing its files) and **uninstall**.
- An active add-on shows its **operators** (buttons) and its **settings** right there.
- If an add-on fails to start, it stays disabled and shows the error.

Included as examples:

- **Colours** — random colours, a gradient from the first to the last selected object, invert, greyscale.
- **Repeat** — copy the selection in a grid or around a circle.
- **Hello Vectopen** — the smallest possible add-on: one button that writes to the console and creates a text. Start here to write your own.

### Writing an add-on

An add-on is a folder with two files: `addon.cfg` (name, version, author, description) and `main.gd` (a script that `extends VectopenAddon`). Look at the *Hello Vectopen* folder for a complete example.

## AI agents

To let an AI assistant drive Vectopen, see [MCP Server](../integrations/mcp-server.md).
