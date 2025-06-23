import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // https: false, // ✅ Explicitly disable HTTPS
    port: 5175,   // (optional) choose your port
  },
})
