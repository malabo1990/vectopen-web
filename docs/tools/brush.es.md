# Pincel

El **Pincel** (**B**) dibuja trazos vectoriales a mano alzada: **haz clic y arrastra** sobre la mesa de trabajo y suelta para terminar.

El trazo no es un mapa de bits. Vectopen quita los puntos sobrantes del recorrido del ratón o del lápiz y lo suaviza en una curva limpia mientras dibujas, así que el resultado es un trazo vectorial ligero y editable, no miles de muestras sueltas.

## Ajustes del pincel

En el panel del pincel (en Modern y Pro, dentro del panel derecho):

| Ajuste | Qué hace |
|---|---|
| **Estilo** | Preajustes: lápiz, pluma, rotulador, caligrafía, aerógrafo y **goma** |
| **Grosor (px)** | Grosor del trazo |
| **Opacidad (%)** | Opacidad del trazo |
| **Suavizado** | *Rápido (boceto)*, *Equilibrado* (por defecto), *Alto (preciso)* o *Ultra suave* |

## Presión del lápiz (tabletas gráficas)

Con una tableta gráfica, **el grosor del trazo sigue la presión del lápiz**: cuanto más aprietas, más grueso. La sección **Presión del lápiz** del panel tiene:

| Ajuste | Qué hace |
|---|---|
| **Medidor de presión** | Muestra la presión que llega del lápiz en este momento — sirve para comprobar que se detecta la tableta |
| **Grosor según la presión** | Activa o desactiva la presión |
| **Grosor mínimo** | Grosor con la presión más suave, en % del grosor del pincel |
| **Curva** | *Suave*: con poca fuerza ya engorda · *Firme*: hay que apretar más |
| **Estabilizar** | Filtra el temblor del lápiz para que el grosor no vibre (más = más uniforme) |
| **Sin lápiz: simular con la velocidad** | Con ratón: rápido = fino, lento = grueso |

Estos ajustes se recuerdan entre sesiones.

!!! info "Tabletas probadas"
    Probado con una **Huion Kamvas 20** en Linux (KDE Plasma, Wayland). Otras tabletas que envían la presión del lápiz al sistema deberían funcionar igual, pero aún no se han probado. Dar la vuelta al lápiz y usar su **goma** borra trazos, igual que el estilo goma. La **inclinación** del lápiz no cambia el trazo. Si tu tableta no marca presión en el medidor, cuéntanoslo en [Telegram](https://t.me/vectopen) o en [GitHub](https://github.com/malabo1990/-Vectopen/issues) con el modelo de tableta y tu sistema.

Un trazo con ratón justo después de usar el lápiz se dibuja con el grosor completo: la presión solo se aplica a los trazos hechos con el lápiz.

## Estilos

- **Lápiz** como el de Krita, con durezas de **2H a 8B**, grano del papel y sin cuñas en los giros cerrados.
- **Pluma**, **rotulador**, **aerógrafo** (por sellos) y **caligrafía** (con ángulo de plumilla editable).
- Cambiar de estilo no altera tu grosor.

## Pinceles de figuras y de patrón

- **Pincel de figuras**: estampa figuras a lo largo del trazo. Con **Selección**, se usan como pincel las figuras, grupos o trazados que tengas seleccionados.
- **Pincel de patrón**: dobla el patrón siguiendo la curva, con piezas de **inicio**, **esquina** (centrada en el giro) y **final**, editables también en un trazo ya dibujado.
- **Texturas** dentro del trazo (también desde una imagen tuya, guardada en el documento), **variación de color** a lo largo del trazo y efectos geométricos: ondulado, zigzag y rugoso.
- **Mis pinceles**: guarda tus ajustes favoritos y vuelve a ellos.

## Grosor con Mayús + arrastrar

Mantén **Mayús** y arrastra en el lienzo para cambiar el tamaño del pincel, en **cualquier dirección**: arriba o derecha = más grueso, abajo o izquierda = más fino. El cambio es proporcional (fino en tamaños pequeños, rápido en grandes) y no se dibuja nada durante el gesto.

## Editar un trazo

**Doble clic** sobre un trazo de pincel para editarlo por sus nodos: se convierte en una curva con pocos nodos y conserva la presión. Clic derecho ▸ **Convertir trazo en contorno** lo convierte en una figura rellena.
