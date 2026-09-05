# La interfaz

La ventana de Vectopen se organiza alrededor de un lienzo central, con paneles de herramientas e inspección acoplados alrededor.

## Lienzo

El área central grande donde viven los artboards. Las reglas corren por los bordes superior e izquierdo, mostrando coordenadas del mundo; puedes ocultarlas desde **Preferencias → Rulers**.

- **Navegar (pan)**: usa la herramienta Mano, o mantén **Espacio** mientras arrastras.
- **Zoom**: **Ctrl+=** / **Ctrl+-** para acercar/alejar por pasos, **5** para restablecer el zoom, rueda del ratón para hacer zoom bajo el cursor.
- Un proyecto puede tener varios **artboards**; el activo es el que recibe las figuras nuevas.

## Barra de herramientas

En el lateral izquierdo: las herramientas de dibujo (Selección, Mover, Pluma, Bézier, Rectángulo, Elipse, Texto, Mano, Pincel). Ver **[Herramientas](../tools/index.md)** para lo que hace cada una. La herramienta activa queda resaltada.

## Panel de capas

A la derecha: un árbol buscable de cada figura del artboard activo, reflejando el orden de apilado real en el lienzo. Desde aquí puedes:

- Buscar/filtrar capas (incluyendo filtros especiales como `is:hidden`, `is:group`).
- Añadir, borrar, duplicar, fusionar o agrupar capas.
- Alternar la visibilidad o el bloqueo de una capa.
- Hacer clic en una capa para seleccionar la figura correspondiente en el lienzo (la selección se sincroniza en ambos sentidos).

## Inspector

Al seleccionar una o más figuras se exponen sus propiedades para edición directa: posición, tamaño, rotación, color de relleno/trazo, grosor de trazo, radio de esquina, opacidad y —para texto— fuente, tamaño, alineación y contenido. Editar un valor aquí es una única acción deshacible, y editar varias figuras seleccionadas a la vez aplica el cambio a todas.

## Preferencias

Se abre desde el pequeño icono de la esquina superior izquierda (donde se cruzan las dos reglas). Está organizado en pestañas:

- **Window** — modo de ventana, tamaño, escala de interfaz.
- **Rulers** — visibilidad y unidades de las reglas.
- **Theme** — modo claro/oscuro, colores de acento, color y tamaño por defecto de relleno/trazo/texto, idioma de la interfaz, y el **[interruptor del servidor MCP](../integrations/mcp-server.md)**.
- **Snap** — comportamiento del imán inteligente (guías de alineación por borde/centro al arrastrar).
- **Panels** — mostrar/ocultar paneles individuales de la interfaz.

## Historial de deshacer

Casi cualquier mutación —crear, mover, redimensionar, recolorear o borrar una figura— es un único paso en la pila de deshacer (**Ctrl+Z** / **Ctrl+Shift+Z**). Ver **[Atajos de teclado](../keyboard-shortcuts.md)** para la lista completa de atajos que funcionan hoy.
