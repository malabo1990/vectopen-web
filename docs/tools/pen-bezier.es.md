# Pluma, Bézier y edición de nodos

## Pluma

Una herramienta rápida de líneas: cada clic añade un punto recto.

- **Clic izquierdo** — empieza una línea o añade el siguiente punto.
- **Clic derecho** — termina la línea. Cambiar de herramienta también la termina.

## Bézier (D)

La pluma clásica de puntos de anclaje:

1. **Haz clic** para poner un punto de esquina.
2. **Haz clic y arrastra** para poner un punto suave con tiradores; los tiradores quedan simétricos.
3. Mantén **Alt** al arrastrar para mover cada tirador por separado.
4. Acércate al **primer punto** — se resalta; haz clic para cerrar la forma.
5. **Intro** o **Escape** terminan un trazado abierto.

El resultado es un trazado editable: relleno, trazo (con [degradados](../objects/color-gradients.md)), grosor y abierto/cerrado están en el inspector.

## Editar nodos

Un trazado está hecho de **puntos** (anclajes) unidos por segmentos. Cada punto puede tener hasta dos **tiradores** que curvan los segmentos a cada lado.

### Tipos de punto

| | | |
|---|---|---|
| ![Punto de esquina](../assets/nodes/corner.svg) | **Punto de esquina** — sin tiradores. Los segmentos se juntan en ángulo. | Bézier: un **clic** simple. |
| ![Punto suave](../assets/nodes/smooth.svg) | **Punto suave** — dos tiradores en línea recta. La curva pasa por el punto sin pico. | Bézier: **clic y arrastrar**. Edición de nodos: **Alt + arrastrar** desde un punto de esquina saca tiradores. |
| ![Tiradores independientes](../assets/nodes/independent.svg) | **Tiradores independientes** — cada lado tiene su propio ángulo y longitud, para un giro marcado pero curvo. | Bézier: mantén **Alt** al arrastrar un tirador. |
| ![Cerrar un trazado](../assets/nodes/close.svg) | **Cerrar un trazado** — el último segmento vuelve al primer punto. Un trazado cerrado se puede rellenar. | Bézier: acércate al primer punto hasta que se resalte y haz clic. |

### Usar la herramienta Edición de nodos

Selecciona un trazado y elige la herramienta **Edición de nodos**. Aparecen sus puntos y tiradores.

| Acción | Cómo |
|---|---|
| Seleccionar un punto | Clic · **Mayús+clic** añade o quita de la selección |
| Seleccionar todos los puntos | **A** |
| Mover puntos | Arrástralos (los puntos seleccionados se mueven juntos) |
| Añadir un punto | **Doble clic** sobre el trazado — el punto nuevo lleva tiradores cortos a lo largo del segmento |
| Borrar puntos | **X**, **Supr** o **Retroceso** |
| Convertir un punto de esquina en suave | **Alt + arrastrar** desde el punto |
| Cambiar la forma de una curva | Arrastra un tirador |
| Modo **Agarrar** | **G**, luego mueve el ratón; **X** / **Y** bloquean un eje; clic o **Intro** confirma, **Escape** cancela |
| Volver a Selección | **Escape** |

Cada edición es un paso de deshacer.

### Qué se puede editar punto a punto

- Los **trazados** dibujados con Pluma o Bézier.
- Los dibujos **SVG importados** — los trazados conservan sus curvas Bézier reales. (Las formas importadas con relleno degradado se convierten en polígonos cuyas curvas se aproximan con puntos; ver [Importar SVG](../files/export-import.md#importar-svg-de-otros-programas).)
- El resultado de **Convertir a curvas** — en la sección Booleanas del inspector (Modern), la barra superior (Pro) y el menú del botón derecho. Convierte un objeto **booleano**, o **dos o más formas seleccionadas** (unidas), en un único trazado editable.

Las **formas primitivas** — rectángulo, elipse, polígono, estrella, gota y las formas personalizadas — se editan con sus parámetros (radio de esquinas, número de puntas…), no punto a punto. Todavía no se puede convertir una sola forma primitiva en trazado.
