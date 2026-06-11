// Service worker d'auto-desinscription (le SW a ete retire du projet).
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    // Recharge les fenetres UNE fois pour repartir sans SW (page fraiche du reseau).
    try {
      const wins = await self.clients.matchAll({ type: 'window' });
      for (const w of wins) { try { await w.navigate(w.url); } catch (e) {} }
    } catch (e) {}
  })());
});
// PAS de handler 'fetch' -> toutes les requetes vont directement au reseau (frais).
