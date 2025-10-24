// ===============================
// 🗺️ DTS&DOG Studio - Sitemap Generator
// Última actualización: 2025-10-24
// ===============================

import fs from "fs";
import path from "path";

// 🌍 Configuración principal
const DOMAIN = "https://dtsanddog-studio.com.ar";
const TODAY = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

// 🧭 Rutas del sitio (páginas + secciones)
const pages = [
  // Páginas principales
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.9" },
  { loc: "/insights", changefreq: "weekly", priority: "0.8" },
  { loc: "/insights/react", changefreq: "monthly", priority: "0.7" },
  { loc: "/insights/ux", changefreq: "monthly", priority: "0.7" },
  { loc: "/insights/branding", changefreq: "monthly", priority: "0.7" },

  // Anclas internas (solo si querés mantenerlas en sitemap)
  { loc: "/#about", changefreq: "monthly", priority: "0.8" },
  { loc: "/#services", changefreq: "weekly", priority: "0.8" },
  { loc: "/#tech", changefreq: "monthly", priority: "0.7" },
  { loc: "/#portfolio", changefreq: "monthly", priority: "0.7" },
  { loc: "/#contacto", changefreq: "weekly", priority: "0.8" },
];

// 🧠 Generación dinámica del XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${pages
  .map(
    (page) => `
  <url>
    <loc>${DOMAIN}${page.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>
`;

// 💾 Guardar en /public/sitemap.xml
const publicDir = path.resolve("public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const sitemapPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(sitemapPath, sitemapXml.trim());

console.log(`✅ Sitemap generado correctamente en: ${sitemapPath}`);
