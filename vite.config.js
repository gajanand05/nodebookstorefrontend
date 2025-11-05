import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3037,  // <-- change this to your desired port
    strictPort: true // optional: fails if the port is already in use
  }
  ,
  plugins: [react(),tailwindcss()],
})
