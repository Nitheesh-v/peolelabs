import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow the dynamic preview host used by the sandbox environment.
    allowedHosts: true,
    proxy: {
      // Forward API calls to the Express backend during development.
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
      },
    },
  },
  build: {
    // The three.js hero scene is a lazy chunk (~140 kB gzip) loaded after idle;
    // it never blocks first paint, so allow it without a warning.
    chunkSizeWarningLimit: 600,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
