import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5000
  },
  resolve: {
    alias: {
      '@components': '/src/Components',
    }
  },
  base: '', 
})
