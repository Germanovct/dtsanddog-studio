const CACHE_NAME = "dtsanddog-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json", "/favicon.png"];

// 🧩 Instalación del SW
self.addEventListener("install", (event) => {
  console.log("📦 Instalando Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Archivos cacheados correctamente");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Se activa sin esperar
});

// ⚡ Activación y limpieza de versiones antiguas
self.addEventListener("activate", async (event) => {
  console.log("⚡ Activando nuevo Service Worker...");
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      );
      console.log("🧹 Cache antiguo eliminado");

      // ✅ Solo habilitamos navigation preload si el navegador lo soporta
      if (self.registration.navigationPreload) {
        try {
          await self.registration.navigationPreload.enable();
          console.log("🚀 Navigation Preload habilitado");
        } catch (err) {
          console.warn("⚠️ Navigation Preload no disponible aún:", err.message);
        }
      }

      await self.clients.claim();
    })()
  );
});

// 🌍 Fetch con estrategia de cache-first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const preloadResponse = await event.preloadResponse;
      if (preloadResponse) {
        return preloadResponse;
      }

      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      try {
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.error("❌ Error al obtener recurso:", error);
        return caches.match("/index.html");
      }
    })()
  );
});
