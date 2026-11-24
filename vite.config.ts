import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Content is large and rarely changes; splitting it from the framework
        // keeps the vendor chunk cacheable across content edits.
        manualChunks(id) {
          if (id.includes('/src/content/')) return 'content'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
            return 'react'
          if (id.includes('node_modules/@radix-ui')) return 'radix'
          // Imported dynamically at submit time only. Kept out of `vendor`
          // because every one of the 91 pages modulepreloads that chunk, and
          // the SDK is ~60 kB gzipped for a single INSERT on one page.
          if (id.includes('node_modules/@supabase')) return 'supabase'
          if (id.includes('node_modules')) return 'vendor'
          return undefined
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
