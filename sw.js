const VERSION = '20260606-220754';
const CACHE = 'plan-' + VERSION;

self.addEventListener('install', (e) => { self.skipWaiting(); });

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    const hadOld = keys.some((k) => k !== CACHE);  // true => c'est une MISE A JOUR
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
    // AUTO-UPDATE : si une ancienne version existait, on force le rechargement de
    // TOUTES les fenetres ouvertes -> elles servent la nouvelle version SANS aucune
    // action de l'utilisateur. Corrige le cas PWA iOS qui "reprend" la page en cache.
    // (skip au 1er install : pas d'ancien cache -> pas de reload inutile.)
    if (hadOld) {
      const wins = await self.clients.matchAll({ type: 'window' });
      for (const w of wins) { try { await w.navigate(w.url); } catch (e) {} }
    }
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
