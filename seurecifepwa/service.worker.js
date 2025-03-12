const CACHE_NAME = 'Seu Recife'; 
const urlsToCache = [
  '/',
  '/index.html',
  'bem_vindo.html',
  '/css/style.css',
  '/css/style.scss',
  '/images/bg_1.webp',
  '/images/icons/196.png',
  '/images/icons/512.png',
  '/images/icons/72.png',
  '/images/icons/92.png',
  '/images/icons/144.png',
  '/images/icons/180.png',
  '/fonts/material-design-icon-font/css/',
  'fonts/material-design-iconic-font/css/material-design-iconic-font.css',
  '/fonts/material-design-iconic-font/css/material-design-iconic-font.min.css',
  '/fonts/poppins/Poppins-Regular.ttf',
  '/fonts/poppins/Poppins-SemiBold.ttf',
  '/manifest.json',
 

  
  
];


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.add(urlsToCache);
      })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]; 

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); 
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          
          return cachedResponse;
        }

        
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
      });
    });
  })
);
});
