import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '*': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/api/register': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/api/loginUser': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/api/logout': {
        target: 'http://localhost:8000',
        changeOrigin: true
      },
      '/api/users': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
})