/**
 * Visual check for content pages at desktop and mobile widths.
 *
 *   node scripts/screenshot-pages.mjs <output-dir> [path ...]
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const [, , outArg, ...paths] = process.argv
const OUT = outArg ?? '.screenshots'
const BASE = process.env.BASE_URL ?? 'http://localhost:5173'
const TARGETS = paths.length > 0 ? paths : ['/countries/uk/', '/countries/']

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const [label, width, height] of [
  ['desktop', 1440, 1000],
  ['mobile', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } })

  for (const path of TARGETS) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' })

    // Scroll the full page so lazy images load; otherwise every below-the-fold
    // image reports as "broken" when it is merely deferred.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(400)

    const broken = await page.evaluate(() =>
      [...document.images]
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.currentSrc || img.src),
    )
    const m = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }))

    const slug = path.replace(/\//g, '_') || '_home'
    await page.screenshot({ path: `${OUT}/${label}${slug}.png`, fullPage: false })
    console.log(
      `${label} ${path}: images=${await page.evaluate(() => document.images.length)} ` +
        `broken=${broken.length} overflow=${m.sw > m.cw ? 'YES' : 'no'}`,
    )
    if (broken.length) for (const b of broken) console.log(`   BROKEN: ${b}`)
  }

  await page.close()
}

await browser.close()
