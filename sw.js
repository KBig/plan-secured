const VERSION = '20260606-223936';
const CACHE = 'plan-' + VERSION;

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
    // NOTE : on NE force PLUS le rechargement des fenetres (clients.navigate) — ca
    // entrait en collision avec le rendu du contenu dechiffre et figeait la page.
    // Le network-first ci-dessous suffit : la prochaine ouverture sert deja la
    // derniere version, sans rien casser.
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // Network-first : on bypass le cache HTTP pour avoir la version live.
      const fresh = await fetch(req, { cache: 'no-store' });
      if (fresh && fresh.ok) cache.put(req, fresh.clone());
      return fresh;
    } catch (err) {
      const cached = await cache.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const idx = (await cache.match('plan_complet_secured.html'))
                 || (await cache.match('index.html'));
        if (idx) return idx;
      }
      throw err;
    }
  })());
});
