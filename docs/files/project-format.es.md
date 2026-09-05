# Formato de proyecto (.vtc)

Vectopen guarda los proyectos como archivos **`.vtc`** — un contenedor de un solo archivo con el manifiesto del proyecto más el contenido de cada artboard, comprimido. Esto es lo que escriben **Guardar** / **Guardar como**, y lo que **Abrir** vuelve a leer.

Algunas cosas a tener en cuenta:

- **Un archivo, un proyecto.** Un `.vtc` agrupa todos los artboards, capas y figuras del proyecto — es el archivo que respaldarías o le pasarías a otra persona.
- **El historial de deshacer no forma parte del archivo.** Solo se guarda el estado actual del proyecto; la pila de deshacer/rehacer se reinicia al reabrir un proyecto.
- También existe una opción de exportar a **`.json`** en el diálogo de guardado, útil como respaldo en texto plano o para inspeccionar los datos de un proyecto fuera de Vectopen — no está pensada como formato principal de guardado.

## Dónde se guardan los archivos

Vectopen no impone una carpeta específica — **Guardar como** abre un selector de archivos normal, y **Guardar** escribe de vuelta donde se guardó el proyecto por última vez (o pregunta la ubicación la primera vez).
