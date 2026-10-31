/**
 * Vectopen Analytics — beacon (~2 KB, sin cookies, sin dependencias).
 *
 * Uso:
 *   <script defer src="assets/va.js"
 *           data-endpoint="https://vectopen-analytics.TUCUENTA.workers.dev"></script>
 *
 * Mide: pageview, tiempo en página (latido cada 15 s + al salir), scroll
 * 50/90 %, clics en descargas y salidas externas. Respeta DNT y la clave
 * localStorage 'vectopen-no-analytics'.
 */
(function () {
  var s = document.currentScript;
  var ep = s && s.getAttribute("data-endpoint");
  if (!ep) return;

  try {
    if (navigator.doNotTrack === "1" || localStorage.getItem("vectopen-no-analytics") === "1") return;
  } catch (e) {
    /* almacenamiento bloqueado: seguimos sin preferencias */
  }

  var sid;
  try {
    sid = sessionStorage.getItem("va.s");
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("va.s", sid);
    }
  } catch (e) {
    sid = "anon";
  }

  function enviar(k, n, v) {
    var cuerpo = JSON.stringify({
      k: k,
      p: location.pathname,
      n: n || null,
      v: v == null ? null : v,
      s: sid,
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ep + "/c", new Blob([cuerpo], { type: "text/plain;charset=UTF-8" }));
        return;
      }
    } catch (e) {
      /* cae a fetch */
    }
    try {
      fetch(ep + "/c", {
        method: "POST",
        body: cuerpo,
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        keepalive: true,
        mode: "cors",
      });
    } catch (e) {
      /* sin red */
    }
  }

  enviar("pv");

  // ── tiempo en página ─────────────────────────────────────────────────────
  // Se envía el tiempo ACUMULADO (segundos): el servidor usa el máximo por
  // sesión, así el latido y el cierre no inflan la media.
  var inicio = Date.now();
  var ultimo = 0;
  function segundos() {
    var t = Math.round((Date.now() - inicio) / 1000);
    return t > ultimo ? t : 0;
  }
  function latir() {
    var t = segundos();
    if (t <= ultimo) return;
    ultimo = t;
    enviar("lv", null, t);
  }
  setInterval(latir, 15000);
  addEventListener("pagehide", latir);
  addEventListener("beforeunload", latir);
  addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") latir();
  });

  // ── scroll ───────────────────────────────────────────────────────────────
  var marcas = {};
  function porcentaje(e) {
    var t = e && e.target;
    // scroll en un contenedor interno (muchas landings) o en el documento
    if (t && t.nodeType === 1 && t !== document.documentElement && t !== document.body && t.scrollHeight > t.clientHeight) {
      var r = t.scrollHeight - t.clientHeight;
      return r > 0 ? Math.min(100, Math.round((t.scrollTop / r) * 100)) : 100;
    }
    var alto = Math.max(
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    );
    var visible = window.innerHeight || document.documentElement.clientHeight;
    var total = alto - visible;
    if (total <= 0) return 100;
    var y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    return Math.min(100, Math.round((y / total) * 100));
  }
  // capture: los eventos scroll no burbujean, pero sí pasan por la fase de captura
  addEventListener(
    "scroll",
    function (e) {
      var p = porcentaje(e);
      if (p >= 50 && !marcas[50]) {
        marcas[50] = true;
        enviar("ev", "scroll50", 50);
      }
      if (p >= 90 && !marcas[90]) {
        marcas[90] = true;
        enviar("ev", "scroll90", 90);
      }
    },
    { passive: true, capture: true }
  );

  // ── clics ────────────────────────────────────────────────────────────────
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      if (/releases|\.(zip|dmg|deb|rpm|tar\.gz|exe|appimage)$/i.test(href)) {
        enviar("ev", "download");
      } else if (a.host && a.host !== location.host) {
        enviar("ev", "outbound");
      }
    },
    true
  );
})();
