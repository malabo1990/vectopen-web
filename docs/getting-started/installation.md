# Installation

Download the package for your system from the **[download page](https://malabo1990.github.io/vectopen-web/#download)** or directly from **[GitHub Releases](https://github.com/malabo1990/-Vectopen/releases)**. You don't need to install Godot.

## Status by system

| System | Status in 0.2.0-alpha |
|---|---|
| **Linux** | Tested — this is where Vectopen is developed |
| **Windows** | Tested with Wine on Linux, not yet on a real Windows PC |
| **macOS** | **Not tested on a real Mac yet.** It's built and packaged, but nobody has confirmed it starts |

!!! warning "Alpha builds are not signed yet"
    Windows and macOS will warn that the app comes from an *unknown developer*. That is expected for now — see the steps for your system below. Signed installers are planned.

## Windows (10 / 11, 64-bit)

1. Download `Vectopen-…-windows-x64.zip`.
2. Right-click the file → **Extract All…**, and choose a folder (for example `Documents\Vectopen`).
3. Open the folder and double-click **Vectopen.exe**.
4. If Windows shows **"Windows protected your PC"**, click **More info** → **Run anyway**. This only happens the first time.

To uninstall, delete the folder.

## macOS (Intel and Apple Silicon)

!!! danger "Untested on real Apple hardware"
    The macOS build has **not been run on a real Mac yet**. It may not start, or parts of it may not work. If you try it, please tell us what happens — it works or not, and your macOS version and chip (Intel / Apple Silicon) — on [Telegram](https://t.me/vectopen) or [GitHub](https://github.com/malabo1990/-Vectopen/issues).

1. Download `Vectopen-…-macos-universal.dmg` (or the `.zip`, if you prefer).
2. Open the `.dmg` and drag **Vectopen** into **Applications**.
3. The first time, **right-click** Vectopen in Applications → **Open** → **Open**. After that it opens normally.

To uninstall, move Vectopen from Applications to the Trash.

## Linux (x86_64)

=== "Debian / Ubuntu / Mint"

    ```bash
    sudo apt install ./vectopen_*_amd64.deb
    ```
    Vectopen appears in your applications menu, or run `vectopen` in a terminal.
    Uninstall with `sudo apt remove vectopen`.

=== "Fedora / openSUSE"

    ```bash
    sudo dnf install ./vectopen-*.x86_64.rpm
    ```
    Uninstall with `sudo dnf remove vectopen`.

=== "Any distribution (portable)"

    ```bash
    tar xzf Vectopen-*-linux-x86_64.tar.gz
    ./Vectopen-*/vectopen.x86_64
    ```
    Nothing is installed; delete the folder to remove it.

## What works where

| Feature | Windows | macOS | Linux |
|---|:-:|:-:|:-:|
| Drawing, text, layers, effects, filters, shaders, scripts | ✓ | ✓ | ✓ |
| Export (SVG, PDF, PNG, …) | ✓ | ✓ | ✓ |
| **Vectorize** and the **AI tools** (background removal, ×4 upscale) | — | — | ✓ |

Vectorize depends on a component (ONNX Runtime) that isn't available for the Windows and macOS builds yet. It's planned.

## System requirements

- **Windows** 10 or 11 (64-bit) · **macOS** 10.15 or later (Intel) or 11 or later (Apple Silicon) · **Linux** x86_64 with glibc 2.28 or later.
- Any graphics card with **Vulkan** or **OpenGL 3.3** support; integrated GPUs are fine.
- About **200 MB** of disk space.

## Settings and your files

Your preferences (theme, interface, layer panel options, shortcuts) are stored in your user folder and kept between updates. Your drawings are saved wherever you choose, as `.vtc` files — see [Project Format](../files/project-format.md).

## Run from source (developers)

1. Install **[Godot 4.7](https://godotengine.org/download)** (standard build, no .NET needed).
2. `git clone https://github.com/malabo1990/-Vectopen.git`
3. In Godot, **Import** the folder's `project.godot` and press **Run** (F5).
