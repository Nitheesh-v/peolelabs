import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
})
