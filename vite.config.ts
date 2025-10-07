import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
    //  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://185.231.115.191:8040',
    //     changeOrigin: true,
    //     secure: false,
    //   }
    // }
  // }
})
