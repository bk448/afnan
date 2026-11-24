import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from '@/app/routes'

/** Re-exported so the prerender script has one SSR bundle to load. */
export { allRoutes } from '@/lib/routes'

/**
 * Renders one route to an HTML string at build time.
 *
 * React 19 emits <title>, <meta>, <link> and <script type="application/ld+json">
 * inline where they are rendered. The prerender script lifts them into <head>,
 * so crawlers receive complete metadata in the served HTML rather than waiting
 * for hydration.
 */
export async function render(url: string): Promise<string> {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${url}`))

  if (context instanceof Response) {
    throw new Error(`Unexpected redirect while prerendering ${url}`)
  }

  const router = createStaticRouter(routes, context)

  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} nonce={undefined} />
    </StrictMode>,
  )
}
