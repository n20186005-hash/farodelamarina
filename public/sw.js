/* Faro de la Marina (Navy Lighthouse) — Service Worker
 * 轻量 PWA 缓存策略：
 *  - 导航请求：网络优先，离线时回退缓存
 *  - 静态资源（图片 / _next/static）：缓存优先，后台更新
 */
const CACHE_NAME = "farodelamarina-v1";
const PRECACHE_URLS = ["/", "/en", "/es", "/zh", "/qu", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // 导航请求：网络优先
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("/en")))
    );
    return;
  }

  // 静态资源：缓存优先
  const isStatic =
    url.pathname.startsWith("/gallery/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/_next/static/");

  if (!isStatic) return;

  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
    )
  );
});
