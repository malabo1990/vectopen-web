# Servidor MCP (integración con IA)

Vectopen incluye un servidor **MCP (Model Context Protocol)** propio, para que un agente de IA —Claude Code, o cualquier otro cliente compatible con MCP— pueda inspeccionar y manejar una instancia *en ejecución* de la app: leer el lienzo, crear y editar figuras, deshacer/rehacer y exportar, todo a través de las mismas operaciones con deshacer que usa la propia interfaz.

!!! note "No es lo mismo que `addons/godot_mcp`"
    Si has visto `addons/godot_mcp` en el repositorio, ese es un plugin **de tiempo de edición** separado, usado por asistentes de codificación con IA para ayudar a *desarrollar* Vectopen (leer/escribir escenas y scripts en el editor de Godot). El servidor documentado aquí corre dentro de la **app exportada/en ejecución** y solo expone operaciones sobre el lienzo — no tiene acceso a scripts, escenas ni al sistema de archivos más allá de exportar artboards.

## Activarlo

1. Abre **Preferencias** (el pequeño icono de la esquina superior izquierda, donde se cruzan las reglas) → pestaña **Theme**.
2. Baja hasta **"Integraciones IA (MCP)"**.
3. Marca **Servidor MCP**. La línea de estado de abajo muestra la URL en la que está escuchando una vez activo.
4. Copia el **token** que aparece en el campo de al lado — tu cliente MCP lo necesita.

El ajuste (y el token) persisten entre reinicios. Pulsa **Regenerar** en cualquier momento para invalidar el token actual y emitir uno nuevo — útil si crees que se filtró.

## Conectar un cliente

El servidor habla MCP sobre HTTP + JSON-RPC 2.0, solo en `127.0.0.1`. Apunta tu cliente MCP a:

```
http://127.0.0.1:<puerto>/mcp
```

(puerto por defecto **6520**), enviando el token como cabecera bearer:

```json
{
  "mcpServers": {
    "vectopen": {
      "type": "http",
      "url": "http://127.0.0.1:6520/mcp",
      "headers": {
        "Authorization": "Bearer <tu-token>"
      }
    }
  }
}
```

## Modelo de seguridad

Este servidor solo escucha en `127.0.0.1` — no es alcanzable desde otras máquinas. Aun así, eso no basta por sí solo: cualquier pestaña de navegador abierta en el mismo equipo puede intentar alcanzar un puerto local, así que el servidor también:

- **Exige el token bearer** en cada request, comparado en tiempo constante.
- **Rechaza cualquier request con cabecera `Origin`** — un cliente MCP real nunca la manda; solo la manda una página web.
- **Valida la cabecera `Host`** contra `127.0.0.1`/`localhost` más el puerto real, bloqueando intentos de DNS rebinding.
- **Limita las conexiones concurrentes** (16) para evitar agotar recursos.

Deliberadamente **no** expone creación/ejecución de scripts, carga de proyectos desde rutas arbitrarias, ni nada más allá de la lista de herramientas estructuradas de abajo.

## Herramientas disponibles

| Herramienta | Hace |
|---|---|
| `get_project_info` | Número de artboards, disponibilidad de deshacer/rehacer, indicador de modificado |
| `list_artboards` | Lista los artboards con índice, nombre, posición y cuál está activo |
| `get_canvas_tree` | Lista las figuras de un artboard (nombre, tipo, posición, tamaño, path) |
| `get_selection` | Las figuras actualmente seleccionadas |
| `set_selection` | Selecciona figuras por los paths que devolvieron `get_canvas_tree`/`get_selection` |
| `clear_selection` | Vacía la selección |
| `get_properties` | Propiedades tipo-Inspector de la selección actual (o de `paths`) |
| `set_property` | Aplica una propiedad del Inspector a la selección actual (o `paths`) — deshacible |
| `create_shape` | Crea un rectángulo o elipse en un artboard — deshacible |
| `delete_selected` | Borra la selección actual (o `paths`) — deshacible |
| `undo` / `redo` | Avanza la pila de deshacer |
| `export_artboard` | Exporta un artboard a PNG o SVG, esperando a que termine |

Cada mutación pasa por el mismo mecanismo de `HistoryManager`/Inspector que usa la interfaz, así que cualquier cosa que haga un agente aparece correctamente en el **panel de capas** y puede deshacerse con **Ctrl+Z** como cualquier edición manual.
