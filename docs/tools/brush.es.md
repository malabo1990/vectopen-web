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
