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
        target: 'http://localhost:3000', // Адрес вашего бэкенда
        changeOrigin: true,              // Важно для корректной работы CORS
        secure: false,                   // Если используете http (не https)
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