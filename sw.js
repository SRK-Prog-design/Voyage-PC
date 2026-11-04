const C='nssl-voyage-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(res=>{const u=new URL(e.request.url);if((res.ok||res.type==='opaque')&&(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com')){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>hit||caches.match('index.html'));return hit||net}))});
