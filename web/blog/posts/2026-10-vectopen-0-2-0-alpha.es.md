---
title: "Vectopen 0.2.0-alpha: tres interfaces y las primeras descargas"
date: 2026-10-28
summary: "La primera versión que puedes descargar para Windows, macOS y Linux. Interfaces Smart, Modern y Pro, degradados en los trazos, un panel de capas mucho mejor, más de 750 pruebas — y cómo puedes ayudar a que siga adelante."
tags: [release, ui, layers, gradients, packaging]
draft: false
---

El [primer artículo](./post.html?p=2026-09-artboards-layers-and-a-magnet)
trataba de los cimientos: mesas de trabajo, capas, el imán, deshacer. Desde
entonces el foco pasó de *el motor funciona* a *una persona puede usarlo de
verdad*. El resultado es **0.2.0-alpha**: la primera versión que puedes
descargar y abrir sin instalar Godot.

**[Descargar 0.2.0-alpha &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.0-alpha)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz)

![Vectopen 0.2.0-alpha — la interfaz Modern](../media/shots/modern_light.webp)

## Tres interfaces, un editor

Vectopen tiene ahora tres formas de trabajar, y puedes cambiar entre ellas
cuando quieras desde la barra superior:

- **Smart** — un lienzo despejado con paneles flotantes. El diseño original.
- **Modern** — capas a la izquierda, un único inspector a la derecha y las
  herramientas en una barra abajo.
- **Pro** — un diseño de estudio denso: color, transformación, texto y
  efectos siempre acoplados en el panel derecho.

Lo difícil no era dibujar tres diseños, sino que estuvieran *completos*. La
primera versión de Modern y Pro tenía la mitad de lo que hacía Smart: sin
filtros, sin tipografía completa, sin efectos, sin vectorizar. Al seleccionar
un círculo el inspector salía vacío. Era una queja justa, y se arregló de la
forma honrada: en vez de reconstruir cada panel tres veces, los paneles reales
de Smart (texto completo, efectos, filtros, vectorizar) ahora están
**integrados** en el inspector de Modern y en el panel derecho de Pro. Una sola
implementación, tres sitios.

Además, cada interfaz es dueña de sus paneles. Al pasar de Smart a Pro se
cierra el selector de color flotante de Smart, en vez de quedarse tapado
debajo de las reglas.

![La interfaz Pro, tema oscuro](../media/shots/pro_dark.webp)

## Degradados en los trazos

Los rellenos podían llevar degradado; los trazos no. Ahora los dos: sólido,
lineal o radial, con paradas que editas en el lienzo. El degradado del trazo
se dibuja con colores por vértice a lo largo del trazado, se guarda en el
archivo `.vtc` y se exporta a SVG como un `<linearGradient>` real, así que se
ve igual en un navegador.

## Formas

La barra inferior de Modern pasó de tres botones fijos de formas a un único
botón que abre el panel de formas, igual que en Smart. El panel ganó una
pestaña **Formas**: corazón, gota, flechas, cruz, luna, rayo, bocadillo y nube.

Un fallo encontrado por el camino: las estrellas y otras formas **no se podían
redimensionar arrastrando**. La captura de la transformación solo guardaba el
tamaño de algunos tipos de forma, así que el redimensionado no hacía nada, en
silencio. Arreglado, y ahora una prueba arrastra cada tipo de forma y falla si
alguno no responde.

## Un panel de capas que se entiende

- **Subcapas.** Los hijos de una forma o de un grupo profundo a veces no
  aparecían: el panel solo vigilaba los hijos directos de la mesa de trabajo.
  Ahora sigue los cambios a cualquier profundidad.
- **Un icono por tipo** — rectángulo, elipse, estrella, polígono, trazado,
  texto, imagen, grupo — para saber qué es cada fila sin leer su nombre.
- **Miniaturas**, como en un editor de fotos, renderizadas fuera de pantalla
  con supermuestreo para que se vean nítidas aunque sean pequeñas.
- **Vista compacta**: miniatura y los tres botones, sin texto.
- El panel se puede **redimensionar** arrastrando su borde, y recuerda el
  ancho de cada interfaz.
- Al renombrar vuelve el campo azul translúcido (se había vuelto negro con
  letras blancas).

## Detalles pequeños que importan

- Arrastrar con el botón central desplaza el inspector, como ya pasaba en Capas.
- Los atajos de teclado (Escape, Suprimir…) ya no dejan de funcionar cuando el
  ratón está encima de un panel.
- Duplicar deja la copia dentro de su grupo, justo encima del original.
- Agrupar / desagrupar desde el menú del botón derecho llamaba a funciones que
  no existían. Ahora existen.

## Más de 750 pruebas, y pruebas que hacen clic

La regla del primer artículo sigue en pie: cada fallo encontrado se convierte
en una prueba permanente. Ahora hay **754 pruebas unitarias**, más un conjunto
de pruebas de interfaz que abren la app de verdad, pulsan botones reales en las
tres interfaces y comprueban lo que pasa en pantalla.

Dos lecciones de esta ronda:

- **Las pruebas nunca deben tocar tus ajustes.** En un momento dado, una prueba
  cambió el ancho del panel de capas en la configuración del propio usuario.
  Ahora cada ronda de pruebas copia los ajustes antes de empezar y los repone al
  terminar, aunque la prueba se cuelgue.
- **Una prueba que se cae no puede decir «OK».** Cada prueba de interfaz
  declara cuántas comprobaciones espera; si el script muere a medias, falla
  claramente en vez de aprobar en silencio.

## Empaquetado, sin adornos

Godot exporta la app; las partes nativas (la maquetación de texto y el
vectorizador de imágenes, escritas en Rust) hubo que compilarlas para cada
sistema.

- **Windows** — probado con Wine. Aún sin firmar, así que SmartScreen avisará:
  *Más información &rarr; Ejecutar de todas formas*.
- **macOS** — una sola versión universal para Intel y Apple Silicon, con firma
  ad-hoc. **Todavía no se ha probado en un Mac real.** La primera vez, clic
  derecho sobre la app &rarr; *Abrir*.
- **Linux** — .deb, .rpm y un .tar.gz portátil.
- **Vectorizar solo funciona en Linux en esta alfa.** Depende de ONNX Runtime,
  que no tiene versiones listas para los sistemas Windows y macOS usados aquí.
  El resto de la app funciona igual en todas partes.

Dos fallos aparecieron *después* de generar la versión, mientras hacía las
capturas para este artículo: cambiar entre tema claro y oscuro podía pintar el
objeto seleccionado con el azul por defecto del selector de color (perdiendo su
degradado), y las piezas internas de la sombra de un texto salían como capas.
Los dos están arreglados, con su prueba, y llegarán en la próxima alfa.

## La web

La web tiene ahora botones de descarga directa (resalta el de tu sistema), una
sección de capturas y habla diez idiomas — español, inglés, francés, alemán,
portugués, ruso, chino, japonés, árabe (de derecha a izquierda) e hindi —
elegido automáticamente según tu navegador, igual que la app.

## Ayuda a que siga adelante

Vectopen lo hace una sola persona, sin empresa detrás, sin cuenta, sin
telemetría y sin versión de pago. Y seguirá así. Pero el trabajo tiene costes
reales, y ahora mismo algunos frenan cosas que notarías directamente:

- **Tiempo.** Casi toda esta versión salió de ratos de trabajo concentrado. Una
  pequeña aportación mensual compra más ratos así.
- **Un Mac para probar.** La versión de macOS nunca se ha ejecutado en un Mac
  real. Es el mayor hueco de esta versión.
- **Firmas.** Una membresía de desarrollador de Apple y un certificado de firma
  de código para Windows quitarían los avisos de «desarrollador desconocido» en
  los dos sistemas.

Si Vectopen te resulta útil, o te gustaría que exista:

- [**GitHub Sponsors**](https://github.com/sponsors/malabo1990) — mensual o puntual
- [**Ko-fi**](https://ko-fi.com/vectopen) — una propina puntual, sin cuenta
- [**Liberapay**](https://liberapay.com/vectopen) — recurrente, sin ánimo de lucro, sin comisiones

¿No puedes donar? No pasa nada: ayuda igual probar la alfa y
[contar lo que falla](https://github.com/malabo1990/-Vectopen/issues), poner
una estrella al repositorio o ayudar a traducir la app.

## Lo siguiente

- Los arreglos de arriba, en la próxima alfa.
- Vectorizar en Windows y macOS.
- Instaladores firmados y una AppImage.
- Pulir la caja de selección: cada tirador × cada tipo de forma × cada zoom.
- Una versión web que funcione en el navegador.

Gracias por leer — y si pruebas la alfa, cuéntame qué has hecho con ella.
