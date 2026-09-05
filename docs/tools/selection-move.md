# Selection & Move

## Selection tool

The default tool for working with existing shapes.

- **Click** a shape to select it. Click empty space to clear the selection.
- **Click and drag** a selected shape to move it.
- **Drag a corner or edge handle** to resize it.
- **Shift-click** to add/remove a shape from the current selection (multi-select).
- Selecting a shape here is the same selection shown in the **Layers panel** and edited in the **Inspector** — all three stay in sync.

With a selection active, the standard editing shortcuts apply:

| Action | Shortcut |
|---|---|
| Delete | Delete / Backspace |
| Copy | Ctrl+C |
| Cut | Ctrl+X |
| Paste | Ctrl+V |
| Duplicate | Ctrl+D |
| Select All | Ctrl+A |

See **[Keyboard Shortcuts](../keyboard-shortcuts.md)** for the complete list.

## Move and Hand tools

At the moment, the **Move** and **Hand** toolbar buttons run the same underlying implementation as **Selection** — everything above applies to them too. Distinct artboard-pan (Move) and pure canvas-navigation (Hand) behavior is planned but not implemented yet. For panning the canvas itself right now, see **[Hand & Navigation](hand-navigation.md)** — it doesn't depend on which tool is active.
