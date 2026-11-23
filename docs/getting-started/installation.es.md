# Instalación

Descarga el paquete para tu sistema desde la **[página de descargas](https://malabo1990.github.io/vectopen-web/#download)** o directamente desde **[GitHub Releases](https://github.com/malabo1990/-Vectopen/releases)**. No necesitas instalar Godot.

## Estado por sistema

| Sistema | Estado en la 0.2.4-beta |
|---|---|
| **Linux** | Probado — es donde se desarrolla Vectopen |
| **Windows** | Compilado y empaquetado (instalador y `.zip` portátil); probado con Wine, se agradecen pruebas en PC reales |
| **macOS** | Versión universal (Intel y Apple Silicon); **aún sin confirmar en un Mac real** |
| **Android** | Vista previa experimental (`.apk`) |

!!! warning "Las versiones aún no están firmadas"
    Windows y macOS avisarán de que la app es de un *desarrollador desconocido*. Es normal por ahora: sigue los pasos de tu sistema. Los instaladores firmados están previstos.

## Windows (10 / 11, 64 bits)

=== "Instalador (recomendado)"

    1. Descarga `Vectopen-…-windows-x64-setup.exe`.
    2. Haz doble clic. Si Windows muestra **«Windows protegió su PC»**, pulsa **Más información** → **Ejecutar de todas formas**.
    3. Se instala **solo para tu usuario**, sin permisos de administrador, en `%LOCALAPPDATA%\Programs\Vectopen`, con acceso en el menú Inicio (y, si quieres, en el escritorio).

    Las versiones nuevas se instalan **desde la propia app** (ver [Actualizaciones](#actualizaciones)). Para desinstalar: **Configuración → Aplicaciones**, o *Desinstalar Vectopen* en el menú Inicio.

=== "Portátil (.zip)"

    1. Descarga `Vectopen-…-windows-x64.zip`.
    2. Clic derecho sobre el archivo → **Extraer todo…**, y elige una carpeta (por ejemplo `Documentos\Vectopen`).
    3. Abre la carpeta y haz doble clic en **Vectopen.exe**.

    Para desinstalar, borra la carpeta.

## macOS (10.13+, Intel y Apple Silicon)

!!! danger "Sin confirmar en un Mac real"
    La versión de macOS **todavía no se ha confirmado en un Mac real**. Si la pruebas, cuéntanos qué pasa — tu versión de macOS y el procesador (Intel / Apple Silicon) — en [Telegram](https://t.me/vectopen), [Reddit](https://www.reddit.com/r/Vectopen_editor/) o [GitHub](https://github.com/malabo1990/-Vectopen/issues).

1. Descarga `Vectopen-…-macos-universal.dmg` (o el `.zip`, si lo prefieres).
2. Abre el `.dmg` y arrastra **Vectopen** a **Aplicaciones**.
3. La primera vez, haz **clic derecho** sobre Vectopen en Aplicaciones → **Abrir** → **Abrir**. Después se abre normalmente.

Para desinstalar, mueve Vectopen de Aplicaciones a la Papelera.

## Android (vista previa)

1. Descarga `Vectopen-…-android.apk` en el móvil o la tableta.
2. Ábrelo y permite instalar apps de ese origen cuando Android lo pida.

La versión de Android es una **vista previa experimental**: lleva las librerías nativas de texto e importadores, pero no el vectorizador con IA, y la interfaz todavía es la de escritorio.

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

| Función | Windows | macOS | Linux | Android |
|---|:-:|:-:|:-:|:-:|
| Dibujo, texto, capas, iluminación, fusión, efectos, filtros, shaders, scripts | ✓ | ✓ | ✓ | ✓ |
| Exportar (SVG, PDF, PNG, …) | ✓ | ✓ | ✓ | ✓ |
| **Vectorizar** y las **herramientas de IA** (quitar fondo, mejorar ×4) | ✓ | ✓ Apple Silicon | ✓ | — |

Vectorizar depende de ONNX Runtime. No está disponible en los **Mac con procesador Intel** (ONNX Runtime no publica binarios para ellos) y la app lo explica. En Windows necesita el **Visual C++ Redistributable** de Microsoft, que casi todos los PC ya tienen.

## Actualizaciones

Vectopen consulta GitHub unos segundos después de abrirse (como mucho una vez al día). Si hay versión nueva, muestra un aviso con las novedades y un botón para **descargarla e instalarla**: el instalador en Windows, el `.dmg` en macOS, el `.rpm` / `.deb` en Linux y el `.apk` en Android. También puedes pulsar **Buscar actualizaciones**, o desactivar **Comprobar al iniciar**, en la ventana **Acerca de**.

## Requisitos

- **Windows** 10 u 11 (64 bits) · **macOS** 10.13 o posterior (Intel) u 11 o posterior (Apple Silicon) · **Android** 7 o posterior (64 bits) · **Linux** x86_64 con glibc 2.28 o posterior.
- Cualquier tarjeta gráfica compatible con **Vulkan** u **OpenGL 3.3**; las integradas sirven.
- Unos **200 MB** de espacio en disco.

## Ajustes y archivos

Tus preferencias (tema, interfaz, opciones del panel de capas, atajos) se guardan en tu carpeta de usuario y se mantienen entre actualizaciones. Tus dibujos se guardan donde tú elijas, como archivos `.vtp` — ver [Formato de proyecto](../files/project-format.md).

## Ejecutar desde el código (desarrolladores)

1. Instala **[Godot 4.7](https://godotengine.org/download)** (versión estándar, sin .NET).
2. `git clone https://github.com/malabo1990/-Vectopen.git`
3. En Godot, **Importa** el `project.godot` de la carpeta y pulsa **Ejecutar** (F5).
