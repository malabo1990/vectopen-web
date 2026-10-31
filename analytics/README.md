# Analítica de la web de Vectopen

Colector propio para `vectopen-web` (GitHub Pages, estático). Sustituye a
Google Analytics: **sin cookies, sin IP almacenada, sin datos personales**.

## Qué mide

| Métrica | Cómo |
|---|---|
| Visitas y visitantes únicos/día | `POST /c` con `kind=pv`; visitante = hash(IP+UA+día+sal) |
| País | cabecera `CF-IPCountry` del Worker (`request.cf.country`), nunca la IP |
| Tiempo en página | evento `lv` al ocultar/cerrar; media por página y global |
| Interacciones | eventos `scroll50`, `scroll90`, `download`, `outbound` |
| Páginas y sesiones | ruta + id aleatorio de pestaña (`sessionStorage`) |

## Despliegue (una sola vez)

Requiere una cuenta de Cloudflare (la misma del servidor de licencias).

```sh
cd analytics
npx wrangler login
npx wrangler d1 create vectopen-analytics      # copia el database_id
# pega el id en wrangler.toml → [[d1_databases]] → database_id
npx wrangler d1 execute vectopen-analytics --file=schema.sql --remote
npx wrangler secret put ANALYTICS_SALT          # cadena aleatoria larga
npx wrangler secret put STATS_KEY               # clave para leer /stats
npx wrangler deploy
```

Al terminar te da una URL tipo
`https://vectopen-analytics.TUCUENTA.workers.dev`.

## Activar en la web

En `web/index.html`, antes de `</body>`, rellena el endpoint:

```html
<script defer src="assets/va.js"
        data-endpoint="https://vectopen-analytics.TUCUENTA.workers.dev"></script>
```

Con `data-endpoint=""` el beacon no envía nada (seguro dejarlo puesto).
Para los docs (MkDocs) se puede añadir el mismo `<script>` con
`extra_javascript` o un `overrides/main.html`.

## Consultar

```sh
curl -s "https://vectopen-analytics.TUCUENTA.workers.dev/stats?key=TU_STATS_KEY&days=30" | jq
```

Devuelve `totales` (pageviews, visitantes, sesiones, `seg_medios`),
`paises`, `paginas`, `eventos` y `diario`.

### Consultas sueltas

```sql
-- países de los últimos 7 días
SELECT country, COUNT(DISTINCT visitor) v
FROM hits WHERE day >= date('now','-7 day') AND kind='pv'
GROUP BY country ORDER BY v DESC;

-- tiempo medio por página
SELECT path, ROUND(AVG(value),1) seg FROM hits
WHERE kind='lv' AND day >= date('now','-7 day') GROUP BY path;
```

## Privacidad

- No se guardan IPs: solo un hash con sal rotatoria (`ANALYTICS_SALT`).
- Sin cookies ni identificadores persistentes; la sesión vive en
  `sessionStorage` y muere al cerrar la pestaña.
- El beacon respeta `Do Not Track` y la clave
  `localStorage['vectopen-no-analytics'] = '1'`.
- Datos agregados por día; el crudo se puede purgar a los 400 días
  (consulta comentada en `schema.sql`).

## Coste

Cloudflare Workers gratis: 100 000 peticiones/día. D1 gratis: 5 GB y
5 M lecturas/día. Para una landing, sobra.
