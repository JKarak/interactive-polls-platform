import { defineConfig } from 'vite';

export default defineConfig({
  base:
    process.env.NODE_ENV ===
    'production'
      ? '/interactive-polls-platform/'
      : '/',
  server: {
    port: 5173,
    open: true,
    
    proxy: {
      '/polls': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  preview: {
    port: 4173
  },

  build: {
    outDir: 'dist',
    sourcemap: true
  }
});