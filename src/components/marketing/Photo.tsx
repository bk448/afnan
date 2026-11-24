import { cn } from '@/lib/cn'

interface PhotoProps {
  /** Base name in public/images, without size suffix or extension. */
  name: string
  alt: string
  className?: string
  /** Intrinsic dimensions prevent layout shift while the image loads. */
  width?: number
  height?: number
  /** Above-the-fold images should load eagerly; everything else lazily. */
  priority?: boolean
  sizes?: string
  /** Warms the image toward the page's ink, so photography sits in the palette. */
  tone?: boolean
}

/**
 * Self-hosted responsive photograph.
 *
 * Sources are downloaded from Unsplash at build-prep time by
 * `scripts/fetch-photos.mjs` and converted to WebP at two widths. Hotlinking
 * was rejected deliberately: an upstream removal would leave a hole in a
 * client-facing page, and every view would depend on a third-party CDN.
 */
export function Photo({
  name,
  alt,
  className,
  width = 1280,
  height = 640,
  priority = false,
  sizes = '(min-width: 1024px) 40rem, 100vw',
  tone = true,
}: PhotoProps) {
  return (
    <span className={cn('relative block overflow-hidden bg-surface', className)}>
      <img
        src={`/images/${name}-1280.webp`}
        srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...({ fetchpriority: priority ? 'high' : undefined } as any)}
        className="h-full w-full object-cover"
      />

      {tone && (
        <>
          {/* Ink wash ties stock photography into the restrained palette. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ink-900/12 mix-blend-multiply"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/25 via-transparent to-transparent"
          />
        </>
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink-900/10"
      />
    </span>
  )
}
