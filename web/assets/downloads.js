/* Vectopen site — descargas directas.
   1) Resalta la tarjeta del sistema del visitante (Windows / macOS / Linux).
   2) Pregunta a GitHub cuál es la versión más reciente (incluye alfas/betas)
      y cambia los enlaces y el número de versión. Si GitHub no responde, se
      quedan los enlaces fijos del HTML (que ya apuntan a una versión real). */
(function () {
  "use strict";
  var REPO = "malabo1990/-Vectopen";

  function detectOS() {
    var p = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || "").toLowerCase();
    if (p.indexOf("win") >= 0) return "windows";
    if (p.indexOf("mac") >= 0 || p.indexOf("iphone") >= 0 || p.indexOf("ipad") >= 0) return "mac";
    if (p.indexOf("linux") >= 0 || p.indexOf("x11") >= 0) return "linux";
    return "";
  }

  function markOS() {
    var os = detectOS();
    if (!os) return;
    var card = document.querySelector('.dl[data-os="' + os + '"]');
    if (card) card.classList.add("you");
  }

  function applyRelease(rel) {
    if (!rel || !rel.assets || !rel.assets.length) return;
    var tag = rel.tag_name || "";
    document.querySelectorAll("a[data-asset]").forEach(function (a) {
      var suffix = a.getAttribute("data-asset");
      for (var i = 0; i < rel.assets.length; i++) {
        var as = rel.assets[i];
        if (as.name.slice(-suffix.length) === suffix) {
          a.href = as.browser_download_url;
          break;
        }
      }
    });
    if (tag) {
      document.querySelectorAll("[data-dl-version]").forEach(function (el) { el.textContent = tag; });
      document.querySelectorAll("[data-dl-version-plain]").forEach(function (el) { el.textContent = tag.replace(/^v/, ""); });
    }
  }

  function fetchLatest() {
    if (!window.fetch) return;
    // /releases (no /latest): /latest ignora las versiones marcadas como alfa.
    fetch("https://api.github.com/repos/" + REPO + "/releases?per_page=5", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) {
        for (var i = 0; i < list.length; i++) {
          if (!list[i].draft && list[i].assets && list[i].assets.length) { applyRelease(list[i]); return; }
        }
      })
      .catch(function () { /* sin red: se quedan los enlaces del HTML */ });
  }

  function init() { markOS(); fetchLatest(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
