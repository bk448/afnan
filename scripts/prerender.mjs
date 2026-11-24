/**
 * Build-time prerender.
 *
 * Writes real static HTML for every canonical route, with metadata lifted into
 * <head>. Without this the SPA serves an empty shell, which is fatal for a site
 * whose traffic strategy is organic search.
 *
 * Run after `vite build` and `vite build --ssr`.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const DIST = join(root, 'dist')
const SSR_ENTRY = join(root, 'dist-ssr', 'entry-server.js')

/** Tags React 19 emits inline that belong in <head>. */
const HEAD_TAG_PATTERN =
  /<(?:title|meta|link)\b[^>]*?\/?>(?:[\s\S]*?<\/title>)?|<script type="application\/ld\+json"[\s\S]*?<\/script>/gi

function liftHeadTags(appHtml) {
  const collected = []
  const body = appHtml.replace(HEAD_TAG_PATTERN, (match) => {
    // Only lift metadata tags, never stylesheets already in the template.
    if (/^<link\b/i.test(match) && !/rel="canonical"/i.test(match)) return match
    collected.push(match)
    return ''
  })
  return { head: collected.join('\n    '), body }
}

async function main() {
  const template = await readFile(join(DIST, 'index.html'), 'utf-8')
  const { render, allRoutes } = await import(pathToFileURL(SSR_ENTRY).href)

  const routes = allRoutes()
  let written = 0
  const failures = []

  for (const route of routes) {
    try {
      const appHtml = await render(route.path)
      const { head, body } = liftHeadTags(appHtml)

      let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

      // Replace the template's placeholder title/description with the real ones.
      html = html
        .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
        .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
        .replace('</head>', `    ${head}\n  </head>`)

      const outDir = route.path === '/' ? DIST : join(DIST, route.path)
      await mkdir(outDir, { recursive: true })
      await writeFile(join(outDir, 'index.html'), html, 'utf-8')
      written += 1
    } catch (error) {
      failures.push(`${route.path} — ${error.message}`)
    }
  }

  console.log(`prerender: ${written}/${routes.length} routes written`)
  if (failures.length > 0) {
    console.error('prerender failures:')
    for (const f of failures) console.error(`  ${f}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
