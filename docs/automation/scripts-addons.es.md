# Scripts y complementos

Los scripts hacen que Vectopen haga el trabajo repetitivo por ti: crear, mover, recolorear, renombrar y agrupar objetos. Los complementos son scripts empaquetados para reutilizarlos y compartirlos.

Los dos están en la pestaña **Script** de la **ventana Efectos** de la interfaz **Smart**.

!!! note "Scripts en Modern y Pro"
    En la 0.2.0-alpha la pestaña Script solo está en Smart. Cambia a Smart para ejecutar un script: lo que crea o cambia se ve en todas las interfaces. Llevarla al panel derecho de Modern y Pro está previsto.

## Scripts

La pestaña Script es un pequeño editor de código con consola:

- Escribe **GDScript** usando el objeto `api` — la API de Vectopen.
- **Ejecuta** con **Ctrl+Intro** o **F5**. Lo que escribe `print()` y los errores (con su línea) salen en la consola.
- Al escribir `api.` aparece el autocompletado; el botón de ayuda lista todas las funciones de la API.
- **Cada ejecución es un solo paso de deshacer.** Si un script falla a medias, sus cambios se deshacen solos.
- Guarda tus scripts en la **biblioteca** y reutilízalos.

Plantillas para empezar: *cuadrícula de círculos*, *colores aleatorios*, *espiral de estrellas*, *repartir en círculo*, *onda Bézier*, *polígonos 3 → 12*, *renombrar selección*, *agrupar por tipo*.

Un ejemplo mínimo — 10 círculos en fila, cada uno de un color:

```gdscript
for i in 10:
    var c = api.add_ellipse(Vector2(60 + i * 70, 200), Vector2(50, 50))
    api.set_fill(c, Color.from_hsv(i / 10.0, 0.7, 0.95))
```

Funciones útiles de la API:

| Grupo | Funciones |
|---|---|
| Crear | `add_rect`, `add_ellipse`, `add_polygon`, `add_star`, `add_shape`, `add_path`, `add_curve`, `add_line`, `add_text`, `import_svg` |
| Buscar y seleccionar | `shapes`, `find`, `selection`, `select`, `clear_selection`, `artboard`, `artboards` |
| Cambiar | `set_prop`, `set_props`, `set_fill`, `set_stroke`, `set_position`, `move`, `set_rotation` |
| Organizar | `group`, `duplicate`, `delete`, `arrange`, `align` |
| Efectos | `effect_types`, `add_effect`, `clear_effects`, `add_filter` |

## Complementos

La sección **Complementos** de la pestaña Script es el gestor de complementos:

- **Instalar** desde un `.zip`, una carpeta o un solo archivo `.gd`.
- **Activar / desactivar**, **recargar** (tras editar sus archivos) y **desinstalar**.
- Un complemento activo muestra ahí mismo sus **operadores** (botones) y sus **ajustes**.
- Si un complemento falla al activarse, se queda desactivado y muestra el error.

Vienen de ejemplo:

- **Colores** — colores aleatorios, degradado del primer al último objeto seleccionado, invertir, escala de grises.
- **Repetir** — copia la selección en cuadrícula o en círculo.
- **Hola Vectopen** — el complemento más pequeño posible: un botón que escribe en la consola y crea un texto. Empieza por aquí para hacer el tuyo.

### Escribir un complemento

Un complemento es una carpeta con dos archivos: `addon.cfg` (nombre, versión, autor, descripción) y `main.gd` (un script que hace `extends VectopenAddon`). Mira la carpeta de *Hola Vectopen* para ver un ejemplo completo.

## Agentes de IA

Para que un asistente de IA maneje Vectopen, ver [Servidor MCP](../integrations/mcp-server.md).
