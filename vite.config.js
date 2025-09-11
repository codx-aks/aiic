import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,          
    port: 5173,          
    strictPort: true,
    cors: true,
    origin: `https://72c699280be0.ngrok-free.app`,
    hmr: {
      host: "72c699280be0.ngrok-free.app",  
      protocol: 'wss', 
      clientPort: 443,   
    },
  },
})
