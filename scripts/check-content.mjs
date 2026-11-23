// Content checks, run by `npm run build`. Fails on emoji, out-of-date claims,
// or relative links to pages that do not exist. See CONTRIBUTING.md.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const skip = new Set(['node_modules', '.vitepress', '.vercel', '.git', 'public', 'scripts'])

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (skip.has(e.name)) return []
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : e.name.endsWith('.md') ? [p] : []
  })
}

const emoji = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u
// Claims that are out of date or not true. CONTRIBUTING.md explains each.
const banned = [
  [/world'?s first/i, 'Do not say "world\'s first"'],
  [/\b10,?000\+? (installs|players|users)|\b10K\+? (installs|players|users)/i, 'Use 25K+ players'],
  [/30,?000|30K/i, 'Use 25K+ players'],
  [/\b23 (puzzle )?games\b|\b22[- ]game/i, 'Use "20+ top-rated puzzle games"'],
  [/math puzzle app/i, 'CalcQuest is a brain puzzle game'],
  [/zero forced ads/i, 'Say "ads never interrupt a puzzle"'],
  [/CalcQuest Pro\b/, 'The paid plan is CalcQuest Premium'],
]
const allowBanned = new Set(['CONTRIBUTING.md', 'press-kit/brand-guidelines.md'])

const problems = []
for (const file of walk(root)) {
  const rel = path.relative(root, file)
  const text = fs.readFileSync(file, 'utf8')
  text.split('\n').forEach((line, i) => {
    if (emoji.test(line)) problems.push(`${rel}:${i + 1}: emoji`)
    if (!allowBanned.has(rel)) {
      for (const [re, msg] of banned) if (re.test(line)) problems.push(`${rel}:${i + 1}: ${msg}`)
    }
  })
  for (const m of text.matchAll(/\]\((?!https?:|mailto:|#)([^)#\s]+)(#[^)]*)?\)/g)) {
    const target = path.resolve(path.dirname(file), m[1])
    if (!fs.existsSync(target)) problems.push(`${rel}: broken link ${m[1]}`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length} content problem(s). See CONTRIBUTING.md.`)
  process.exit(1)
}
console.log('content checks passed')
