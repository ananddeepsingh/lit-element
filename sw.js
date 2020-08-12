// https://www.youtube.com/watch?v=E8BeSSdIUW4

const cacheName = "news-v1";
const staticAssets = [
  './',
  'index.html',
  'index.js',
  'manifest.webmanifest',
  'sw.js'
]

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
})

self.addEventListener('activate', event => {
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  // event.respondWith(
  //   caches.match(event.request, {ignoreSearch:true}).then(response => {
  //     return response || fetch(event.request);
  //   })
  // );
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req))
  }else{
    event.respondWith(networkAndCache(req))
  }
});

async function cacheFirst(req){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req)
}

async function networkAndCache(req){
  const cache = await caches.open(cacheName);
  try{
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh
  }catch(e){
    const cached = await cache.match(req);
    return cached
  }
}