const CACHE_NAME = "janmitra-static-v1";

// Core files that should always be available offline.
// Vite hashes JS/CSS filenames on build, so we only pre-cache the shell here;
// runtime caching (below) picks up the rest as the user visits pages.
const CORE_ASSETS = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Runtime caching strategy:
// - For navigation requests (page loads): try network first, fall back to cache.
// - For static assets (JS/CSS/images): cache first, fall back to network.
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Never intercept API calls — those need live data or should fail
  // explicitly so the app can show its own offline UI / cached scheme data.
  if (request.url.includes("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            request.method === "GET" &&
            request.url.startsWith(self.location.origin)
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});