/* eslint-disable no-restricted-globals */

// ─────────────────────────────────────────────────────────────
// ⚙️ Config
// ─────────────────────────────────────────────────────────────
const APP_VERSION = "v1.0.0"; // cambialo en cada release para forzar update
const STATIC_CACHE = `static-${APP_VERSION}`;
const RUNTIME_CACHE = `runtime-${APP_VERSION}`;
const OFFLINE_URL = "/offline.html";

// Lista mínima de precache. Agregá lo que quieras servir offline siempre.
const PRECACHE_URLS = [
  "/",
  "/index.html",
  OFFLINE_URL,
  "/manifest.json",
  // Íconos esenciales (asegurate que existan en /public)
  "/favicon-192.png",
  "/favicon-512.png",
  "/favicon-maskable.png",
];

// ─────────────────────────────────────────────────────────────
// 🚀 Install: precache de archivos core + navigation preload
// ─────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await cache.addAll(PRECACHE_URLS);
      // Habilita Navigation Preload (mejores TTFB al tener SW)
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
});

// ─────────────────────────────────────────────────────────────
// 👑 Activate: limpia caches viejos
// ─────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
          .map((key) => caches.delete(key))
      );
      self.clients.claim();
    })()
  );
});

// ─────────────────────────────────────────────────────────────
// 🔁 Mensajes desde la app (skipWaiting)
// ─────────────────────────────────────────────────────────────
self.addEventListener("message", (event) => {
  if (!event.data) return;
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

// ─────────────────────────────────────────────────────────────
// 🧠 Estrategias de cache helpers
// ─────────────────────────────────────────────────────────────
const isHTMLNavigation = (request) =>
  request.mode === "navigate" ||
  (request.method === "GET" &&
    request.headers.get("accept")?.includes("text/html"));

const isAssetRequest = (url) =>
  url.pathname.match(/\.(?:js|css|mjs|wasm)$/i);

const isImage = (url) =>
  url.pathname.match(/\.(?:png|jpg|jpeg|gif|webp|svg|ico)$/i);

const isFont = (url) =>
  url.pathname.match(/\.(?:woff|woff2|ttf|otf)$/i);

// ─────────────────────────────────────────────────────────────
// 🧵 Fetch: rutas y estrategias
//   - HTML (navegación): Network First + fallback offline
//   - JS/CSS: Stale-While-Revalidate
//   - Imágenes: Cache First con límite
//   - Fuentes: Cache First largo
//   - Otros GET: Network First a runtime cache
//   - POST/PUT/etc: pasan directo (no se cachea)
// ─────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo GET cacheamos
  if (request.method !== "GET") return;

  // 🧭 Navegación HTML
  if (isHTMLNavigation(request)) {
    event.respondWith(htmlStrategy(event));
    return;
  }

  // 📦 Archivos JS/CSS/wasm
  if (isAssetRequest(url)) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // 🖼 Imágenes
  if (isImage(url)) {
    event.respondWith(cacheFirstWithLimit(request, 80));
    return;
  }

  // 🔤 Fuentes
  if (isFont(url)) {
    event.respondWith(cacheFirstWithLimit(request, 40));
    return;
  }

  // 🌐 Resto de GET -> Network First
  event.respondWith(networkFirst(request));
});

// ─────────────────────────────────────────────────────────────
// 📚 Estrategias
// ─────────────────────────────────────────────────────────────
async function htmlStrategy(event) {
  try {
    // Navigation Preload si está disponible
    const preload = await event.preloadResponse;
    if (preload) return preload;

    // Network first
    const network = await fetch(event.request);
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(event.request, network.clone());
    return network;
  } catch {
    // Offline fallback
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(OFFLINE_URL);
    return cached || new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((res) => {
      cache.put(request, res.clone());
      return res;
    })
    .catch(() => cached);
  return cached || networkPromise;
}

async function cacheFirstWithLimit(request, maxEntries = 50) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const res = await fetch(request);
  cache.put(request, res.clone());
  trimCache(cache, maxEntries).catch(() => {});
  return res;
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const res = await fetch(request);
    cache.put(request, res.clone());
    return res;
  } catch {
    const cached = await cache.match(request);
    return cached || new Response(null, { status: 504 });
  }
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  const deletes = keys.slice(0, keys.length - maxEntries);
  await Promise.all(deletes.map((req) => cache.delete(req)));
}
