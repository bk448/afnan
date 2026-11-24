/**
 * Generates sitemap.xml and robots.txt from the route manifest, so the sitemap
 * cannot drift from the content.
 */
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const DIST = join(root, 'dist')
const SITE_URL = process.env.SITE_URL ?? 'https://www.example.com'

const { allRoutes } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

const routes = allRoutes()
const today = new Date().toISOString().slice(0, 10)

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf-8')
await writeFile(join(DIST, 'robots.txt'), robots, 'utf-8')

console.log(`sitemap: ${routes.length} urls written`)
