# vectopen-web

The public website for [Vectopen](https://github.com/malabo1990/-Vectopen) — landing page, blog, and user manual. Published to GitHub Pages from this repo; the app's source code lives in the main `-Vectopen` repository.

```
vectopen-web/
├── web/            landing page + blog (static HTML/CSS/JS, see web/README.md)
├── analytics/      colector de visitas (Cloudflare Worker + D1, sin cookies)
├── docs/           user manual content (Markdown, EN default + *.es.md translations)
├── mkdocs.yml      MkDocs Material config for the manual
└── requirements.txt
```

Live layout once deployed:

- `/` — the landing page (`web/`)
- `/docs/` — the user manual, built with MkDocs (`/docs/es/` for Spanish)

## Analytics

`analytics/` contiene el colector propio de la web (Cloudflare Worker + D1):
visitas, visitantes únicos, **país**, **tiempo en página** e interacciones
(scroll, descargas, salidas), sin cookies ni IPs almacenadas.

Ver [analytics/README.md](analytics/README.md) para despliegue y consultas.

## Working on the landing page / blog

See **[web/README.md](web/README.md)** — no build step, plain HTML/CSS/JS, includes the Decap CMS blog workflow.

## Working on the docs

```bash
pip install -r requirements.txt
mkdocs serve      # http://127.0.0.1:8000, live reload
```

Add a page under `docs/`, reference it in `mkdocs.yml`'s `nav:`, and add its Spanish translation as `same-name.es.md` right next to it (see `mkdocs-static-i18n`'s suffix convention — no separate nav entry needed).

## Deployment

`.github/workflows/deploy-pages.yml` builds the manual and combines it with `web/` on every push to `main`, then publishes the result to GitHub Pages (Settings → Pages → Source: **GitHub Actions**). `.github/workflows/blog-manifest.yml` regenerates `web/blog/posts.json` whenever a post changes.
