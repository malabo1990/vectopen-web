# MCP Server (AI Integration)

Vectopen ships with a built-in **MCP (Model Context Protocol)** server, so an AI agent — Claude Code, or any other MCP-capable client — can inspect and drive a *running* instance of the app: read the canvas, create and edit shapes, undo/redo, and export, all through the same undo-tracked operations the UI itself uses.

!!! note "Not the same thing as `addons/godot_mcp`"
    If you've seen `addons/godot_mcp` in the repository, that's a separate, **editor-time** plugin used by AI coding assistants to help *develop* Vectopen (reading/writing scenes and scripts in the Godot editor). The server documented here runs inside the **exported/running app itself** and only exposes canvas operations — it has no access to scripts, scenes, or the filesystem beyond exporting artboards.

## Enabling it

1. Open **Preferences** (the small icon in the top-left corner, where the rulers meet) → **Theme** tab.
2. Scroll to **"Integraciones IA (MCP)"**.
3. Check **Servidor MCP**. The status line below shows the URL it's listening on once active.
4. Copy the **token** shown in the field next to it — your MCP client needs it.

The setting (and the token) persist across restarts. Click **Regenerar** any time to invalidate the current token and issue a new one — useful if you think it leaked.

## Connecting a client

The server speaks MCP over HTTP + JSON-RPC 2.0, on `127.0.0.1` only. Point your MCP client at:

```
http://127.0.0.1:<port>/mcp
```

(default port **6520**), sending the token as a bearer header:

```json
{
  "mcpServers": {
    "vectopen": {
      "type": "http",
      "url": "http://127.0.0.1:6520/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
    }
  }
}
```

## Security model

This server only ever binds to `127.0.0.1` — it is not reachable from other machines. That alone isn't enough, though: any browser tab open on the same computer can attempt to reach a local port, so the server also:

- **Requires the bearer token** on every request, compared in constant time.
- **Rejects any request carrying an `Origin` header** — a real MCP client never sends one; only a browser page does.
- **Validates the `Host` header** against `127.0.0.1`/`localhost` plus the actual port, blocking DNS-rebinding attempts.
- **Caps concurrent connections** (16) to avoid resource exhaustion.

It deliberately does **not** expose script creation/execution, project loading from arbitrary paths, or anything beyond the structured tool list below.

## Available tools

| Tool | Does |
|---|---|
| `get_project_info` | Artboard count, undo/redo availability, modified flag |
| `list_artboards` | List artboards with index, name, position, and which is active |
| `get_canvas_tree` | List the shapes on an artboard (name, type, position, size, path) |
| `get_selection` | The shapes currently selected |
| `set_selection` | Select shapes by the paths `get_canvas_tree`/`get_selection` returned |
| `clear_selection` | Clear the selection |
| `get_properties` | Inspector-style properties of the current selection (or `paths`) |
| `set_property` | Set one Inspector property on the current selection (or `paths`) — undoable |
| `create_shape` | Create a rectangle or ellipse on an artboard — undoable |
| `delete_selected` | Delete the current selection (or `paths`) — undoable |
| `undo` / `redo` | Step the undo history |
| `export_artboard` | Export an artboard to PNG or SVG, waiting for completion |

Every mutation goes through the same `HistoryManager`/`Inspector` machinery the UI uses, so anything an agent does shows up correctly in the **Layers panel** and can be undone with **Ctrl+Z** like any manual edit.
