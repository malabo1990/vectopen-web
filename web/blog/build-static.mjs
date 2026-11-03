// Pre-renders the blog into plain HTML so it can be read WITHOUT JavaScript
// (search engines, AI assistants, link previews, readers with JS off).
//   · blog/index.html  → the post list is written into <div id="posts">
//   · blog/<slug>.html → one full page per post (title, description, canonical,
//                        Open Graph), built from post.html with the article inside
//   · sitemap.xml      → blog entries point to those pages
// In a browser nothing changes: blog.js re-renders in the visitor's language.
//
// Run (needs `marked`):  npm i --no-save marked@12 && node web/blog/build-static.mjs
// Run by .github/workflows/deploy-pages.yml before publishing; the generated
// files are NOT committed.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { marked } from "marked";

const BLOG = "web/blog";
const SITE = "https://malabo1990.github.io/vectopen-web";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function frontmatter(txt) {
  const m = /^﻿?---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/.exec(txt);
  if (!m) return { meta: {}, body: txt };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, "");
    meta[kv[1]] = v;
  }
  return { meta, body: txt.slice(m[0].length) };
}

const fmtDate = (d) => {
  const t = new Date(d + "T00:00:00Z");
  return isNaN(t) ? d : t.toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
};

const posts = JSON.parse(await readFile(join(BLOG, "posts.json"), "utf8")).filter((p) => p && p.slug && !p.draft);

// 1) Post list inside blog/index.html
let index = await readFile(join(BLOG, "index.html"), "utf8");
const listHtml = posts.map((p) =>
  `<a class="post-row" href="${esc(p.slug)}.html"><time>${esc(fmtDate(p.date))}</time>` +
  `<h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>` +
  ((p.tags || []).length ? `<div class="tags">${p.tags.map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("")}</div>` : "") +
  `</a>`).join("\n");
index = index.replace(/<div id="posts">[\s\S]*?<\/div>(\s*<p id="empty")/, `<div id="posts">\n${listHtml}\n</div>$1`);
await writeFile(join(BLOG, "index.html"), index);

// 2) One static page per post (also the drafts that only redirect: they keep working)
const template = await readFile(join(BLOG, "post.html"), "utf8");
const all = JSON.parse(await readFile(join(BLOG, "posts.json"), "utf8"));
for (const p of all) {
  const { meta, body } = frontmatter(await readFile(join(BLOG, "posts", p.slug + ".md"), "utf8"));
  const title = meta.title || p.slug;
  const desc = meta.summary || "";
  const url = `${SITE}/blog/${p.slug}.html`;
  const head =
    `<title>${esc(title)} — Vectopen Blog</title>\n` +
    `<meta name="description" content="${esc(desc)}">\n` +
    `<link rel="canonical" href="${url}">\n` +
    `<meta property="og:type" content="article">\n<meta property="og:title" content="${esc(title)}">\n` +
    `<meta property="og:description" content="${esc(desc)}">\n<meta property="og:url" content="${url}">\n` +
    `<meta property="og:image" content="${SITE}/logo.png">\n<meta name="twitter:card" content="summary">\n` +
    `<meta name="twitter:site" content="@malabo_6">\n` +
    `<meta property="article:published_time" content="${esc(meta.date || "")}">\n` +
    `<script>window.VECTOPEN_POST=${JSON.stringify(p.slug)}</script>`;
  const tags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [];
  let html = template
    .replace(/<title>[^<]*<\/title>\s*<meta name="description"[^>]*>/, head)
    .replace(/<p class="post-meta" id="pmeta"><\/p>/, `<p class="post-meta" id="pmeta">${esc(fmtDate(meta.date || ""))}</p>`)
    .replace(/<div id="pbody">[\s\S]*?<\/div>(\s*<div class="post-tags")/,
      `<div id="pbody"><h1>${esc(title)}</h1>\n${marked.parse(body, { gfm: true, breaks: false })}</div>$1`)
    .replace(/<div class="post-tags" id="ptags"><\/div>/, `<div class="post-tags" id="ptags">${tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`);
  await writeFile(join(BLOG, p.slug + ".html"), html);
}

// 3) Sitemap → static pages
const smPath = "web/sitemap.xml";
let sm = await readFile(smPath, "utf8");
sm = sm.replace(/blog\/post\.html\?p=([\w-]+)/g, "blog/$1.html");
await writeFile(smPath, sm);

console.log(`static blog: ${posts.length} posts listed, ${all.length} pages`);
