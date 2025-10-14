import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuración para desplegar correctamente en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/dtsanddog-studio/', // 👈 nombre EXACTO del repo
})
