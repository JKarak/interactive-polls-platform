import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
    
    // --- ДОБАВЬТЕ ЭТОТ БЛОК ---
    proxy: {
      '/polls': {
        target: 'http://localhost:3000', // Адрес вашего бэкенда
        changeOrigin: true,              // Важно для корректной работы CORS
        secure: false,                   // Если используете http (не https)
      },
    },
    // ---------------------------
  },

  preview: {
    port: 4173
  },

  build: {
    outDir: 'dist',
    sourcemap: true
  }
});