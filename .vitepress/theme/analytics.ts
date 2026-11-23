// Mixpanel for the docs: the same project as calcquest.app. The docs are served
// from calcquest.app/docs, so they share the website's localStorage and a
// visitor keeps one anonymous id across the website and the docs.
//
// Events (every one carries site: 'docs'):
//   page_view          { path, page_title }                   first load and every page change
//   link_click         { link_type, link_url, link_text, location, page_path, opens_new_tab, platform? }
//   social_link_click  { platform, link_url, location, page_path }
//   app_store_click    { store, location, page_path }
//   docs_search_opened { page_path, method }                  search box opened (click or shortcut)
//   docs_page_read     { path, page_title }                   75% of a page scrolled, once per page view
//
// link_click, social_link_click and app_store_click match the website's
// lib/linkTracking.ts (calcquest_web), and the first-touch properties match its
// lib/mixpanel.ts. Change them together. Catalog: calcquest_web README "Analytics".
import type { Router } from 'vitepress'

const MIXPANEL_TOKEN = '5be6679f108ff404ab0a4d400615546e'

type Mixpanel = typeof import('mixpanel-browser').default
let mp: Mixpanel | null = null
const queue: [string, Record<string, unknown>][] = []

function track(event: string, props: Record<string, unknown> = {}) {
  const all = { ...props, site: 'docs' }
  if (!mp) {
    queue.push([event, all])
    return
  }
  try {
    mp.track(event, all, { transport: 'sendBeacon' })
  } catch (err) {
    console.error('Mixpanel track error', err)
  }
}

// ---------- First-touch attribution (same rules as the website) ----------

function referrerInfo(): { referrer_type: string; referring_domain: string } | null {
  const ref = document.referrer || ''
  if (!ref) return { referrer_type: 'direct', referring_domain: 'direct' }
  try {
    const h = new URL(ref).hostname.toLowerCase()
    if (h.includes('calcquest.app') || h.includes('localhost')) return null
    const rules: [string[], string, string][] = [
      [['google.'], 'organic_search', 'google'],
      [['bing.'], 'organic_search', 'bing'],
      [['duckduckgo.'], 'organic_search', 'duckduckgo'],
      [['ecosia.'], 'organic_search', 'ecosia'],
      [['yahoo.'], 'organic_search', 'yahoo'],
      [['linkedin.'], 'social', 'linkedin'],
      [['reddit.', 'redd.it'], 'community', 'reddit'],
      [['twitter.', 't.co', 'x.com'], 'social', 'x'],
      [['youtube.', 'youtu.be'], 'video', 'youtube'],
      [['facebook.', 'fb.'], 'social', 'facebook'],
      [['instagram.'], 'social', 'instagram'],
      [['threads.net'], 'social', 'threads'],
      [['news.ycombinator.com'], 'community', 'hacker_news'],
      [['github.com'], 'referral', 'github'],
    ]
    for (const [needles, type, domain] of rules) {
      if (needles.some((n) => h.includes(n))) return { referrer_type: type, referring_domain: domain }
    }
    if (['chatgpt.com', 'claude.ai', 'perplexity.ai', 'gemini.google.com', 'copilot.microsoft.com'].some((d) => h.includes(d))) {
      return { referrer_type: 'ai_assistant', referring_domain: h }
    }
    return { referrer_type: 'referral', referring_domain: h }
  } catch {
    return { referrer_type: 'referral', referring_domain: ref }
  }
}

function registerAttribution(m: Mixpanel) {
  const params = new URLSearchParams(location.search)
  const utms: Record<string, string> = {}
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref']) {
    const v = params.get(k)
    if (v) utms[k] = v
  }
  const ref = referrerInfo()
  const source = utms.utm_source || (ref ? ref.referring_domain : 'direct')
  const medium = utms.utm_medium || (ref ? ref.referrer_type : 'direct')
  const first: Record<string, string> = {
    ...utms,
    initial_landing_page: location.pathname,
    initial_url: location.origin + location.pathname,
    utm_source: source,
    utm_medium: medium,
  }
  if (ref) {
    first.initial_referrer_type = ref.referrer_type
    first.initial_referring_domain = ref.referring_domain
  }
  m.register_once(first)
  // Only an outside arrival changes the session's source; moving between
  // the website and the docs keeps the existing one.
  if (ref || Object.keys(utms).length) {
    const current: Record<string, string> = { ...utms, utm_source: source, utm_medium: medium }
    if (ref) {
      current.last_referring_domain = ref.referring_domain
      current.last_referrer_type = ref.referrer_type
    }
    m.register(current)
  }
}

// ---------- Link classification (same as the website) ----------

const SOCIAL: Record<string, string> = {
  'x.com': 'x', 'twitter.com': 'x', 'linkedin.com': 'linkedin', 'youtube.com': 'youtube',
  'youtu.be': 'youtube', 'instagram.com': 'instagram', 'github.com': 'github',
  'facebook.com': 'facebook', 'threads.net': 'threads', 'reddit.com': 'reddit',
  'discord.gg': 'discord', 'discord.com': 'discord', 'wa.me': 'whatsapp',
  'whatsapp.com': 'whatsapp', 'grokipedia.com': 'grokipedia',
}

const host = (h: string) => h.toLowerCase().replace(/^www\./, '').replace(/^m\./, '')

function classifyLink(href: string) {
  if (!href || href.startsWith('javascript:')) return null
  if (href.startsWith('mailto:')) return { link_type: 'email', link_url: 'mailto:' + href.slice(7).split('?')[0] }
  if (href.startsWith('tel:')) return { link_type: 'phone', link_url: 'tel' }
  let url: URL
  try {
    url = new URL(href, location.href)
  } catch {
    return null
  }
  const h = host(url.hostname)
  const path = url.pathname.replace(/\/$/, '') || '/'
  if (h === 'play.google.com') return { link_type: 'app_store', link_url: `https://${h}${path}`, platform: 'google_play' }
  if (h === 'apps.apple.com' || h === 'itunes.apple.com') return { link_type: 'app_store', link_url: `https://${h}${path}`, platform: 'app_store' }
  const social = Object.keys(SOCIAL).find((d) => h === d || h.endsWith('.' + d))
  if (social) return { link_type: 'social', link_url: `https://${h}${path}`, platform: SOCIAL[social] }
  if (h === host(location.hostname) || h === 'calcquest.app' || h === 'localhost') {
    return { link_type: path === '/docs' || path.startsWith('/docs/') ? 'docs' : 'internal', link_url: path }
  }
  return { link_type: 'external', link_url: `https://${h}${path}` }
}

/** Where in the docs layout the link is. */
function linkLocation(el: Element): string {
  if (el.closest('.VPLocalSearchBox')) return 'search'
  if (el.closest('.VPNav, .VPNavScreen')) return 'navbar'
  if (el.closest('.VPSidebar')) return 'sidebar'
  if (el.closest('.VPDocAside, .VPLocalNavOutlineDropdown')) return 'outline'
  if (el.closest('.VPDocFooter')) return 'page_footer'
  if (el.closest('.VPFooter')) return 'footer'
  return 'page'
}

function linkText(a: HTMLAnchorElement) {
  const label = a.getAttribute('aria-label') || a.title || (a.textContent || '').replace(/\s+/g, ' ').trim()
  return (label || a.querySelector('img[alt]')?.getAttribute('alt') || '(icon)').slice(0, 80)
}

// ---------- Install ----------

let readSent = false
let lastPath = ''

function pageView() {
  // The route hook can also fire on the first load; count each page once.
  if (location.pathname === lastPath) return
  lastPath = location.pathname
  readSent = false
  // Wait a tick so document.title is the new page's title.
  setTimeout(() => track('page_view', { path: location.pathname, page_title: document.title }), 0)
}

export function installAnalytics(router: Router) {
  import('mixpanel-browser')
    .then(({ default: m }) => {
      m.init(MIXPANEL_TOKEN, {
        persistence: 'localStorage',
        track_pageview: false,
        autocapture: false,
        ignore_dnt: true,
        record_sessions_percent: 0,
      })
      registerAttribution(m)
      mp = m
      for (const [e, p] of queue.splice(0)) m.track(e, p, { transport: 'sendBeacon' })
    })
    .catch((err) => console.error('Mixpanel failed to load', err))

  pageView()
  const prev = router.onAfterRouteChange
  router.onAfterRouteChange = (to) => {
    prev?.(to)
    pageView()
  }

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null
      if (target?.closest?.('.VPNavBarSearch button, #local-search button')) {
        track('docs_search_opened', { page_path: location.pathname, method: 'click' })
      }
      const a = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const info = classifyLink(a.getAttribute('href') || '')
      if (!info) return
      const props = {
        ...info,
        link_text: linkText(a),
        location: linkLocation(a),
        page_path: location.pathname,
        opens_new_tab: a.target === '_blank',
      }
      track('link_click', props)
      if (info.link_type === 'social') {
        track('social_link_click', { platform: info.platform, link_url: info.link_url, location: props.location, page_path: props.page_path })
      }
      if (info.link_type === 'app_store') {
        track('app_store_click', { store: info.platform, location: props.location, page_path: props.page_path })
      }
    },
    { capture: true },
  )

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      track('docs_search_opened', { page_path: location.pathname, method: 'shortcut' })
    }
  })

  window.addEventListener(
    'scroll',
    () => {
      if (readSent) return
      const doc = document.documentElement
      const seen = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1)
      if (seen >= 0.75) {
        readSent = true
        track('docs_page_read', { path: location.pathname, page_title: document.title })
      }
    },
    { passive: true },
  )
}
