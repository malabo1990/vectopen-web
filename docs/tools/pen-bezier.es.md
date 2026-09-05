# Pluma y curvas Bézier

Vectopen tiene dos herramientas de dibujo de trazados, para dos flujos de trabajo distintos.

## Herramienta Pluma

Una herramienta rápida de línea/polilínea a mano alzada: cada clic añade un punto recto a la línea actual.

- **Clic izquierdo** en espacio vacío del artboard: empieza una línea nueva, o añade el siguiente punto a la que está en curso.
- **Clic derecho**: termina la línea actual.
- Cambiar de herramienta también termina cualquier línea en curso.

Buena para bocetos rápidos y formas de bordes rectos; para trazados curvos y editables con precisión, usa la herramienta **Bézier**.

## Herramienta Bézier

Una herramienta de pluma por puntos de anclaje de verdad, el mismo modelo de interacción que se encuentra en editores vectoriales profesionales:

1. **Clic** para colocar un punto de anclaje.
2. **Clic y arrastra** (en vez de un clic simple) para colocar un anclaje *con* un asa de curva — el segmento que llega a ese punto se vuelve curvo. Por defecto los dos brazos del asa se mantienen simétricos.
3. Mantén **Alt** mientras arrastras un asa para romper la simetría y dar forma a cada brazo de la curva de forma independiente.
4. Acerca el ratón al **primer punto de anclaje** — se resalta para mostrar que el trazado se cerrará en un lazo si haces clic ahí.
5. Pulsa **Enter** o **Escape** para terminar un trazado abierto sin cerrarlo.

El resultado es un `VectorPath` — un trazado Bézier real y editable, con color de relleno, color de trazo, grosor de trazo y estado abierto/cerrado, todo editable después desde el **Inspector**, igual que cualquier otra figura.
