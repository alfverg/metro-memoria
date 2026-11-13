const V='metro-v1',ARCH=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(ARCH)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  // primero lo guardado (funciona sin internet); en segundo plano se actualiza
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const red=fetch(e.request).then(x=>{if(x.ok)caches.open(V).then(c=>c.put(e.request,x.clone()));return x}).catch(()=>r);return r||red}))});
