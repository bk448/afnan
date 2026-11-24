import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function RootLayout() {
  const { pathname } = useLocation()

  // Move focus to the main landmark on navigation so screen-reader and
  // keyboard users are not stranded at the end of the previous page.
  useEffect(() => {
    const main = document.getElementById('main')
    main?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-ink-800 focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      {/* `key` restarts the entrance animation on each navigation. */}
      <main
        id="main"
        key={pathname}
        tabIndex={-1}
        className="enter-fade flex-1 outline-none"
      >
        <Outlet />
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  )
}
