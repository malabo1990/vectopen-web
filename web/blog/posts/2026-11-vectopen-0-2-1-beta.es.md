---
title: "Vectopen 0.2.1-beta: interfaz revisada a fondo, diez encargos reales y la app se actualiza sola"
date: 2026-11-03
summary: "99 cambios desde la 0.2.0-alpha: importar archivos de Affinity, texto como en Office, dos revisiones completas de la interfaz en Smart, Modern y Pro (31 incidencias), cero errores en los depuradores, diez encargos reales de diseñador y avisos de actualización con descarga e instalación en un clic."
tags: [release, ui, text, import, testing, updates]
draft: false
---

La [0.2.0-alpha](./post.html?p=2026-10-vectopen-0-2-0-alpha) fue la primera
versión descargable. Desde entonces han entrado **99 cambios** en cuatro etapas:
formatos, texto, una revisión a fondo de la interfaz en los tres modos y, por
último, diez encargos reales de principio a fin. El resultado es **0.2.1-beta**.

**[Descargar 0.2.1-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.1-beta)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz)

![Pantalla de arranque de la 0.2.1-beta](../media/shots/splash_0_2_1.webp)

## 1. Abrir archivos de Affinity

Importar y exportar tiene ahora una base nativa nueva escrita en Rust
(`vectopen_io`), que funciona en Windows, macOS y Linux y está protegida: si un
archivo está dañado o es enorme, Vectopen avisa en lugar de cerrarse, y antes de
operar guarda una copia de seguridad.

Encima de esa base hay un **lector propio de documentos de Affinity**
(`.af`, `.afdesign`, `.afphoto`, `.afpub`), comprobado con 33 documentos reales
de Affinity 1, 2 y 3. Trae curvas, rectángulos con sus esquinas, elipses,
estrellas y engranajes, colores RGB/CMYK/gris, degradados, trazos, texto con
sus tramos (fuente, tamaño, color, contorno), párrafos, imágenes, recortes,
efectos de capa (sombras, resplandores, desenfoque, contorno), documentos
incrustados, páginas maestras y artboards. Si una fuente del documento no está
instalada, te lo dice.

## 2. Texto que se edita como en Office

- **Moverse por el texto como en Word:** Ctrl+← / → salta por palabras,
  Ctrl+↑ / ↓ por párrafos, AvPág / RePág por páginas.
- **El formato solo afecta a la selección.** Fuente, peso, cursiva, subrayado,
  tachado, tamaño, color, contorno, espaciado y línea base se aplican solo a
  las letras seleccionadas, como en Word o InDesign, con deshacer.
- **Mayúsculas, minúsculas, tipo título o tipo frase** también por selección
  (antes Pro cambiaba todo el texto).
- **Convertir a curvas** (Ctrl+Mayús+O): cada letra pasa a ser una forma con
  su color y posición.
- Ctrl+Z mientras escribes deshace lo escrito sin salir del texto.

## 3. Revisión de la interfaz en Smart, Modern y Pro

Esta fue la parte más larga. Revisé la app en sus tres interfaces, en tema
claro y oscuro, en dos rondas. **Cada incidencia se cerró con una prueba
automática que maneja la interfaz como lo haría una persona** (clics, teclado,
arrastres) y que falla si el defecto vuelve. Las pruebas de interfaz pasaron
de 41 a **88**.

**Primera ronda (7 incidencias).** La más grave era crítica: con 300–1000
trazos de pincel, o al seleccionar unos 400 elementos, **la app se bloqueaba**.
Ya no. Además:

- el panel de tipografía ya no corta la edición de un párrafo;
- un texto creado arrastrando queda del tamaño que se previsualizaba;
- panel de **Páginas** nuevo, con vistas Simple, Pliegos (como un libro) y
  Rejilla;
- el anillo de 360° ya no dibuja una línea suelta;
- Script y Complementos funcionan también en Modern y Pro;
- el Inspector cubre todas las propiedades de cada objeto.

**Segunda ronda (24 incidencias).** Muchas salieron de vuestros comentarios
probando la alfa:

- **Trazos invisibles en Modern:** los trazos nuevos heredaban el color de la
  selección y podían nacer blancos sobre una página blanca. Ahora un trazo
  nuevo nunca nace sin contraste.
- **La máscara de recorte** sigue la curva aunque las Bézier se crucen o el
  trazado esté abierto.
- **Escribir en el Inspector** ya no cambia de herramienta: las letras que
  escribías en un campo actuaban como atajos. Escape devuelve el teclado al
  lienzo.
- **El tema de Vectopen en todas partes:** el Inspector y el panel de Pro
  mostraban barras gris claro con texto blanco (el tema por defecto de Godot);
  ahora usan el mismo diseño que Capas, en claro y en oscuro.
- **Siempre el selector de color de Vectopen** (nunca el de Godot), con su
  paleta visible y utilizable en los tres modos, degradados guardables en las
  muestras y borrado con clic derecho.
- **Panel de Trazo completo también en Modern**, con parámetros nuevos:
  desfase de guiones, patrón propio («12 4 2 4») y trazo detrás del relleno.
- **Pinceles con su textura real** (lápiz granulado, aerógrafo difuminado,
  caligráfico…) y muestras que son trazos de verdad.
- **Pro más flexible:** pestañas que se reordenan y se pueden sacar como
  ventanas flotantes; Inspector redimensionable arrastrando su borde; iconos de
  Shader, Script, Vectorizar y Complementos junto a Exportar; panel «Página»
  (color y tamaño) que faltaba.
- **Ventana de tamaños de página** rediseñada como una cuadrícula con
  miniaturas (papel, pantallas, móviles, redes sociales).
- X, Supr y Retroceso borran en todos los contextos; el menú del clic derecho
  ya no se sale de la pantalla ni queda bajo la regla.

**Depuradores a cero.** Al final de la revisión, la pestaña Depurador de Godot
y la consola de diagnóstico de Vectopen mostraban errores repetidos (85 de un
solo tipo) y 79 avisos de código. Ahora: **cero errores y cero avisos** en los
300 scripts.

## 4. Diez encargos reales, de principio a fin

Con la interfaz limpia, la pregunta pasó de *¿funciona cada botón?* a *¿puede
un diseñador terminar un trabajo de verdad?* Hice diez encargos completos, cada
uno en su interfaz principal: formato exacto, capas, texto, exportar a
PNG/SVG/PDF y comparar con la pantalla, deshacer 20 pasos, guardar, cerrar y
volver a abrir sin perder nada, tema claro y oscuro.

| # | Encargo | Interfaz | Resultado |
|---:|---|---|---|
| 1 | Libro de 20 páginas | Pro | Aprobado |
| 2 | Revista de 8 páginas | Pro | Aprobado |
| 3 | Cartel A1 | Smart | Aprobado |
| 4 | Flyer para redes (1080 × 1350) | Modern | Aprobado |
| 5 | Logo con variantes | Pro | Aprobado |
| 6 | Isotipo con anillo | Smart | Aprobado |
| 7 | Tarjeta de visita | Modern | Aprobado |
| 8 | Infografía de datos | Pro | Aprobado |
| 9 | Enciclopedia visual (12 fichas) | Pro | Aprobado |
| 10 | UI kit de aplicación | Modern | Pendiente de dos funciones nuevas |

Salieron **26 defectos** que las pruebas por función no veían: **19 ya están
arreglados**, 5 son detalles leves que siguen en la lista y 2 son funciones
nuevas. Los más importantes:

- **El PDF salía un 33 % más grande** (píxeles escritos como puntos: un A4 no
  medía un A4). Ahora PDF y EPS tienen el tamaño físico exacto.
- **Sangrado para imprenta:** el PDF lleva el sangrado de la página y las cajas
  de corte que espera una imprenta.
- **Logos macizos:** al convertir en trazado una resta con agujero, el agujero
  desaparecía. Ahora se conserva.
- **Máscaras, flechas y sombras al exportar:** una foto dentro de un
  círculo-máscara, las puntas de flecha y algunas sombras se perdían en
  SVG/PDF.
- **Duplicar páginas** encogía los títulos de la copia; la vista **Rejilla**
  ordena ahora también el lienzo; los textos fuera de pantalla ya no salen
  borrosos en PNG a 3×; centrar un texto en un botón lo centra de verdad.
- Número de página automático (`{pág}` / `{total}`), retícula de página
  (márgenes, columnas, medianil, sangrado) y tamaños A0–A2.

![Doce fichas en la vista Rejilla, ordenadas también en el lienzo](../media/shots/fichas_rejilla.webp)

Cada encargo queda como prueba automática: si algo se rompe mañana, el encargo
falla y lo veo antes que tú.

## Vectopen te avisa cuando hay versión nueva

Al hacer clic en el logo se abre una ventana nueva con la versión, los
créditos, la comunidad y las **actualizaciones**. Al arrancar (una vez al día,
y se puede desactivar) Vectopen mira si hay una versión nueva en GitHub; si la
hay, aparece un **punto rojo** en el logo. **Descargar e instalar** baja el
paquete de tu sistema con una barra de progreso; en Linux lo instala pidiendo
tu contraseña y te ofrece reiniciar, y en Windows y macOS abre el archivo
descargado.

![Ventana del logo: comunidad y actualizaciones](../media/shots/about_update_dark.webp)

Detrás hay un *GitHub Action* que compila Vectopen en Windows, macOS y Linux
cada vez que publico una versión, la empaqueta y crea la publicación. Esta es
también la primera versión con **Vectorizar en Windows y en Mac con Apple
Silicon** (en Mac Intel aún no: la librería de IA que usa no existe para
Intel).

## Comunidad: ahora también en Reddit

Además de [Telegram](https://t.me/vectopen) y
[GitHub](https://github.com/malabo1990/-Vectopen), Vectopen tiene comunidad en
**[Reddit: r/Vectopen_editor](https://www.reddit.com/r/Vectopen_editor/)**:
el mejor sitio para enseñar lo que haces, pedir funciones y comentar versiones.

## Lo siguiente (0.2.2)

- **Componentes vinculados:** cambias el botón maestro y se actualizan todas
  sus copias.
- **Estilos de texto con nombre** (título, cuerpo, pie) que se aplican y
  actualizan de una vez.
- Los encargos 11 a 30: wireframes, iconos, ilustración con pinceles, mapas,
  packaging, tipografía, shaders, scripts y vectorizar fotos.
- Instalador para Windows y binarios firmados (hoy Windows y macOS muestran el
  aviso de «desarrollador desconocido»).

## Ayuda a que siga adelante

Vectopen lo hace una sola persona, sin empresa, sin cuenta, sin telemetría y
sin versión de pago. Puedes apoyarlo en
**[GitHub Sponsors](https://github.com/sponsors/malabo1990)**, o ayudar igual
de mucho probando la beta y contando lo que falla en
[Reddit](https://www.reddit.com/r/Vectopen_editor/),
[Telegram](https://t.me/vectopen) o
[GitHub](https://github.com/malabo1990/-Vectopen/issues). Buena parte de esta
versión salió precisamente de esos avisos.

Gracias por leer — y si haces algo con Vectopen, enséñalo en r/Vectopen_editor.
