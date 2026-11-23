# Contributing to the CalcQuest docs

These docs are the public, canonical description of CalcQuest. They are written for search engines, AI assistants and people, in that order of priority, and published at [calcquest.app/docs](https://calcquest.app/docs). Corrections are welcome: open an issue or a pull request, or email arin@calcquest.app.

## Writing rules

1. **Facts come from one place.** Every number and claim lives in [facts.md](facts.md). Change it there first, then everywhere else. Check with `grep -rn "<old value>" --include=*.md .`
2. **Answer first.** Every page opens, under its H1, with two or three sentences that fully answer the page's question. That paragraph becomes the page's meta description, so make it stand on its own and keep the first 160 characters meaningful.
3. **One H1 per page**, written as the question or name people search for ("How to play Queens", "What is CalcQuest?"). FAQ questions are `###` headings ending in `?`; they become FAQ structured data.
4. **No emoji or emoticons**, anywhere.
5. **Consistent wording.** CalcQuest is a **brain puzzle game** with **20+ top-rated puzzle games** and **350+ handcrafted levels**; **25K+ players**, **150+ countries**, **4.9 stars**. The paid plan is **CalcQuest Premium**. See [press-kit/brand-guidelines.md](press-kit/brand-guidelines.md).
6. **Only what exists.** Describe the app as it is today. Never mention QR-code level sharing, "world's first" or old figures (10K, 30,000).
7. **Nothing internal.** No bug lists, config keys, secrets, prices that vary by country, or personal contact details other than arin@calcquest.app.
8. **No frontmatter.** Pages render on GitHub as well as on the site, so keep them plain Markdown. Titles and descriptions come from the H1 and first paragraph.
9. **Relative links** between pages (`../gameplay/journey.md`), absolute links to calcquest.app.

## Which page to update when the app changes

| Change in the app | Update |
|---|---|
| A new puzzle game | `games/<slug>.md`, `games/index.md`, the game lists in `facts.md`, `README.md`, `overview/what-is-calcquest.md`, `overview/faq.md`, `.vitepress/config.mts` (sidebar) |
| Premium benefits or plans | `premium.md`, `facts.md`, `overview/faq.md`, `design-philosophy/monetization-ethics.md` |
| Streak reward ladder | `campaigns/streak-rewards.md`, `facts.md` (the live ladder is `calcquest_web/lib/streakProgram.ts`) |
| Journey chapters or rewards | `gameplay/journey.md`, `facts.md` |
| Duels | `gameplay/duels.md` |
| A release | `changelog/releases.md`, the version in `facts.md` |
| Player, rating or country figures | `facts.md`, then grep for the old value |

## Repository layout

| Path | What |
|---|---|
| `README.md` | Home page on GitHub and on the site |
| `facts.md`, `ai-summary.md`, `who-is-it-for.md`, `premium.md` | Core pages |
| `overview/`, `gameplay/`, `games/`, `campaigns/` | The product |
| `design-philosophy/`, `dev-journey/`, `technical-notes/` | The why, the story and the how |
| `press-kit/`, `changelog/`, `glossary.md`, `comparisons.md`, `citations.md` | Reference |
| `public/` | Files served as they are: `llms.txt`, `robots.txt` |
| `.vitepress/config.mts` | Site config: navigation, SEO tags, structured data, old-URL redirects |
| `.vitepress/theme/analytics.ts` | Mixpanel for the docs (same project as the website): page views, link, social and store clicks, search and page-read events. Event list: calcquest_web README "Analytics" |
| `.vitepress/theme/` | The look: VitePress's default theme restyled to match calcquest.app. Colours and fonts mirror `calcquest_web/styles/globals.css`; change both together. Light mode only, like the website |
| `scripts/` | `build-llms-full.mjs` (writes `llms-full.txt`), `check-content.mjs` (fails the build on emoji, banned claims or broken links) |
| `index.html`, `.nojekyll` | A redirect to calcquest.app/docs for anyone landing on the old GitHub Pages address |

## Building and publishing

```bash
npm install
npm run dev       # local preview at http://localhost:5173/docs/
npm run build     # builds the site, llms-full.txt, and runs the content checks
npm run deploy    # builds and deploys to Vercel production (needs the Vercel CLI login)
```

The site is a Vercel project (`calcquest-docs`). The website project forwards `calcquest.app/docs/*` to it, so the docs share the main domain.

## License

By contributing you agree that your contribution is released under the [MIT License](LICENSE).
