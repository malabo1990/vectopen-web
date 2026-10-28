# Vectorizar

**Vectorizar** convierte una imagen de mapa de bits — una foto, un dibujo escaneado, un logo en PNG — en formas vectoriales editables.

!!! warning "Solo en Linux en la 0.2.0-alpha"
    Vectorizar está disponible en la versión de Linux. Windows y macOS están previstos.

## Cómo se usa

1. Coloca una imagen en la mesa de trabajo (herramienta Imagen, o arrastra un archivo) y selecciónala.
2. Abre **Vectorizar** (sección del inspector en Modern, pestaña Efectos en Pro).
3. Elige un **preajuste** — *Logo / icono*, *Ilustración* o *Foto (más detalle)* — o ajusta las opciones.
4. Pulsa **Vectorizar**. El resultado es un grupo de formas colocado sobre la imagen.

## Opciones

| Opción | Significado |
|---|---|
| **Trazados** | **Curvas Bézier** (suaves), **Polígonos** (segmentos rectos) o **Píxeles** |
| **Detalle** | Ignora manchas de menos de N píxeles — menos es más detalle |
| **Colores** | Precisión de color — más es más capas de color |
| **Esquinas** | Ángulo a partir del cual un punto es una esquina |
| **Blanco y negro** | Trazos negros sobre fondo transparente — para logos y firmas |
| **Quitar el fondo antes (IA)** | Elimina el fondo con un modelo de IA antes de vectorizar |
| **Mejorar ×4 antes (IA)** | Amplía imágenes pequeñas para que las curvas salgan más limpias |
| **Ocultar la imagen original** | Oculta (no borra) la imagen después |

Las dos herramientas de IA también se pueden usar por separado: **Quitar fondo** y **Mejorar ×4** trabajan sobre la imagen seleccionada sin vectorizarla. Funcionan en tu ordenador; no se sube nada.
