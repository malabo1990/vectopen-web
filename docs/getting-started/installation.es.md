# Instalación

Vectopen es un proyecto de Godot, todavía no un instalador de un clic para usuarios finales. Hay dos formas de ejecutarlo.

## Opción A — Binario precompilado

Revisa la [página de Releases en GitHub](https://github.com/malabo1990/-Vectopen/releases) del proyecto por si hay una build empaquetada (Windows, Linux, macOS o Web, según lo que se haya exportado para la versión actual). Si hay una build disponible para tu plataforma, descárgala y ejecútala directamente — no necesitas instalar Godot.

## Opción B — Ejecutar desde el código fuente

Es el camino más fiable mientras el proyecto está en desarrollo activo.

1. Instala **[Godot 4.7](https://godotengine.org/download)** (la build estándar/GL Compatibility — Vectopen no requiere soporte .NET/C#).
2. Clona el repositorio:
   ```bash
   git clone https://github.com/malabo1990/-Vectopen.git
   ```
3. Abre Godot, elige **Importar** y selecciona el `project.godot` de la carpeta clonada.
4. Pulsa **Ejecutar** (F5) en el editor. La escena principal carga el lienzo y la interfaz directamente.

## Requisitos del sistema

Vectopen usa el renderizador **GL Compatibility** (`rendering_method=mobile` en la configuración del proyecto), lo que mantiene bajos los requisitos de hardware — corre bien en GPUs integradas. No hay un instalador separado de dependencias: todo lo necesario viene dentro del proyecto de Godot.
