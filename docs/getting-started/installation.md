# Installation

Vectopen is a Godot project, not (yet) a one-click installer for end users. There are two ways to run it.

## Option A — Prebuilt binary

Check the project's [GitHub Releases page](https://github.com/malabo1990/-Vectopen/releases) for a packaged build (Windows, Linux, macOS or Web, depending on what has been exported for the current version). If a build is available for your platform, download and run it directly — no Godot installation needed.

## Option B — Run from source

This is the most reliable path while the project is under active development.

1. Install **[Godot 4.7](https://godotengine.org/download)** (the standard/GL Compatibility build — Vectopen does not require .NET/C# support).
2. Clone the repository:
   ```bash
   git clone https://github.com/malabo1990/-Vectopen.git
   ```
3. Open Godot, choose **Import**, and select the cloned folder's `project.godot`.
4. Press **Run** (F5) in the editor. The main scene loads the canvas and UI directly.

## System requirements

Vectopen targets the **GL Compatibility** renderer (`rendering_method=mobile` in the project settings), which keeps hardware requirements low — it runs comfortably on integrated GPUs. There is no separate installer for dependencies: everything needed ships inside the Godot project.
