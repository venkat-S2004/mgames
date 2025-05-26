const CACHE_NAME = "zentry-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/footer.html",
  "/about.html",
  "/beverages.html",
  "/cold.html",
  "/contact.html",
  "/gallery.html",
  "/game.html",
  "/snack.html",
  "/snacks.html",
  "/cod.jpg",
  "/img/bg.jpg",
  "/img/fb.png",
  "/img/gamplay.jpg",
  "/img/gimg.jpg",
  "/img/insta.png",
  "/img/logo.png",
  "/img/menu.jpg",
  "/img/menu2.jpg",
  "/img/menu3.jpg",
  "/img/sivakumar.png",
  "/img/war.jpg",
  "/img/web image.jpg",
  "/img/whatsapp.png",
  
];

// Install event: cache all necessary files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event: clean up old caches if any
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event: serve from cache or fetch online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Optionally return fallback content here
        })
      );
    })
  );
});
