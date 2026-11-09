#!/usr/bin/env python3
"""Pone en web/index.html los enlaces y el número de la última versión de
Vectopen publicada en GitHub (incluye betas). La página ya los cambia con
JavaScript al cargar (assets/downloads.js); esto actualiza los enlaces FIJOS
del HTML, que son los que ven los buscadores, quien navega sin JavaScript y
quien llega cuando la API de GitHub no responde.

Uso: python3 .github/scripts/sync_release.py   (GH_TOKEN opcional)
Sale con código 0 y escribe «changed=true|false» en $GITHUB_OUTPUT.
"""
import json
import os
import re
import sys
import urllib.request

REPO = "malabo1990/-Vectopen"
INDEX = "web/index.html"


def latest_release():
    req = urllib.request.Request(
        f"https://api.github.com/repos/{REPO}/releases?per_page=10",
        headers={"Accept": "application/vnd.github+json", "User-Agent": "vectopen-web-sync"},
    )
    tok = os.environ.get("GH_TOKEN")
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    with urllib.request.urlopen(req, timeout=30) as r:
        for rel in json.load(r):
            if not rel.get("draft") and rel.get("assets"):
                return rel
    return None


def main() -> int:
    rel = latest_release()
    if rel is None:
        print("No hay ninguna versión publicada con archivos.")
        return 0
    tag = rel["tag_name"]
    assets = {a["name"]: a["browser_download_url"] for a in rel["assets"]}
    html = open(INDEX, encoding="utf-8").read()
    before = html

    def fix_link(m):
        suffix, url = m.group(2), m.group(4)
        for name, link in assets.items():
            if name.endswith(suffix):
                return m.group(1) + suffix + m.group(3) + link + m.group(5)
        return m.group(0)

    # <a ... data-asset="SUFIJO" href="URL">
    html = re.sub(r'(data-asset=")([^"]+)("[^>]*?href=")([^"]+)(")', fix_link, html)
    html = re.sub(r"(<b data-dl-version>)[^<]*(</b>)", rf"\g<1>{tag}\g<2>", html)
    html = re.sub(r"(<span data-dl-version-plain>)[^<]*(</span>)", rf"\g<1>{tag.lstrip('v')}\g<2>", html)
    html = re.sub(r'("softwareVersion": ")[^"]*(")', rf"\g<1>{tag.lstrip('v')}\g<2>", html)
    changed = html != before
    if changed:
        open(INDEX, "w", encoding="utf-8").write(html)
    print(f"Última versión: {tag} · cambios en index.html: {changed}")
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a") as f:
            f.write(f"changed={'true' if changed else 'false'}\ntag={tag}\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
