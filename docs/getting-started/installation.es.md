# Instalación

Descarga el paquete para tu sistema desde la **[página de descargas](https://malabo1990.github.io/vectopen-web/#download)** o directamente desde **[GitHub Releases](https://github.com/malabo1990/-Vectopen/releases)**. No necesitas instalar Godot.

## Estado por sistema

| Sistema | Estado en la 0.2.0-alpha |
|---|---|
| **Linux** | Probado — es donde se desarrolla Vectopen |
| **Windows** | Probado con Wine en Linux, todavía no en un PC con Windows real |
| **macOS** | **Todavía sin probar en un Mac real.** Está compilado y empaquetado, pero nadie ha confirmado que arranque |

!!! warning "Las versiones alfa aún no están firmadas"
    Windows y macOS avisarán de que la app es de un *desarrollador desconocido*. Es normal por ahora: sigue los pasos de tu sistema. Los instaladores firmados están previstos.

## Windows (10 / 11, 64 bits)

1. Descarga `Vectopen-…-windows-x64.zip`.
2. Clic derecho sobre el archivo → **Extraer todo…**, y elige una carpeta (por ejemplo `Documentos\Vectopen`).
3. Abre la carpeta y haz doble clic en **Vectopen.exe**.
4. Si Windows muestra **«Windows protegió su PC»**, pulsa **Más información** → **Ejecutar de todas formas**. Solo pasa la primera vez.

Para desinstalar, borra la carpeta.

## macOS (Intel y Apple Silicon)

!!! danger "Sin probar en un Mac real"
    La versión de macOS **todavía no se ha ejecutado en un Mac real**. Puede que no arranque o que algunas partes no funcionen. Si la pruebas, cuéntanos qué pasa — si funciona o no, tu versión de macOS y el procesador (Intel / Apple Silicon) — en [Telegram](https://t.me/vectopen) o en [GitHub](https://github.com/malabo1990/-Vectopen/issues).

1. Descarga `Vectopen-…-macos-universal.dmg` (o el `.zip`, si lo prefieres).
2. Abre el `.dmg` y arrastra **Vectopen** a **Aplicaciones**.
3. La primera vez, haz **clic derecho** sobre Vectopen en Aplicaciones → **Abrir** → **Abrir**. Después se abre normalmente.

Para desinstalar, mueve Vectopen de Aplicaciones a la Papelera.

## Linux (x86_64)

=== "Debian / Ubuntu / Mint"

    ```bash
    sudo apt install ./vectopen_*_amd64.deb
    ```
    Vectopen aparece en el menú de aplicaciones, o ejecuta `vectopen` en una terminal.
    Para desinstalar: `sudo apt remove vectopen`.

=== "Fedora / openSUSE"

    ```bash
    sudo dnf install ./vectopen-*.x86_64.rpm
    ```
    Para desinstalar: `sudo dnf remove vectopen`.

=== "Cualquier distribución (portátil)"

    ```bash
    tar xzf Vectopen-*-linux-x86_64.tar.gz
    ./Vectopen-*/vectopen.x86_64
    ```
    No se instala nada; borra la carpeta para quitarlo.

## Qué funciona en cada sistema

| Función | Windows | macOS | Linux |
|---|:-:|:-:|:-:|
| Dibujo, texto, capas, efectos, filtros, shaders, scripts | ✓ | ✓ | ✓ |
| Exportar (SVG, PDF, PNG, …) | ✓ | ✓ | ✓ |
| **Vectorizar** y las **herramientas de IA** (quitar fondo, mejorar ×4) | — | — | ✓ |

Vectorizar depende de un componente (ONNX Runtime) que todavía no está disponible para las versiones de Windows y macOS. Está previsto.

## Requisitos

- **Windows** 10 u 11 (64 bits) · **macOS** 10.15 o posterior (Intel) u 11 o posterior (Apple Silicon) · **Linux** x86_64 con glibc 2.28 o posterior.
- Cualquier tarjeta gráfica compatible con **Vulkan** u **OpenGL 3.3**; las integradas sirven.
- Unos **200 MB** de espacio en disco.

## Ajustes y archivos

Tus preferencias (tema, interfaz, opciones del panel de capas, atajos) se guardan en tu carpeta de usuario y se mantienen entre actualizaciones. Tus dibujos se guardan donde tú elijas, como archivos `.vtc` — ver [Formato de proyecto](../files/project-format.md).

## Ejecutar desde el código (desarrolladores)

1. Instala **[Godot 4.7](https://godotengine.org/download)** (versión estándar, sin .NET).
2. `git clone https://github.com/malabo1990/-Vectopen.git`
3. En Godot, **Importa** el `project.godot` de la carpeta y pulsa **Ejecutar** (F5).
