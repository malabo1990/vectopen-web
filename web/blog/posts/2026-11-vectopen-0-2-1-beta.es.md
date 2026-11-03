---
title: "Vectopen 0.2.1-beta: diez encargos reales y la app se actualiza sola"
date: 2026-11-03
summary: "Probamos Vectopen como lo usaría un diseñador: un libro, una revista, un cartel A1, un logo, una tarjeta de visita… Salieron 26 defectos: 19 ya están arreglados. Además: avisos de actualización con descarga e instalación en un clic, comunidad en Reddit y publicaciones automáticas para Windows, macOS y Linux."
tags: [release, testing, export, updates, community]
draft: false
---

Después de la [0.2.0-alpha](./post.html?p=2026-10-vectopen-0-2-0-alpha) la
pregunta ya no era *¿funciona cada botón?* sino *¿puede un diseñador terminar un
trabajo de verdad con Vectopen?* Para responderla dejé de probar funciones
sueltas y empecé a hacer **encargos completos**, de principio a fin, como los
haría un profesional. El resultado es **0.2.1-beta**.

**[Descargar 0.2.1-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.1-beta)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz)

![Pantalla de arranque de la 0.2.1-beta](../media/shots/splash_0_2_1.webp)

## Diez encargos, de principio a fin

Cada encargo es un trabajo real hecho en su interfaz principal (Smart, Modern o
Pro), con clics de verdad donde se puede: formato exacto, capas, texto,
exportar a PNG/SVG/PDF y comparar con la pantalla, deshacer 20 pasos, guardar,
cerrar y volver a abrir sin perder nada, tema claro y oscuro.

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

Cada encargo se queda como prueba automática: si algo se rompe mañana, el
encargo falla y lo veo antes que tú.

## Lo que encontraron (y ya está arreglado)

Los encargos destaparon **26 defectos** que las pruebas de funciones sueltas no
veían: **19 ya están arreglados**, 5 son detalles leves que siguen en la lista y
2 son funciones nuevas (más abajo). Los más importantes:

- **El PDF salía un 33 % más grande.** Se usaban píxeles como si fueran puntos:
  un A4 no medía un A4. Ahora el PDF y el EPS tienen el tamaño físico exacto.
- **Sangrado para imprenta.** El PDF de una tarjeta de visita salía al tamaño
  de corte. Ahora lleva el sangrado de la página y las cajas de corte
  (`TrimBox`/`BleedBox`) que espera una imprenta.
- **Logos macizos.** Al convertir en trazado una resta con agujero (la «O» de un
  logo), el agujero desaparecía. Ahora se conserva en pantalla, al exportar y al
  volver a abrir.
- **Máscaras en SVG/PDF.** Una foto dentro de un círculo-máscara desaparecía al
  exportar a vectores. Ahora sale recortada por el círculo.
- **Flechas que se perdían.** Las puntas de flecha de los trazos no llegaban a
  SVG, PDF ni EPS.
- **Sombras invisibles.** Algunos programas no mostraban los objetos con sombra
  de un SVG exportado; ahora la sombra se escribe de la forma que todos
  entienden.
- **Duplicar páginas** cambiaba el tamaño de los títulos de la copia y dejaba los
  párrafos en una sola línea.
- **La vista Rejilla** de Páginas ordenaba las miniaturas pero no el lienzo:
  doce fichas seguían en una fila interminable. Ahora el lienzo también se
  ordena en filas.
- **Textos borrosos** al exportar a PNG a 3× si no estaban a la vista.
- **Centrar un texto en un botón** no lo centraba: se usaba la caja de edición
  del texto en lugar de lo que se ve.
- Número de página automático (`{pág}` / `{total}`), retícula de página
  (márgenes, columnas, medianil, sangrado) que se guarda con el documento,
  tamaños A0–A2 y más.

![Doce fichas en la vista Rejilla, ordenadas también en el lienzo](../media/shots/fichas_rejilla.webp)

## Vectopen te avisa cuando hay versión nueva

Al hacer clic en el logo de Vectopen se abre una ventana nueva con la versión
que tienes, los créditos, la comunidad y las **actualizaciones**:

- Al arrancar (una vez al día, y puedes desactivarlo) Vectopen mira si hay una
  versión nueva en GitHub. Si la hay, aparece un **punto rojo** en el logo.
- **Descargar e instalar** baja el paquete de tu sistema con una barra de
  progreso. En Linux (Fedora, Ubuntu…) lo instala pidiendo tu contraseña con la
  ventana del sistema y te ofrece **reiniciar**; en Windows y macOS abre el
  instalador.

![Ventana del logo: comunidad y actualizaciones](../media/shots/about_update_dark.webp)

Detrás hay un *GitHub Action* que, cada vez que publico una etiqueta de versión,
compila Vectopen en Windows, macOS y Linux, lo empaqueta y crea la publicación.
Así cada versión sale igual en los tres sistemas, y la app la encuentra sola.

## Comunidad: ahora también en Reddit

Además de [Telegram](https://t.me/vectopen) y
[GitHub](https://github.com/malabo1990/-Vectopen), Vectopen tiene comunidad en
**[Reddit: r/Vectopen_editor](https://www.reddit.com/r/Vectopen_editor/)**.
Es el mejor sitio para enseñar lo que haces, pedir funciones y comentar
versiones.

## Lo que todavía falta

El décimo encargo, un **UI kit de aplicación**, dejó claro lo que falta para el
diseño de interfaces:

- **Componentes vinculados:** cambias el botón maestro y se actualizan todas sus
  copias. Hoy, la pestaña Recursos coloca copias independientes.
- **Estilos de texto con nombre** (título, cuerpo, pie) que se aplican y
  actualizan de una vez.

Son las dos novedades principales de la **0.2.2**.

Otras notas de esta beta:

- En **Mac Intel**, Vectopen funciona pero sin el vectorizador con IA (la
  librería que usa no existe para Intel). En Apple Silicon va completo.
- Sigue sin firmar: Windows y macOS mostrarán el aviso de «desarrollador
  desconocido».

## Ayuda a que siga adelante

Vectopen lo hace una sola persona, sin empresa, sin cuenta, sin telemetría y
sin versión de pago. Puedes apoyarlo en
**[GitHub Sponsors](https://github.com/sponsors/malabo1990)**, o ayudar igual
de mucho probando la beta y contando lo que falla en
[Reddit](https://www.reddit.com/r/Vectopen_editor/),
[Telegram](https://t.me/vectopen) o
[GitHub](https://github.com/malabo1990/-Vectopen/issues).

Gracias por leer — y si haces algo con Vectopen, enséñalo en r/Vectopen_editor.
