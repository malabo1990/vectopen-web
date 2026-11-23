---
title: "Vectopen 0.2.4-beta: iluminación 2D, fusión, tablas de verdad, contenedores y un editor más rápido que nunca"
date: 2026-11-23
summary: "99 cambios desde la 0.2.3: luces con sombras 2D en tiempo real, fusión (Blend) entre varios objetos, esquinas avanzadas, tablas con su propio panel, contenedores flex y grid, componentes, páginas maestras, «Convertir en trazado Bézier», grosor con Mayús + arrastrar en vivo e instalador para Windows. Y un clic sobre una figura que pasa de 11 a 6 ms."
tags: [release, lighting, blend, layout, performance]
draft: false
---

La [0.2.3-beta](./post.html?p=2026-11-vectopen-0-2-3-beta) salió el 9 de
noviembre. Desde entonces han entrado **99 cambios**. Vectopen ha hecho
**30 encargos reales** como pruebas automáticas (carteles, revista,
packaging, manual de marca, mapas, historieta…) y cada uno se ha repasado en
las tres interfaces. El resultado es **0.2.4-beta**.

**[Descargar 0.2.4-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.4-beta)**
&nbsp;Windows (instalador .exe o .zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz) · Android (.apk, vista previa)

Quien ya tenga la 0.2.3 verá el aviso de versión nueva en la ventana del logo
y podrá instalarla con un clic.

## 1. Iluminación 2D

Hay una herramienta **Luz** en la barra: puntual, foco, direccional (sol) y
ambiente. La luz se mueve con tiradores en el lienzo (● alcance y dirección,
◆ apertura del foco) y **todo cambia en tiempo real**, también al escribir o
arrastrar un número en el panel.

- **Sombras 2D de verdad**: la silueta de cada objeto, oscura junto a él y
  difuminándose hacia el final, siguiendo los rayos de la luz.
- Dependen de **todas** las propiedades de la luz: intensidad, color (sombra
  de tono complementario), **altura** (luz rasante = sombra larga), borde
  duro, alcance y cono. La luz ambiente rellena las sombras.
- Dan sombra las figuras, los **textos y párrafos** (letra a letra), los
  **trazos de pincel** y los **trazados Bézier**.
- Fluida con 500 figuras y 6 luces.

![Un foco iluminando una figura: la sombra sigue el cono de luz](../media/shots/024_luz_foco.webp)

![El panel Iluminación, compacto](../media/shots/024_luz_panel.webp)

## 2. Fusión (Blend)

Intermedios de **forma, color (también degradados), trazo y opacidad** entre
dos o más objetos (A → B → C), también a lo largo de una guía. No es
destructiva: si cambias un extremo, los pasos se recalculan. Tiene su propio
**panel Fusión** (pasos fijos o por distancia, orientar con la guía,
invertir, expandir y soltar) y funciona con figuras, trazos de pincel,
trazados Bézier abiertos y textos.

![Fusión entre figuras, trazos de pincel y textos](../media/shots/024_fusion_todo.webp)

![Fusión de degradados](../media/shots/024_fusion_degradado.webp)

![Fusión a lo largo de una guía](../media/shots/024_fusion_guia.webp)

## 3. Esquinas avanzadas

Cada esquina de un rectángulo puede ser distinta: redonda, **redondeado
inverso**, chaflán, muesca, zigzag o dientes de sierra. Se eligen en el
panel Figuras o con **Mayús + clic** en el tirador de redondeo, que va
pasando de un tipo a otro.

![Esquinas de redondeado inverso](../media/shots/024_esquina_inversa.webp)

![Esquinas en zigzag](../media/shots/024_esquina_zigzag.webp)

## 4. Tablas de verdad

Una tabla ya se comporta como una tabla: **un clic la selecciona entera**,
sin tiradores Bézier en su rejilla, y un **doble clic en una celda** (también
vacía) entra a escribir en ella. El nuevo **panel Tabla** sirve para:

- filas y columnas; insertar arriba, abajo, a la izquierda o a la derecha de
  la celda activa; borrar;
- alto de fila, ancho de columna e «Igualar columnas»;
- cabecera, filas alternas, letra, borde, alineación y colores.

En Capas, la tabla es un solo objeto.

![Una tabla con su panel](../media/shots/024_tabla.webp)

## 5. Maquetación: contenedores, componentes y páginas maestras

- **Contenedores Auto Layout**: flex (fila, columna, salto de línea) y grid,
  con márgenes, hueco y alineación, y su propio **panel Contenedor**.
- **Componentes** (símbolos) en Recursos: todas las copias son iguales y
  editar una cambia las demás. Miniatura, número de copias, colocar,
  seleccionar todas las copias, renombrar y desvincular.
- **Páginas maestras** como en InDesign: cabecera, pie y número de página
  comunes.
- **Combinar datos** desde CSV (catálogos, tarjetas) e **índice de páginas**.
- **Estilos de texto con nombre** y **colores globales** del documento.

![El panel Contenedor](../media/shots/024_contenedor.webp)

![Componentes en Recursos](../media/shots/024_componentes.webp)

## 6. Edición más directa

- **Convertir en trazado Bézier** (clic derecho, en los tres modos):
  polígonos, rectángulos, estrellas y elipses pasan a un trazado editable con
  la misma forma y estilo; los textos, a curvas. El editor de nodos se abre
  solo.
- **Texto en trazado**: queda encima de su guía y un clic en cualquier letra
  lo selecciona y lo arrastra, como en Inkscape, Affinity o Illustrator.
- **Grosor con Mayús + arrastrar, en vivo**: con el pincel y el lápiz en
  cualquier dirección (arriba o derecha = más grueso), y sobre una figura o
  un Bézier seleccionado, con un solo paso de deshacer.

![Texto en un trazado Bézier, seleccionado con un clic](../media/shots/024_texto_trazado.webp)

## 7. Rendimiento

Esta versión se ha medido contra la anterior con las mismas pruebas:

| | 0.2.3 | 0.2.4 |
|---|---|---|
| Clic sobre una figura | 11 ms | **~6 ms** |
| Soltarla tras moverla | 28 ms | **~5 ms** |
| Abrir una foto vectorizada | 25 s | **0,7 s** |
| Seleccionar todo con 50 000 elementos | 5 s | **0,9 s** |

Mover una figura cuesta menos de 1 ms por movimiento del ratón, y cambiar el
grosor de 500 trazos seleccionados va a unos 30 ms por fotograma.

## 8. Más

- **Windows: instalador** por usuario (sin administrador) y actualización
  automática desde la app. El vectorizador va incluido en Windows, en Linux y
  en Mac con Apple Silicon.
- **Android**: librerías nativas de texto e importadores.
- **Avisos de error** discretos y «Contactar / informar de un error», que
  prepara el aviso con el informe técnico; nada se envía solo.
- **Botón central** (o el del lápiz) + arrastrar desplaza cualquier panel.
- **Máscaras anidadas**, **modos de fusión** de capas (también en SVG y
  PDF), **PDF de todas las páginas**, **simplificar trazado** y **pincel de
  patrón** con piezas de inicio, esquina y final.
- Todo lo nuevo, traducido a los **10 idiomas**.

La lista completa está en las
[notas de la versión](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.4-beta)
y en los
[99 cambios](https://github.com/malabo1990/-Vectopen/compare/v0.2.3-beta...v0.2.4-beta).
