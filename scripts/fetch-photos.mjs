/**
 * Downloads the Unsplash photos listed in assets/photos.json, verifies each is
 * a real image, and writes optimised WebP derivatives into public/images/.
 *
 * Self-hosted rather than hotlinked: a hotlinked photo can be removed upstream
 * and leave a hole in a client-facing page, and every page view would depend on
 * a third-party CDN.
 *
 *   node scripts/fetch-photos.mjs [--force]
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const MANIFEST = join(root, 'assets', 'photos.json')
const OUT_DIR = join(root, 'public', 'images')
const FORCE = process.argv.includes('--force')

/** Rendered widths. Cards never exceed ~800px; banners run full-bleed. */
const SIZES = [640, 1280]

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

const photos = JSON.parse(await readFile(MANIFEST, 'utf-8'))
await mkdir(OUT_DIR, { recursive: true })

let written = 0
let skipped = 0
const failures = []

for (const photo of photos) {
  const target = join(OUT_DIR, `${photo.name}-${SIZES[0]}.webp`)
  if (!FORCE && (await exists(target))) {
    skipped += 1
    continue
  }

  // Request a generous source and resize locally, so one download feeds all sizes.
  const url = `https://images.unsplash.com/${photo.id}?w=1600&q=80&fit=crop&crop=entropy&auto=format`

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'jungletax-build-script' },
      redirect: 'follow',
    })

    if (!response.ok) {
      failures.push(`${photo.name}: HTTP ${response.status}`)
      continue
    }

    const type = response.headers.get('content-type') ?? ''
    if (!type.startsWith('image/')) {
      failures.push(`${photo.name}: not an image (${type})`)
      continue
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const meta = await sharp(buffer).metadata()
    if (!meta.width || meta.width < 800) {
      failures.push(`${photo.name}: too small (${meta.width}x${meta.height})`)
      continue
    }

    for (const width of SIZES) {
      const out = await sharp(buffer)
        .resize(width, Math.round(width * (photo.ratio ?? 0.5625)), {
          fit: 'cover',
          position: photo.position ?? 'attention',
        })
        .webp({ quality: 76 })
        .toBuffer()
      await writeFile(join(OUT_DIR, `${photo.name}-${width}.webp`), out)
    }

    written += 1
    console.log(`  ${photo.name.padEnd(14)} ok  (${meta.width}x${meta.height} source)`)
  } catch (error) {
    failures.push(`${photo.name}: ${error.message}`)
  }
}

console.log(`photos: ${written} written, ${skipped} already present`)
if (failures.length > 0) {
  console.error('failed:')
  for (const f of failures) console.error(`  ${f}`)
  process.exitCode = 1
}
