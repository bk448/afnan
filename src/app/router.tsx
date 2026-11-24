import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {
  CountriesIndexPage,
  DivisionsIndexPage,
  FormsIndexPage,
  ServicesIndexPage,
} from '@/pages/IndexPages'
import { ServiceDetailPage } from '@/pages/services/ServiceDetailPage'
import { FormDetailPage } from '@/pages/forms/FormDetailPage'
import { CountryDetailPage } from '@/pages/countries/CountryDetailPage'
import { DivisionDetailPage } from '@/pages/divisions/DivisionDetailPage'
import {
  AboutPage,
  DeadlinesPage,
  FaqsPage,
  LegalPage,
  PricingPage,
  ResourcesPage,
} from '@/pages/StaticPages'
import { BookConsultationPage, ContactPage, RequestQuotePage } from '@/pages/ContactPages'

/**
 * 91 canonical routes.
 *
 * React Router normalises trailing slashes when matching, so `/services/`
 * resolves to the `services` route. All links and canonical URLs use the
 * trailing-slash form specified by the sitemap.
 *
 * Four dynamic segments carry 75 of the 91 routes.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },

      // Divisions — 1 index + 6 detail
      { path: 'divisions', element: <DivisionsIndexPage /> },
      { path: 'divisions/:slug', element: <DivisionDetailPage /> },

      // Services — 1 index + 23 detail
      { path: 'services', element: <ServicesIndexPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },

      // Forms — 1 index + 30 detail
      { path: 'forms', element: <FormsIndexPage /> },
      { path: 'forms/:slug', element: <FormDetailPage /> },

      // Countries — 1 index + 16 detail
      { path: 'countries', element: <CountriesIndexPage /> },
      { path: 'countries/:slug', element: <CountryDetailPage /> },

      // Contact & conversion
      { path: 'contact', element: <ContactPage /> },
      { path: 'contact/book', element: <BookConsultationPage /> },
      { path: 'contact/quote', element: <RequestQuotePage /> },

      // Utility
      { path: 'pricing', element: <PricingPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'resources/deadlines', element: <DeadlinesPage /> },

      // Legal — one template, three routes
      {
        path: 'privacy',
        element: (
          <LegalPage
            title="Privacy Policy"
            path="/privacy/"
            description="How Jungle Tax collects, uses and protects personal information."
            intro="How we handle the personal information you share with us."
          />
        ),
      },
      {
        path: 'terms',
        element: (
          <LegalPage
            title="Terms of Engagement"
            path="/terms/"
            description="The terms on which Jungle Tax provides services and the basis of any engagement."
            intro="The basis on which we work, and what using this site does and does not create."
          />
        ),
      },
      {
        path: 'cookies',
        element: (
          <LegalPage
            title="Cookie Policy"
            path="/cookies/"
            description="How this website uses cookies and similar technologies."
            intro="What this site stores in your browser, and why."
          />
        ),
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
