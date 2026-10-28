# Efectos, filtros y shaders

Tres formas de cambiar cómo se ve un objeto, de la más sencilla a la más potente. Ninguna cambia el objeto en sí: puedes desactivarlas o quitarlas cuando quieras.

| | Se usa con | Piensa en ello como |
|---|---|---|
| **Efectos** | deslizadores | toques de acabado: sombra, contorno, bisel |
| **Filtros** | deslizadores | un filtro de fotos para todo el objeto |
| **Shaders** | código (o una plantilla) | tu propio filtro |

Dónde están:

- **Efectos** y **Filtros** — las secciones del inspector en Modern, la pestaña **Efectos** en Pro y la ventana **Efectos** en Smart.
- **Shaders** — la pestaña **Shader** de la ventana Efectos, en la interfaz **Smart**.

!!! note "Shaders en Modern y Pro"
    En la 0.2.0-alpha la pestaña Shader solo está en la ventana Efectos de Smart. Cambia a Smart para escribir un shader; el resultado se queda en el objeto en todas las interfaces. Llevarla al panel derecho de Modern y Pro está previsto.

## Efectos

Pulsa **+ Añadir efecto** y elige:

- **Sombra paralela** y **Sombra interior**
- **Contorno**
- **Desenfoque**
- **Superposición de color** y **Superposición de degradado**
- **Resplandor interior**
- **Bisel y relieve**
- **3D** y **Extrusión**

Los efectos se apilan: un objeto puede tener varios, y puedes subirlos o bajarlos, activar o desactivar cada uno, o quitarlo. Cada uno tiene sus deslizadores (distancia, tamaño, color, opacidad…). Al arrastrar un deslizador el lienzo cambia en vivo y se guarda un paso de deshacer al soltar.

## Filtros

Pulsa **+ Añadir filtro**. Un filtro transforma los píxeles del objeto al dibujarlo:

| Filtro | Qué hace |
|---|---|
| **Cristal esmerilado** | Difumina lo que hay detrás y lo tiñe, como un cristal esmerilado |
| **Grano** | Grano de película (color o monocromo) |
| **Duotono** | Pasa el objeto a dos colores: sombras y luces |
| **Neón** | Un halo de color alrededor del objeto |
| **Aberración cromática** | Separa los canales de color, como una lente barata |
| **Glitch** | Desplaza franjas horizontales, como una pantalla rota |
| **Semitono** | Lo convierte en puntos de imprenta |
| **Pixelado** | Píxeles grandes y cuadrados |

Uno de cada tipo por objeto.

## Shaders

Un **shader** es un pequeño programa que se ejecuta en la tarjeta gráfica y decide el color de cada píxel del objeto. La pestaña **Shader** tiene:

- un editor de código con números de línea y colores, que **revisa el código mientras escribes** y marca la línea con el error;
- modo **En vivo** — el objeto cambia mientras escribes;
- **plantillas** para empezar: invertir, escala de grises, onda, pixelado, holograma, brillo de borde, arcoíris animado, desenfoque;
- una **biblioteca** con tus shaders: guardar, cargar, renombrar, duplicar, borrar.

Los shaders usan el lenguaje de shaders de Godot (parecido a GLSL). Aplicar un shader es un paso de deshacer, y se guarda en el archivo `.vtc`.

!!! note
    Los parámetros de tipo *textura* de un shader todavía no se guardan en el archivo.
