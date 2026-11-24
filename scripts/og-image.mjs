/**
 * Renders the Open Graph card from SVG to PNG.
 *
 * Social platforms do not reliably render SVG, so the card has to ship as a
 * raster image. Generated at build time from `assets/og-default.svg` so the
 * source stays editable as text.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const SRC = join(root, 'assets', 'og-default.svg')
const OUT = join(root, 'public', 'og-default.png')

const svg = await readFile(SRC)
const png = await sharp(svg, { density: 144 }).resize(1200, 630).png({ quality: 90 }).toBuffer()

await writeFile(OUT, png)
console.log(`og-image: ${(png.length / 1024).toFixed(0)} KB written to public/og-default.png`)
