import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Pages serves a project repo under /<repo>/, so the production build uses that base.
// Dev stays at '/' so the local + LAN preview work at the root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/ascendant/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
}))
