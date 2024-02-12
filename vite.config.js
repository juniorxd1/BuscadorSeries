import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['img'],
  plugins: [react()],
  server: {
    proxy: {
      '/Animes': 'http://localhost:7166',
    },
  },
});