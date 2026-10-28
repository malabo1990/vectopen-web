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

Selecciona un trazado y elige la herramienta **Edición de nodos** para editar sus puntos.

| Acción | Cómo |
|---|---|
| Seleccionar un punto | Clic · **Mayús+clic** añade o quita de la selección |
| Seleccionar todos los puntos | **A** |
| Mover puntos | Arrástralos |
| Añadir un punto | **Doble clic** sobre el trazado |
| Borrar puntos | **X**, **Supr** o **Retroceso** |
| Sacar tiradores de un punto (hacerlo suave) | **Alt + arrastrar** desde el punto |
| Mover un tirador | Arrastra el tirador |
| Modo **Agarrar** | **G**, luego mueve el ratón; **X** / **Y** bloquean un eje; clic o **Intro** confirma, **Escape** cancela |
| Volver a Selección | **Escape** |
