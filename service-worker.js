const CACHE_NAME = "plinko-cache-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "service-worker.js"
  // يمكنك إضافة روابط لملفات CSS/JS إضافية أو الصور هنا
  // مثال: "icons/icon-192x192.png",
  // مثال: "icons/icon-512x512.png"
];

// تثبيت Service Worker وتخزين الملفات المطلوبة في الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// اعتراض طلبات الشبكة وتقديم المحتوى من الكاش إن وجد
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
