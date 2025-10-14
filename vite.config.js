import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configuración limpia para Netlify
export default defineConfig({
  plugins: [react()],
})
