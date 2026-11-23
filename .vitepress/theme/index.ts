// The CalcQuest docs use VitePress's default theme, restyled to match
// calcquest.app: the same palette, fonts, card surfaces and ink "lip" buttons.
// Tokens mirror calcquest_web/styles/globals.css; keep them in sync.
// Analytics (Mixpanel, same project as the website): ./analytics.ts.
import DefaultTheme from 'vitepress/theme'
import { inBrowser, type Theme } from 'vitepress'
import { installAnalytics } from './analytics'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser) installAnalytics(router)
  },
} satisfies Theme
