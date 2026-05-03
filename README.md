# brendangriffen.com

Source for [brendangriffen.com](https://www.brendangriffen.com).

## Stack

- **[Hugo](https://gohugo.io/)** (extended) — static site generator. Pinned to `0.154.5` via Vercel env var.
- **[PaperMod](https://github.com/adityatelange/hugo-PaperMod)** — theme, vendored as a git submodule under `themes/PaperMod`.
- **[Vercel](https://vercel.com/)** — hosting, CDN, SSL.
- **[PostHog](https://posthog.com/)** — product analytics (pageviews, autocapture, web vitals, sessions). Production only.
- **[Sentry](https://sentry.io/)** — client-side error tracking. Production only.

## Local development

```sh
git clone --recurse-submodules git@github.com:bgriffen/brendangriffen.com.git
cd brendangriffen.com
hugo server -D
```

If you forgot `--recurse-submodules` on clone:

```sh
git submodule update --init --recursive
```

`hugo server` runs with `hugo.Environment == "development"`, which skips the PostHog and Sentry script tags so local browsing doesn't pollute production analytics.

## Layout

```
config.yml                       Hugo site config
content/                         Markdown for pages and posts
  about.md
  code.md
  posts/
  assets/                        Images referenced from content + project cards
layouts/
  partials/
    extend_head.html             Analytics + math, gated to production
    home_info.html               Homepage hero block
    math.html                    KaTeX loader (only on math: true pages)
  shortcodes/
    projectcards.html            Renders config.yml params.projectcards
static/
  js/posthog.js                  PostHog loader (kept out of Hugo's JS minifier)
  llms.txt                       Context for LLM crawlers
  robots.txt
themes/PaperMod                  Submodule
vercel.json                      Vercel build config
```

## Deployment

Pushes to `master` deploy automatically via Vercel.

Vercel project env vars:

| Key | Value |
|---|---|
| `HUGO_VERSION` | `0.154.5` |

The `vercel.json` build command runs `git submodule update --init --recursive && hugo --gc --minify`.

## Adding a project card

Edit `params.projectcards` in `config.yml`. Each card needs:

```yaml
- title: "name"
  image: "assets/name.jpg"          # add to content/assets/
  description: "..."
  url: "https://..."
  topic: "biotech|geospatial|astro|hardware"
  tags: ["python", "..."]
```

The `code.md` page filters cards by topic via the `projectcards` shortcode.

## Updating the theme

```sh
cd themes/PaperMod
git pull origin master
cd ../..
git add themes/PaperMod
git commit -m "Bump PaperMod"
```
