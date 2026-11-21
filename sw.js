const V='metro-v6',ARCH=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARCH)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  // primero la red (así siempre llega la versión nueva); sin internet, lo guardado
  e.respondWith(fetch(e.request).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(ch=>ch.put(e.request,c))}return x}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
