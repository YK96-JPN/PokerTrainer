// ポーカー道場 Service Worker
// 更新を配る時は CACHE のバージョン番号を上げること(例: v1 → v2)
const CACHE = "poker-dojo-pwa-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./dojo.html",
  "./cash.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const isHTML = e.request.mode === "navigate" || e.request.url.endsWith(".html");
  if (isHTML) {
    // HTMLはネットワーク優先(更新が届く)、オフライン時はキャッシュ
    e.respondWith(
      fetch(e.request)
        .then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return res; })
        .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
  } else {
    // その他はキャッシュ優先
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return res;
      }))
    );
  }
});
