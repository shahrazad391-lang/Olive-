const CACHE = 'zarrai-v3';
const ASSETS = [
  './', './index.html', './css/app.css',
  './js/app.js', './js/i18n.js', './js/vision.js',
  './js/plants.js', './js/diseases.js', './js/diagnosis.js', './js/db.js',
  './manifest.json', './icons/icon-192.svg', './icons/icon-512.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request));
    return;
  }
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).catch(() => c)));
});