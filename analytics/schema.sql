-- Vectopen Analytics — esquema D1 (SQLite)
-- Aplicar:  wrangler d1 execute vectopen-analytics --file=schema.sql --remote

CREATE TABLE IF NOT EXISTS hits (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  ts      INTEGER NOT NULL,             -- epoch ms
  day     TEXT    NOT NULL,             -- YYYY-MM-DD (UTC)
  kind    TEXT    NOT NULL,             -- 'pv' visita | 'ev' evento | 'lv' salida (tiempo)
  path    TEXT    NOT NULL,             -- ruta de la página
  name    TEXT,                         -- nombre del evento (scroll50, download...)
  value   REAL,                         -- % de scroll o segundos en página
  country TEXT,                         -- ISO-2 de la cabecera CF (nunca IP)
  visitor TEXT    NOT NULL,             -- hash diario (IP+UA+sal), 16 hex
  session TEXT    NOT NULL,             -- id aleatorio de pestaña (sessionStorage)
  ua      TEXT                          -- user-agent truncado
);

CREATE INDEX IF NOT EXISTS idx_hits_day      ON hits(day);
CREATE INDEX IF NOT EXISTS idx_hits_day_kind ON hits(day, kind);
CREATE INDEX IF NOT EXISTS idx_hits_path     ON hits(day, path);
CREATE INDEX IF NOT EXISTS idx_hits_visitor  ON hits(day, visitor);

-- Retención: borrar crudo de más de 400 días (agregados se conservan aparte
-- si algún día se añade tabla de rollup). Ejecutable a mano o con cron.
-- DELETE FROM hits WHERE day < date('now', '-400 day');
