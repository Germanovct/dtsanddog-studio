import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dtsanddog-studio/', // 👈 muy importante la barra al final
})
