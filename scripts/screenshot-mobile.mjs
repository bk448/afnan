/**
 * Visual check for the mobile navigation drawer across small viewports.
 *
 *   node scripts/screenshot-mobile.mjs <output-dir>
 */
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const OUT = process.argv[2] ?? '.screenshots'
const BASE = process.env.BASE_URL ?? 'http://localhost:5173'

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const [label, width, height] of [
  ['sm-375', 375, 812],
  ['sm-390', 390, 844],
  ['md-768', 768, 1024],
  ['lg-1100', 1100, 900],
]) {
  const page = await browser.newPage({ viewport: { width, height } })
  await page.goto(BASE, { waitUntil: 'networkidle' })

  const toggle = page.getByRole('button', { name: /open menu/i })
  const toggleVisible = await toggle.isVisible().catch(() => false)

  if (!toggleVisible) {
    console.log(`${label}: toggle NOT VISIBLE (desktop nav showing)`)
    await page.close()
    continue
  }

  await toggle.click()
  await page.waitForTimeout(400)

  const drawer = page.locator('#mobile-nav')
  const box = await drawer.boundingBox()
  const count = await drawer.locator('a, button').count()

  console.log(
    `${label}: drawer box=${box ? `${Math.round(box.width)}x${Math.round(box.height)}` : 'NULL'} ` +
      `links=${count} ${box && box.height > 100 ? 'ok' : 'BROKEN — no usable height'}`,
  )

  await page.screenshot({ path: `${OUT}/mobile-${label}.png` })

  // Drill into the layered sub-panels on the narrowest viewport only.
  if (label === 'sm-375') {
    for (const section of ['Forms', 'Countries', 'Services']) {
      await page.getByRole('button', { name: new RegExp(`^${section}`) }).click()
      await page.waitForTimeout(350)
      const sub = await drawer.boundingBox()
      const links = await drawer.locator('a').count()
      console.log(
        `  ↳ ${section}: ${sub ? `${Math.round(sub.width)}x${Math.round(sub.height)}` : 'NULL'} ` +
          `links=${links}`,
      )
      await page.screenshot({ path: `${OUT}/drill-${section.toLowerCase()}.png` })
      await page.getByRole('button', { name: /all sections/i }).click()
      await page.waitForTimeout(250)
    }
  }

  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    cw: document.documentElement.clientWidth,
  }))
  console.log(`  overflow: ${m.sw}/${m.cw} ${m.sw > m.cw ? 'HORIZONTAL OVERFLOW' : 'ok'}`)

  await page.close()
}

await browser.close()
