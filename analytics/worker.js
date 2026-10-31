/**
 * Vectopen Analytics — colector propio (Cloudflare Worker + D1).
 *
 * Qué mide: visitas, visitantes únicos/día, país (cabecera CF, sin IP),
 * tiempo en página y eventos (scroll, descargas, clics externos).
 *
 * Privacidad: sin cookies, sin IP almacenada (solo hash diario con sal),
 * sin datos personales, agregados por día. Respeta DNT desde el cliente.
 *
 * Rutas:
 *   POST /c                → recoger (pageview | evento | salida)
 *   GET  /stats?key=...    → agregados JSON (?days=30)
 *   GET  /health
 */

const KINDS = new Set(["pv", "ev", "lv"]);
const MAX_BODY = 4096;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origen = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      return conCors(request, env, new Response(null, { status: 204 }));
    }
    if (url.pathname === "/health") {
      return json({ ok: true });
    }
    if (url.pathname === "/c" && request.method === "POST") {
      return recolectar(request, env, origen);
    }
    if (url.pathname === "/stats" && request.method === "GET") {
      return estadisticas(request, env, url);
    }
    return json({ error: "not found" }, 404);
  },
};

/* ------------------------------------------------------------------ collect */

async function recolectar(request, env, origen) {
  if (origen && !permitido(origen, env)) {
    return json({ error: "origin" }, 403);
  }
  const largo = Number(request.headers.get("Content-Length") || 0);
  if (largo > MAX_BODY) return json({ error: "body" }, 413);

  let d;
  try {
    d = await request.json();
  } catch {
    return json({ error: "json" }, 400);
  }

  const kind = String(d.k || "");
  if (!KINDS.has(kind)) return json({ error: "kind" }, 400);

  const ruta = String(d.p || "/").slice(0, 200);
  const nombre = d.n == null ? null : String(d.n).slice(0, 40);
  const valor = Number.isFinite(Number(d.v)) ? Number(d.v) : null;
  const sesion = String(d.s || "").slice(0, 40) || "anon";

  const dia = new Date().toISOString().slice(0, 10);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ua = (request.headers.get("User-Agent") || "").slice(0, 255);
  const visitante = await hash(`${ip}|${ua}|${dia}|${env.ANALYTICS_SALT || "dev"}`, 16);
  const pais = (request.cf && request.cf.country) || "XX";

  await env.DB.prepare(
    `INSERT INTO hits (ts, day, kind, path, name, value, country, visitor, session, ua)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(Date.now(), dia, kind, ruta, nombre, valor, pais, visitante, sesion, ua)
    .run();

  return conCors(request, env, new Response(null, { status: 204 }));
}

/* -------------------------------------------------------------------- stats */

async function estadisticas(request, env, url) {
  const clave = url.searchParams.get("key") || "";
  if (!igualSeguro(clave, env.STATS_KEY || "")) {
    return json({ error: "no autorizado" }, 401);
  }
  const dias = Math.min(Math.max(Number(url.searchParams.get("days") || 30), 1), 90);
  const desde = new Date(Date.now() - dias * 86400000).toISOString().slice(0, 10);

  const uno = async (sql, ...args) => {
    const r = await env.DB.prepare(sql).bind(...args).all();
    return (r.results && r.results[0]) || {};
  };
  const varios = async (sql, ...args) => {
    const r = await env.DB.prepare(sql).bind(...args).all();
    return r.results || [];
  };

  const totales = await uno(
    `SELECT
       SUM(CASE WHEN kind='pv' THEN 1 ELSE 0 END) AS pageviews,
       COUNT(DISTINCT CASE WHEN kind='pv' THEN visitor END) AS visitantes,
       COUNT(DISTINCT session) AS sesiones,
       ROUND(AVG(CASE WHEN kind='lv' THEN value END), 1) AS seg_medios,
       COUNT(DISTINCT day) AS dias
     FROM hits WHERE day >= ?`,
    desde
  );

  const paises = await varios(
    `SELECT country AS pais, COUNT(DISTINCT visitor) AS visitantes,
            SUM(CASE WHEN kind='pv' THEN 1 ELSE 0 END) AS pageviews
     FROM hits WHERE day >= ?
     GROUP BY country ORDER BY visitantes DESC LIMIT 20`,
    desde
  );

  const paginas = await varios(
    `SELECT path AS pagina,
            SUM(CASE WHEN kind='pv' THEN 1 ELSE 0 END) AS pageviews,
            COUNT(DISTINCT CASE WHEN kind='pv' THEN visitor END) AS visitantes,
            ROUND(AVG(CASE WHEN kind='lv' THEN value END), 1) AS seg_medios
     FROM hits WHERE day >= ? AND kind IN ('pv','lv')
     GROUP BY path ORDER BY pageviews DESC LIMIT 20`,
    desde
  );

  const eventos = await varios(
    `SELECT name AS evento, COUNT(*) AS veces, COUNT(DISTINCT session) AS sesiones
     FROM hits WHERE day >= ? AND kind='ev' AND name IS NOT NULL
     GROUP BY name ORDER BY veces DESC LIMIT 20`,
    desde
  );

  const diario = await varios(
    `SELECT day AS dia,
            SUM(CASE WHEN kind='pv' THEN 1 ELSE 0 END) AS pageviews,
            COUNT(DISTINCT CASE WHEN kind='pv' THEN visitor END) AS visitantes
     FROM hits WHERE day >= ? GROUP BY day ORDER BY day`,
    desde
  );

  return json({
    rango_dias: dias,
    desde,
    totales,
    paises,
    paginas,
    eventos,
    diario,
  });
}

/* ------------------------------------------------------------------ helpers */

function permitido(origen, env) {
  const lista = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return lista.includes(origen);
}

function conCors(request, env, respuesta) {
  const origen = request.headers.get("Origin") || "";
  const cabeceras = new Headers(respuesta.headers);
  if (origen && permitido(origen, env)) {
    cabeceras.set("Access-Control-Allow-Origin", origen);
    cabeceras.set("Vary", "Origin");
  }
  cabeceras.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  cabeceras.set("Access-Control-Allow-Headers", "Content-Type");
  cabeceras.set("Access-Control-Max-Age", "86400");
  return new Response(respuesta.body, {
    status: respuesta.status,
    headers: cabeceras,
  });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function hash(texto, largo) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, largo);
}

/** Comparación en tiempo constante (evita filtrar la clave por timing). */
function igualSeguro(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) {
    return false;
  }
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}
