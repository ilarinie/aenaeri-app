import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'
import react from 'vite-preset-react'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../build',
    sourcemap: true,
  },
  plugins: [
    react({
      // @ts-ignore
      reactRefreshOptions: {
        include: './src'
      }
    }),
    envCompatible(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://aenaeri-app-backend:3001',
        changeOrigin: false,
      },
    },
  },
})
