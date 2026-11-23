import { defineConfig, type HeadConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'

// The docs are served at https://calcquest.app/docs. The website (calcquest_web)
// forwards /docs/* to this project's Vercel deployment, so every URL, canonical
// link and sitemap entry uses the calcquest.app host.
const SITE = 'https://calcquest.app'
const BASE = '/docs/'
const DOCS_URL = SITE + BASE.replace(/\/$/, '')
const OG_IMAGE = SITE + '/site-preview.png'

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.calcquest.calculatorgame'
const APP_STORE_URL = 'https://apps.apple.com/app/id6757161847'

const games = {
  Math: [
    ['Calculator Classic', 'calculator-classic'],
    ['Calculator', 'calculator'],
    ['KenKen', 'kenken'],
    ['Math Grid', 'math-grid'],
    ['Quick Calculation', 'quick-calculation'],
    ['Math Pairs', 'math-pairs'],
    ['Correct Answer', 'correct-answer'],
  ],
  Logic: [
    ['Queens', 'queens'],
    ['Tango', 'tango'],
    ['Binairo', 'binairo'],
    ['Minesweeper', 'minesweeper'],
    ['Number Alchemy', 'number-alchemy'],
  ],
  Memory: [
    ['Flashback', 'flashback'],
    ['Simon Sequence', 'simon-sequence'],
    ['Magic Triangle', 'magic-triangle'],
    ['Rootdown', 'rootdown'],
    ['Mental Arithmetic', 'mental-arithmetic'],
  ],
  Puzzle: [
    ['Mini Sudoku', 'mini-sudoku'],
    ['Shikaku', 'shikaku'],
    ['Nonogram', 'nonogram'],
    ['Number Pyramid', 'number-pyramid'],
    ['Picture Puzzle', 'picture-puzzle'],
    ['1024 Twisted', '1024-twisted'],
  ],
} as const

const sectionNames: Record<string, string> = {
  overview: 'Overview',
  gameplay: 'Gameplay',
  games: 'Games',
  campaigns: 'Campaigns',
  'design-philosophy': 'Design philosophy',
  'dev-journey': 'Dev journey',
  'technical-notes': 'Technical notes',
  'press-kit': 'Press kit',
  changelog: 'Changelog',
}

/** Page URL (no trailing slash) for a source file such as "overview/faq.md". */
function pageUrl(relativePath: string): string {
  const p = relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '').replace(/\/$/, '')
  return p ? `${DOCS_URL}/${p}` : DOCS_URL
}

/** Plain text of a Markdown fragment: no links, emphasis or code marks. */
function plain(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** The first paragraph after the H1: every page opens with a direct answer. */
function firstParagraph(src: string): string {
  const lines = src.replace(/^---[\s\S]*?\n---\n/, '').split('\n')
  const h1 = lines.findIndex((l) => l.startsWith('# '))
  const para: string[] = []
  for (const line of lines.slice(h1 + 1)) {
    const t = line.trim()
    if (!t) {
      if (para.length) break
      continue
    }
    if (/^(#|\||>|-|\*|```|<|\d+\.)/.test(t)) {
      if (para.length) break
      continue
    }
    para.push(t)
  }
  return plain(para.join(' '))
}

function clip(text: string, max = 160): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…'
}

/** FAQPage entries from "### Question?" headings and the text under them. */
function faqEntries(src: string) {
  const out: { q: string; a: string }[] = []
  const parts = src.split(/\n### /).slice(1)
  for (const part of parts) {
    const [q, ...rest] = part.split('\n')
    const body = rest.join('\n').split(/\n#{2,3} /)[0]
    const a = plain(body.replace(/^\s*[-*]\s+/gm, ''))
    if (q.trim().endsWith('?') && a) out.push({ q: q.trim(), a })
  }
  return out
}

const founder = {
  '@type': 'Person',
  name: 'Arin Agrawal',
  jobTitle: 'Founder and developer of CalcQuest',
  url: `${SITE}/founder`,
  sameAs: ['https://x.com/ArinBuilds'],
  homeLocation: { '@type': 'Place', name: 'Madhya Pradesh, India' },
}

const organization = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'CalcQuest',
  url: SITE,
  logo: `${SITE}/logo.png`,
  email: 'arin@calcquest.app',
  founder,
  sameAs: [PLAY_URL, APP_STORE_URL, 'https://x.com/ArinBuilds', 'https://www.linkedin.com/company/calcquest', 'https://github.com/arinagrawal05/calcquest-docs'],
}

const application = {
  '@type': 'MobileApplication',
  name: 'CalcQuest',
  alternateName: 'CalcQuest: Brain Puzzle Games',
  description:
    'CalcQuest is a free brain puzzle game with 20+ top-rated puzzle games, 350+ handcrafted levels, a Journey map, a daily challenge and friend duels.',
  applicationCategory: 'GameApplication',
  genre: 'Brain puzzle game',
  operatingSystem: 'Android, iOS',
  url: SITE,
  image: OG_IMAGE,
  downloadUrl: [PLAY_URL, APP_STORE_URL],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: founder,
  publisher: { '@id': `${SITE}/#organization` },
  datePublished: '2024-09',
}

const ld = (data: object): HeadConfig => [
  'script',
  { type: 'application/ld+json' },
  JSON.stringify({ '@context': 'https://schema.org', ...data }),
]

// Old docsify links were https://arinagr.me/calcquest-docs/#/01_overview/faq.
// Anyone arriving with such a hash is sent to the matching clean URL.
const hashRedirect = `(function(){var h=location.hash;if(h.indexOf('#/')!==0)return;
var p=h.slice(2).split('?')[0].replace(/\\.md$/,'').replace(/^\\/+|\\/+$/g,'');
var m={'01_overview/keywords':'who-is-it-for','use-cases':'who-is-it-for','02_gameplay/puzzle-types':'games/',
'02_gameplay/difficulty-scaling':'gameplay/difficulty','README':''};
var t=(p in m)?m[p]:p.replace(/^0\\d_/,'');location.replace('${BASE}'+t);})();`

export default defineConfig({
  lang: 'en',
  title: 'CalcQuest Docs',
  titleTemplate: ':title | CalcQuest Docs',
  description:
    'Official documentation for CalcQuest, the free brain puzzle game with 20+ top-rated puzzle games, a Journey map, a daily challenge and friend duels.',
  base: BASE,
  outDir: '.vitepress/dist/docs',
  cleanUrls: true,
  lastUpdated: true,
  // calcquest.app is light-only; the docs match it.
  appearance: false,
  rewrites: { 'README.md': 'index.md' },
  srcExclude: ['CONTRIBUTING.md', 'node_modules/**', 'scripts/**'],
  sitemap: {
    hostname: DOCS_URL + '/',
    // Same form as the canonical links: no trailing slash.
    transformItems: (items) =>
      items.map((i) => ({ ...i, url: DOCS_URL + (i.url.replace(/\/$/, '') ? '/' + i.url.replace(/\/$/, '') : '') })),
  },

  head: [
    ['link', { rel: 'icon', href: `${SITE}/favicon.png` }],
    ['meta', { name: 'theme-color', content: '#F3EDE0' }],
    // Same fonts as calcquest.app: Poppins (text), DM Serif Display (headings).
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=DM+Serif+Display&display=swap' }],
    ['meta', { name: 'author', content: 'Arin Agrawal' }],
    ['meta', { property: 'og:site_name', content: 'CalcQuest Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: OG_IMAGE }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@ArinBuilds' }],
    ['link', { rel: 'alternate', type: 'text/plain', href: `${BASE}llms.txt`, title: 'llms.txt' }],
    ['script', {}, hashRedirect],
  ],

  transformPageData(pageData, { siteConfig }) {
    const src = fs.readFileSync(path.join(siteConfig.srcDir, pageData.filePath), 'utf8')
    if (!pageData.frontmatter.description) {
      pageData.frontmatter.description = clip(firstParagraph(src))
    }
    pageData.description = pageData.frontmatter.description
  },

  transformHead({ pageData, siteConfig }) {
    if (pageData.isNotFound) return [['meta', { name: 'robots', content: 'noindex' }]]
    const url = pageUrl(pageData.relativePath)
    const title = pageData.relativePath === 'index.md' ? 'CalcQuest Docs: the brain puzzle game, explained' : `${pageData.title} | CalcQuest Docs`
    const description = pageData.frontmatter.description as string
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    ]

    const crumbs = [{ name: 'CalcQuest Docs', item: DOCS_URL }]
    const section = pageData.relativePath.split('/')[0]
    if (sectionNames[section] && fs.existsSync(path.join(siteConfig.srcDir, section, 'index.md'))) {
      crumbs.push({ name: sectionNames[section], item: pageUrl(`${section}/index.md`) })
    }
    if (pageData.relativePath !== 'index.md' && !pageData.relativePath.endsWith('/index.md')) {
      crumbs.push({ name: pageData.title, item: url })
    }
    if (crumbs.length > 1) {
      head.push(ld({
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
      }))
    }

    if (pageData.relativePath === 'index.md') {
      head.push(ld({ '@graph': [
        { '@type': 'WebSite', name: 'CalcQuest Docs', url: DOCS_URL, publisher: { '@id': `${SITE}/#organization` } },
        organization,
        application,
      ] }))
    }
    if (pageData.relativePath === 'overview/faq.md') {
      const src = fs.readFileSync(path.join(siteConfig.srcDir, 'overview/faq.md'), 'utf8')
      head.push(ld({
        '@type': 'FAQPage',
        mainEntity: faqEntries(src).map(({ q, a }) => ({
          '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }))
    }
    if (pageData.relativePath === 'overview/founder.md') {
      head.push(ld({ '@type': 'ProfilePage', mainEntity: { ...founder, worksFor: { '@id': `${SITE}/#organization` } } }))
    }
    if (section === 'games' && !pageData.relativePath.endsWith('index.md')) {
      head.push(ld({
        '@type': 'Article',
        headline: title,
        description,
        url,
        about: { '@type': 'Game', name: pageData.title.replace(/^How to play /, '') },
        isPartOf: { '@type': 'MobileApplication', name: 'CalcQuest', url: SITE },
        author: founder,
      }))
    }
    return head
  },

  themeConfig: {
    siteTitle: 'CalcQuest Docs',
    logo: { src: `${SITE}/logo.png`, alt: 'CalcQuest logo' },
    nav: [
      { text: 'Facts', link: '/facts' },
      { text: 'Games', link: '/games/' },
      { text: 'Premium', link: '/premium' },
      { text: 'FAQ', link: '/overview/faq' },
      { text: 'Play free', link: `${SITE}/puzzles` },
      { text: 'Get the app', link: `${SITE}/play` },
    ],
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/arinagrawal05/calcquest-docs' },
      { icon: 'x', link: 'https://x.com/ArinBuilds' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/calcquest' },
    ],
    editLink: {
      pattern: 'https://github.com/arinagrawal05/calcquest-docs/edit/main/:path',
      text: 'Suggest a change on GitHub',
    },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
    outline: { level: [2, 3] },
    footer: {
      message: 'CalcQuest is a free brain puzzle game for Android, iOS and the web. Documentation released under the MIT License.',
      copyright: 'Made by Arin Agrawal',
    },
    sidebar: [
      {
        text: 'Start here',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Facts and figures', link: '/facts' },
          { text: 'AI summary', link: '/ai-summary' },
          { text: 'Who CalcQuest is for', link: '/who-is-it-for' },
          { text: 'CalcQuest Premium', link: '/premium' },
        ],
      },
      {
        text: 'Overview',
        items: [
          { text: 'What is CalcQuest?', link: '/overview/what-is-calcquest' },
          { text: 'FAQ', link: '/overview/faq' },
          { text: 'The founder', link: '/overview/founder' },
        ],
      },
      {
        text: 'Gameplay',
        items: [
          { text: 'Game modes', link: '/gameplay/game-modes' },
          { text: 'The Journey', link: '/gameplay/journey' },
          { text: 'Daily challenge', link: '/gameplay/daily-challenge' },
          { text: 'Friend duels', link: '/gameplay/duels' },
          { text: 'Progress and rewards', link: '/gameplay/progression-and-rewards' },
          { text: 'Difficulty', link: '/gameplay/difficulty' },
          { text: 'Play as a guest', link: '/gameplay/guest-play' },
          { text: 'Play on the web', link: '/gameplay/play-on-the-web' },
        ],
      },
      {
        text: 'Games',
        collapsed: false,
        items: [
          { text: 'All puzzle games', link: '/games/' },
          ...Object.entries(games).map(([category, list]) => ({
            text: `${category} games`,
            collapsed: true,
            items: list.map(([name, slug]) => ({ text: name, link: `/games/${slug}` })),
          })),
        ],
      },
      {
        text: 'Campaigns',
        items: [
          { text: 'Streak rewards', link: '/campaigns/streak-rewards' },
          { text: 'Invite friends', link: '/campaigns/invite-friends' },
        ],
      },
      {
        text: 'Design philosophy',
        collapsed: true,
        items: [
          { text: 'Principles', link: '/design-philosophy/principles' },
          { text: 'UX decisions', link: '/design-philosophy/ux-decisions' },
          { text: 'Monetization ethics', link: '/design-philosophy/monetization-ethics' },
        ],
      },
      {
        text: 'Dev journey',
        collapsed: true,
        items: [
          { text: 'Origin story', link: '/dev-journey/origin-story' },
          { text: 'From calculator game to brain puzzles', link: '/dev-journey/from-calculator-game-to-brain-puzzles' },
          { text: 'Growth and feedback', link: '/dev-journey/growth-and-feedback' },
          { text: 'Mistakes and lessons', link: '/dev-journey/mistakes-and-lessons' },
          { text: 'Real-world moments', link: '/dev-journey/real-world-moments' },
        ],
      },
      {
        text: 'Technical notes',
        collapsed: true,
        items: [
          { text: 'Architecture', link: '/technical-notes/architecture-overview' },
          { text: 'Puzzle generation', link: '/technical-notes/puzzle-generation' },
          { text: 'State management', link: '/technical-notes/state-management' },
        ],
      },
      {
        text: 'Press kit',
        collapsed: true,
        items: [
          { text: 'Long description', link: '/press-kit/long-description' },
          { text: 'Short descriptions', link: '/press-kit/short-descriptions' },
          { text: 'Brand guidelines', link: '/press-kit/brand-guidelines' },
          { text: 'Store links', link: '/press-kit/store-links' },
          { text: 'Press coverage', link: '/press-kit/press-coverage' },
        ],
      },
      {
        text: 'Reference',
        collapsed: true,
        items: [
          { text: 'Glossary', link: '/glossary' },
          { text: 'Comparisons', link: '/comparisons' },
          { text: 'Citations', link: '/citations' },
          { text: 'Release history', link: '/changelog/releases' },
        ],
      },
    ],
  },
})
