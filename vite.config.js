import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    open: true,
    host: true, // permite probar desde otro dispositivo en la red
    cors: true,
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "framer-motion"],
        },
      },
    },
  },

  // ✅ Sirve el manifest y el SW desde raíz correctamente
  publicDir: "public",

  // ✅ Base relativa (para Netlify / GitHub Pages / Vercel)
  base: "./",
});
