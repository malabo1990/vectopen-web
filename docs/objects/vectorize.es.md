# Vectorizar y herramientas de imagen con IA

**Vectorizar** convierte una imagen de mapa de bits — un logo en PNG, un icono, un dibujo escaneado, una foto — en formas vectoriales editables. Dos **herramientas de IA** preparan antes la imagen para un resultado más limpio: **Quitar fondo** y **Mejorar ×4**.

!!! success "Privado y sin internet"
    Todo funciona **en tu ordenador**. Los modelos de IA vienen dentro de Vectopen: no se sube nada, no hace falta internet ni cuenta, y no hay límites de uso.

!!! warning "Solo en Linux en la 0.2.0-alpha"
    Vectorizar y las herramientas de IA están en la versión de **Linux**. Windows y macOS están previstos.

## Qué puede hacer — un ejemplo real

Un logo PNG de 96 píxeles, procesado con el propio motor de Vectopen:

| ![Original](../assets/vectorize/step0.webp) | ![Vectorizado directamente](../assets/vectorize/step1.webp) | ![Mejorado con IA y vectorizado](../assets/vectorize/step2.webp) |
|:-:|:-:|:-:|
| **Original** — pequeño y borroso | **Vectorizado directamente** — los círculos salen con ángulos | **Mejorado ×4 (IA) y vectorizado** — curvas y texto limpios |

El resultado de la derecha es un archivo vectorial de verdad: [descarga el SVG](../assets/vectorize/result.svg) y amplíalo todo lo que quieras.

## Las tres herramientas

| Herramienta | Qué hace | Motor |
|---|---|---|
| **Vectorizar** | Calca la imagen en formas: curvas Bézier suaves, polígonos de lados rectos o píxeles cuadrados | [VTracer](https://github.com/visioncortex/vtracer) (MIT) |
| **Quitar fondo** · IA | Encuentra el motivo y deja el fondo transparente | U²-Net (*u2netp*, Apache-2.0) |
| **Mejorar ×4** · IA | Amplía la imagen cuatro veces, recuperando bordes nítidos | Real-ESRGAN General x4v3 (BSD-3-Clause) |

## Cómo se usa

1. **Trae una imagen:** usa la herramienta Imagen, arrastra un archivo al lienzo, o **pega** con **Ctrl+V** una imagen copiada del navegador o una captura de pantalla.
2. **Selecciona la imagen.**
3. Abre **Vectorizar** — una sección del inspector en Modern, dentro de la pestaña Efectos en Pro, la ventana Efectos en Smart.
4. Elige un **preajuste** o ajusta las opciones (abajo).
5. Si quieres, marca **Quitar el fondo antes (IA)** y/o **Mejorar ×4 antes (IA)**.
6. Pulsa **Vectorizar**. Vectopen trabaja en segundo plano — la app sigue respondiendo — y coloca el resultado como un **grupo de formas** encima de la imagen, del mismo tamaño.

Cada paso es una acción de deshacer: **Ctrl+Z** quita el resultado.

Las dos herramientas de IA también funcionan **por separado**: los botones **Quitar fondo (IA)** y **Mejorar ×4 (IA)** cambian la imagen seleccionada sin vectorizarla. Tras *Mejorar ×4* la imagen ocupa lo mismo en el lienzo, pero con cuatro veces más detalle.

## Opciones

| Opción | Significado | Consejo |
|---|---|---|
| **Preajuste** | *Logo / icono*, *Ilustración*, *Foto (más detalle)* | Buen punto de partida; luego afina |
| **Trazados** | **Curvas Bézier**, **Polígonos** o **Píxeles** | Curvas para casi todo; Píxeles para pixel art |
| **Detalle** | Ignora manchas de menos de N píxeles | Súbelo para quitar ruido; bájalo para conservar detalles pequeños |
| **Colores** | Precisión de color (1–8) | Más = más capas de color y un archivo más pesado |
| **Esquinas** | Ángulo a partir del cual un punto es una esquina | Más bajo = más redondeado; más alto = más anguloso |
| **Blanco y negro** | Formas negras sobre fondo transparente | Logos, firmas, dibujos de línea, sellos |
| **Quitar el fondo antes (IA)** | Elimina el fondo antes de calcar | Fotos de objetos, productos, personas |
| **Mejorar ×4 antes (IA)** | Amplía antes de calcar | Imágenes pequeñas o borrosas (menos de ~300 px) |
| **Ocultar la imagen original** | Oculta (no borra) la imagen después | Vuelve a mostrarla desde Capas |

## Cómo conseguir la mejor calidad

- **Las mejores imágenes:** logos, iconos, dibujos de línea, escaneos, firmas e ilustraciones de **colores planos**.
- **¿Imagen pequeña o borrosa?** Activa **Mejorar ×4 (IA)** — como en el ejemplo de arriba, es la mayor mejora de calidad.
- **¿Logo sobre un fondo cargado?** Primero **Quitar fondo (IA)**, y luego **Blanco y negro** si el logo es de un solo color.
- **Las fotos y los degradados suaves** se simplifican en zonas de color plano (un aspecto «posterizado»). Así funciona el calcado; usa *Foto (más detalle)* y más **Colores** para acercarte más, o deja la foto como imagen.
- **¿Demasiadas formas diminutas?** Sube **Detalle**. **¿Se pierden partes pequeñas?** Bájalo.
- **El texto de la imagen** se calca como formas, no como texto editable.

## Límites

- Las imágenes muy grandes tardan más; mejorar ×4 una imagen grande crea una imagen enorme. Mejorar está pensado para imágenes **pequeñas**.
- La mejora trabaja en bloques de 128 píxeles; en imágenes grandes a veces se notan costuras suaves entre bloques.
- Quitar el fondo funciona mejor cuando el motivo es claro y está delante; el pelo fino o los objetos transparentes pueden quedar recortados con poca precisión.
