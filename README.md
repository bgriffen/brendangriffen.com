<div align="center">

# brendangriffen.com

[**brendangriffen.com**](https://www.brendangriffen.com) · [about](https://www.brendangriffen.com/about/) · [code](https://www.brendangriffen.com/code/) · [blog](https://www.brendangriffen.com/posts/)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.brendangriffen.com&up_message=online&up_color=brightgreen&down_message=down&down_color=red&label=brendangriffen.com&style=flat-square)](https://www.brendangriffen.com)
[![Last Commit](https://img.shields.io/github/last-commit/bgriffen/brendangriffen.com?style=flat-square&label=last%20commit)](https://github.com/bgriffen/brendangriffen.com/commits/master)
[![Hugo](https://img.shields.io/badge/Hugo-0.154.5-FF4088?style=flat-square&logo=hugo&logoColor=white)](https://gohugo.io)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![Analytics: PostHog](https://img.shields.io/badge/analytics-PostHog-1D4AFF?style=flat-square&logo=posthog&logoColor=white)](https://posthog.com)
[![Errors: Sentry](https://img.shields.io/badge/errors-Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)](https://sentry.io)

</div>

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Static site generator | [Hugo](https://gohugo.io/) (extended) | Pinned via Vercel env var |
| Theme | [PaperMod](https://github.com/adityatelange/hugo-PaperMod) | Vendored as a git submodule under `themes/PaperMod` |
| Hosting | [Vercel](https://vercel.com/) | CDN, SSL, preview deploys per PR |
| Analytics | [PostHog](https://posthog.com/) | Pageviews, autocapture, web vitals, sessions — production only |
| Error tracking | [Sentry](https://sentry.io/) | Client-side JS errors via CDN loader — production only |
| Math | [KaTeX](https://katex.org/) | Loaded only on pages with `math: true` |

---

## Quickstart

```sh
git clone --recurse-submodules git@github.com:bgriffen/brendangriffen.com.git
cd brendangriffen.com
hugo server -D
```

Forgot `--recurse-submodules`? Recover with:

```sh
git submodule update --init --recursive
```

> `hugo server` runs as `hugo.Environment == "development"`. The PostHog and Sentry script tags are gated to production, so local browsing won't pollute analytics or trigger Sentry alerts.

---

## Project layout

```
.
├── config.yml                    # Hugo site config
├── vercel.json                   # Vercel build config
├── content/
│   ├── about.md
│   ├── code.md
│   ├── posts/                    # Blog posts
│   └── assets/                   # Images referenced from content + project cards
├── layouts/
│   ├── partials/
│   │   ├── extend_head.html      # Analytics + math, production-gated
│   │   ├── home_info.html        # Homepage hero block
│   │   └── math.html             # KaTeX loader
│   └── shortcodes/
│       └── projectcards.html     # Renders config.yml params.projectcards
├── static/
│   ├── js/posthog.js             # PostHog loader (kept out of Hugo's JS minifier)
│   ├── llms.txt                  # Context for LLM crawlers
│   └── robots.txt
└── themes/
    └── PaperMod                  # Submodule → adityatelange/hugo-PaperMod
```

---

## Deployment

Every push to `master` triggers an automatic Vercel deploy. PRs get preview URLs.

**Required Vercel env vars:**

| Key | Value | Purpose |
|---|---|---|
| `HUGO_VERSION` | `0.154.5` | Pins Hugo to a known-good version (Vercel's default is older) |

Build command (from `vercel.json`):

```sh
git submodule update --init --recursive && hugo --gc --minify
```

---

## Authoring

### Add a project card

Project cards on `/code` are driven by `params.projectcards` in `config.yml`. Add an entry:

```yaml
- title: "name"
  image: "assets/name.jpg"          # also drop the file into content/assets/
  description: "What it does and why it exists."
  url: "https://github.com/..."
  topic: "biotech"                   # biotech | geospatial | astro | hardware
  tags: ["python", "machine learning"]
```

`content/code.md` filters cards by topic with the `projectcards` shortcode.

### Add a blog post

```sh
hugo new posts/my-post.md
```

Set `draft: false` in the frontmatter when ready to publish.

### Bump the theme

```sh
cd themes/PaperMod
git pull origin master
cd ../..
git add themes/PaperMod
git commit -m "Bump PaperMod"
```

---

## Privacy & analytics

PostHog and Sentry both load **only in production builds**. Anything you do running `hugo server` locally stays local. Both services use public DSNs/project tokens that are designed to ship in browser HTML — no secrets in this repo.

---

<div align="center">

Built with [Hugo](https://gohugo.io) · Deployed on [Vercel](https://vercel.com) · Source on [GitHub](https://github.com/bgriffen/brendangriffen.com)

</div>
