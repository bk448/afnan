/**
 * Visual check for the navigation panels.
 *
 * Opens each mega-menu against a running dev server, captures it, and reports
 * whether the page overflows horizontally. Run `npm run dev` first.
 *
 *   node scripts/screenshot.mjs <output-dir>
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const OUT = process.argv[2] ?? '.screenshots'
const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
await page.goto(BASE, { waitUntil: 'networkidle' })

for (const name of ['Who we help', 'Services', 'Forms', 'Countries']) {
  await page
    .getByRole('button', { name: new RegExp(name, 'i') })
    .first()
    .hover()
  await page.waitForTimeout(600)
  const file = `${OUT}/nav-${name.replace(/\s+/g, '-').toLowerCase()}.png`
  await page.screenshot({ path: file })
  console.log(file)
  await page.mouse.move(10, 500)
  await page.waitForTimeout(250)
}

const metrics = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}))
console.log(
  `overflow: scrollWidth=${metrics.scrollW} clientWidth=${metrics.clientW} ` +
    `${metrics.scrollW > metrics.clientW ? 'HORIZONTAL OVERFLOW' : 'ok'}`,
)
await page.close()

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto(BASE, { waitUntil: 'networkidle' })
await mobile.screenshot({ path: `${OUT}/mobile-home.png` })
console.log(`${OUT}/mobile-home.png`)
const mMetrics = await mobile.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
}))
console.log(
  `mobile overflow: scrollWidth=${mMetrics.scrollW} clientWidth=${mMetrics.clientW} ` +
    `${mMetrics.scrollW > mMetrics.clientW ? 'HORIZONTAL OVERFLOW' : 'ok'}`,
)
await mobile.close()

await browser.close()
