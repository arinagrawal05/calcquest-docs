// After `vitepress build`: write llms-full.txt (every page in one file, in
// sidebar order) and a raw Markdown copy of each page at <url>.md, so AI tools
// can read the docs without HTML. See https://llmstxt.org.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, '.vitepress/dist/docs')
const SITE = 'https://calcquest.app/docs'

const order = [
  'README.md', 'facts.md', 'ai-summary.md', 'who-is-it-for.md', 'premium.md',
  'overview', 'gameplay', 'games', 'campaigns',
  'design-philosophy', 'dev-journey', 'technical-notes', 'press-kit', 'changelog',
  'glossary.md', 'comparisons.md', 'citations.md',
]

function files(entry) {
  const full = path.join(root, entry)
  if (fs.statSync(full).isFile()) return [entry]
  const names = fs.readdirSync(full).filter((n) => n.endsWith('.md')).sort()
  // index first
  names.sort((a, b) => (a === 'index.md' ? -1 : b === 'index.md' ? 1 : 0))
  return names.map((n) => path.join(entry, n))
}

/** Published URL path (no extension) for a source file. */
function route(rel) {
  if (rel === 'README.md') return ''
  return rel.replace(/\/index\.md$/, '').replace(/\.md$/, '')
}

/** Rewrite relative .md links to absolute calcquest.app/docs links. */
function absolutize(md, rel) {
  const dir = path.posix.dirname(rel)
  return md.replace(/\]\((?!https?:|mailto:|#)([^)#\s]+\.md)(#[^)]*)?\)/g, (_, link, hash = '') => {
    const target = path.posix.normalize(path.posix.join(dir, link))
    const r = route(target === 'README.md' ? 'README.md' : target)
    return `](${SITE}${r ? '/' + r : ''}${hash})`
  })
}

const parts = [
  '# CalcQuest documentation (full text)',
  '',
  `> Every page of the CalcQuest documentation in one file. Source: ${SITE}. Generated ${new Date().toISOString().slice(0, 10)}.`,
  '',
]
let count = 0
for (const entry of order) {
  for (const rel of files(entry)) {
    const src = fs.readFileSync(path.join(root, rel), 'utf8')
    const md = absolutize(src, rel)
    const r = route(rel)
    // raw copy: /docs/facts.md, /docs/games.md (for games/index.md), /docs/index.md (home)
    const out = path.join(dist, (r || 'index') + '.md')
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, md)
    parts.push('---', '', `Source: ${SITE}${r ? '/' + r : ''}`, '', md.trim(), '')
    count++
  }
}
fs.writeFileSync(path.join(dist, 'llms-full.txt'), parts.join('\n'))
console.log(`llms-full.txt and ${count} Markdown copies written`)
