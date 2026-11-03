---
title: "Vectopen 0.2.1-beta: ten real jobs, and the app now updates itself"
date: 2026-11-03
summary: "We used Vectopen the way a designer would: a book, a magazine, an A1 poster, a logo, a business card… 26 defects came up; 19 are already fixed. Plus: update alerts with one-click download and install, a Reddit community, and automatic releases for Windows, macOS and Linux."
tags: [release, testing, export, updates, community]
draft: false
---

After [0.2.0-alpha](./post.html?p=2026-10-vectopen-0-2-0-alpha) the question
was no longer *does every button work?* but *can a designer finish a real job
with Vectopen?* To answer it I stopped testing features one by one and started
doing **complete jobs**, start to finish, the way a professional would. The
result is **0.2.1-beta**.

**[Download 0.2.1-beta &rarr;](https://github.com/malabo1990/-Vectopen/releases/tag/v0.2.1-beta)**
&nbsp;Windows (.zip) · macOS universal (.dmg / .zip) · Linux (.deb, .rpm, .tar.gz)

![The 0.2.1-beta splash screen](../media/shots/splash_0_2_1.webp)

## Ten jobs, start to finish

Each job is real work done in its main interface (Smart, Modern or Pro), with
real clicks where practical: exact format, layers, text, export to PNG/SVG/PDF
and compare with the screen, 20 undo steps, save, close and reopen with nothing
lost, light and dark theme.

| # | Job | Interface | Result |
|---:|---|---|---|
| 1 | 20-page book | Pro | Passed |
| 2 | 8-page magazine | Pro | Passed |
| 3 | A1 poster | Smart | Passed |
| 4 | Social media flyer (1080 × 1350) | Modern | Passed |
| 5 | Logo with variants | Pro | Passed |
| 6 | Ring logo mark | Smart | Passed |
| 7 | Business card | Modern | Passed |
| 8 | Data infographic | Pro | Passed |
| 9 | Visual encyclopedia (12 cards) | Pro | Passed |
| 10 | App UI kit | Modern | Waiting on two new features |

Every job stays as an automated test: if something breaks tomorrow, the job
fails and I see it before you do.

## What they found (and what's fixed)

The jobs uncovered **26 defects** that feature-by-feature tests never saw:
**19 are already fixed**, 5 are minor details still on the list, and 2 are
really new features (below). The most important:

- **PDFs came out 33 % too large.** Pixels were written as points, so an A4 was
  not an A4. PDF and EPS now have the exact physical size.
- **Print bleed.** A business card PDF came out at trim size. It now carries the
  page bleed and the `TrimBox`/`BleedBox` a print shop expects.
- **Solid logos.** Turning a subtract with a hole (the "O" of a logo) into a path
  lost the hole. It's now kept on screen, on export and on reopen.
- **Masks in SVG/PDF.** A photo inside a circle mask vanished in vector exports.
  It now comes out clipped by the circle.
- **Lost arrowheads.** Stroke arrowheads never reached SVG, PDF or EPS.
- **Invisible shadows.** Some programs dropped shadowed objects from an exported
  SVG; the shadow is now written in a form every reader understands.
- **Duplicating pages** shrank the titles on the copy and collapsed paragraphs
  into one line.
- **The Pages grid view** arranged the thumbnails but not the canvas: twelve
  cards stayed in one endless row. The canvas is now arranged in rows too.
- **Blurry text** in 3× PNG exports when it wasn't on screen.
- **Centering text in a button** didn't center it: the text's editing box was
  used instead of what you actually see.
- Automatic page numbers (`{pág}` / `{total}`), a page grid (margins, columns,
  gutter, bleed) saved with the document, A0–A2 sizes and more.

![Twelve cards in the grid view, arranged on the canvas too](../media/shots/fichas_rejilla.webp)

## Vectopen tells you when there's a new version

Clicking the Vectopen logo opens a new window with your version, credits,
community and **updates**:

- On start-up (once a day, and you can turn it off) Vectopen checks GitHub for a
  new version. If there is one, a **red dot** appears on the logo.
- **Download and install** fetches the package for your system with a progress
  bar. On Linux (Fedora, Ubuntu…) it installs it, asking for your password in
  the system dialog, and offers to **restart**; on Windows and macOS it opens
  the installer.

![The logo window: community and updates](../media/shots/about_update_dark.webp)

Behind it there's a *GitHub Action*: every time I push a version tag, it builds
Vectopen on Windows, macOS and Linux, packages it and creates the release. Every
version comes out the same on all three systems, and the app finds it by itself.

## Community: now on Reddit too

Besides [Telegram](https://t.me/vectopen) and
[GitHub](https://github.com/malabo1990/-Vectopen), Vectopen now has a community
on **[Reddit: r/Vectopen_editor](https://www.reddit.com/r/Vectopen_editor/)**.
It's the best place to show what you make, ask for features and talk about
releases.

## What's still missing

The tenth job, an **app UI kit**, made clear what interface design still needs:

- **Linked components:** change the master button and every copy updates. Today
  the Assets tab places independent copies.
- **Named text styles** (heading, body, caption) applied and updated in one go.

Those are the two headline features of **0.2.2**.

Other notes on this beta:

- On **Intel Macs**, Vectopen works but without the AI vectorizer (the library
  it uses doesn't exist for Intel). On Apple Silicon it's complete.
- Still unsigned: Windows and macOS will show the "unknown developer" warning.

## Help keep it going

Vectopen is made by one person, with no company, no account, no telemetry and
no paid tier. You can support it on
**[GitHub Sponsors](https://github.com/sponsors/malabo1990)**, or help just as
much by trying the beta and reporting what breaks on
[Reddit](https://www.reddit.com/r/Vectopen_editor/),
[Telegram](https://t.me/vectopen) or
[GitHub](https://github.com/malabo1990/-Vectopen/issues).

Thanks for reading — and if you make something with Vectopen, show it on
r/Vectopen_editor.
