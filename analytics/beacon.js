/**
 * Vectopen Analytics — beacon (~1,3 KB, sin cookies, sin dependencias).
 *
 * Uso:
 *   <script defer src="assets/va.js"
 *           data-endpoint="https://vectopen-analytics.TUCUENTA.workers.dev"></script>
 *
 * Mide: pageview, tiempo en página (al salir/ocultar), scroll 50/90 %,
 * clics en descargas y salidas externas. Respeta DNT y la clave
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
      /* sin red: no pasa nada */
    }
  }

  enviar("pv");

  var inicio = Date.now();
  var cerrado = false;
  function salir() {
    if (cerrado) return;
    cerrado = true;
    enviar("lv", null, Math.round((Date.now() - inicio) / 1000));
  }
  addEventListener("pagehide", salir);
  addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") salir();
  });

  var marcas = {};
  function porcentaje() {
    var h = document.documentElement;
    var total = h.scrollHeight - h.clientHeight;
    if (total <= 0) return 100;
    return Math.min(100, Math.round((h.scrollTop / total) * 100));
  }
  addEventListener(
    "scroll",
    function () {
      var p = porcentaje();
      [50, 90].forEach(function (hito) {
        if (p >= hito && !marcas[hito]) {
          marcas[hito] = true;
          enviar("ev", "scroll" + hito, hito);
        }
      });
    },
    { passive: true }
  );

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
