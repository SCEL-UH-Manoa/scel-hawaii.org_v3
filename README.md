# SCEL website

Source for [scel-hawaii.org](https://scel-hawaii.org), the Smart Campus Energy Lab at UH Manoa.
Built with [Eleventy](https://www.11ty.dev/) (Node.js). No Ruby needed.

## Run it locally

You need Node.js 18 or newer (`node -v`). Install it with [nvm](https://github.com/nvm-sh/nvm) if you don't have it.

```bash
npm install
npm start          # dev server at http://localhost:8080 with live reload
npm run build      # writes the finished site to _site/
```

## Where things live

| To change...                    | Edit...                                   |
| ------------------------------- | ----------------------------------------- |
| Navigation links                | `src/_data/nav.yml`                       |
| Homepage photo slider           | `src/_data/slider.yml`                    |
| Research projects and papers    | `src/_data/projects.yml`                  |
| Sponsors                        | `src/_data/affiliates.yml`                |
| Members (people and alumni)     | `src/_data/members.json`                  |
| Contact info, address, email    | `src/_data/site.json`                     |
| A page (About, Contact, ...)    | `src/pages/*.md`                          |
| A news post                     | add `src/posts/YYYY-MM-DD-title.md`       |
| Colors, fonts, layout           | `src/css/site.css` (tokens at the top)    |
| Page templates                  | `src/_includes/layouts/*.liquid`          |

A new post needs this at the top:

```yaml
---
title: "Our post title"
date: 2026-10-21T10:00:00-10:00
categories: [announcement]
---
```

Members: set `role` to `Advisor`, `Leader`, `Mentor`, `Student` (current members) or `Inactive` (alumni).
People with an empty `role` are hidden.

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
One-time setup: in the repo go to **Settings > Pages** and set **Source** to **GitHub Actions**.
The old `gh-pages` branch and `deploy.sh` are no longer used. `src/CNAME` keeps the custom domain.

## Notes

- Old URLs are preserved (`/about/`, `/members/`, `/people/<name>.html`, and posts at their original dated paths).
- Member photos, sponsor logos and the first homepage slide are linked from external sites. If one goes dead it
  hides itself (members fall back to initials), but it's worth replacing them with files in `src/assets/`.
- Fonts (Archivo and Public Sans) are bundled in `src/fonts/`, so the site makes no calls to Google.
