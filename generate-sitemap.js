// ===============================
// 🗺️ DTS&DOG Studio - Sitemap Generator
// Última actualización: 2025-10-24
// ===============================

import fs from "fs";
import path from "path";

// 🔧 Configuración del sitio
const domain = "https://dtsanddog-studio.com.ar";
const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

// 📍 Rutas principales del sitio
const pages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/#about", changefreq: "monthly", priority: "0.9" },
  { loc: "/#services", changefreq: "weekly", priority: "0.9" },
  { loc: "/#tech", changefreq: "monthly", priority: "0.8" },
  { loc: "/#portfolio", changefreq: "monthly", priority: "0.8" },
  { loc: "/#contacto", changefreq: "weekly", priority: "0.9" },
  { loc: "/aboutpro", changefreq: "monthly", priority: "0.8" },
  { loc: "/insights", changefreq: "weekly", priority: "0.7" },
  { loc: "/insights/react", changefreq: "monthly", priority: "0.6" },
  { loc: "/insights/ux", changefreq: "monthly", priority: "0.6" },
  { loc: "/insights/branding", changefreq: "monthly", priority: "0.6" },
];

// 🧠 Generar estructura XML
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${domain}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

// 💾 Guardar sitemap en carpeta /public
const publicDir = path.resolve("public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml.trim());
console.log("✅ Sitemap actualizado correctamente:", path.join(publicDir, "sitemap.xml"));
