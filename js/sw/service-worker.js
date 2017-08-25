var currentCacheName = 'reviews-';

self.addEventListener('install', function(event) {

  var filesToCache = [
    './',
    './index.html',
    './restaurant.html',
    './js/dbhelper.js',
    //'./js/idb.min.js',
    './js/resraurant_info.js',
    './js/main.js',
    './data/restaurants.json',
    './assets/css/styles.css',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
  ];

  event.waitUntil(
    caches.open(currentCacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );

});


self.addEventListener('activate', function(event) {
  event.waitUntil(

    // Activate and make sure we upgrade if needed.
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {

          return cacheName.startsWith('reviews-') &&
            cacheName != currentCacheName;
        }).map(function(cacheName) {

          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});


self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
