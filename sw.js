const CACHE_NAME = 'student-organizer-v1';
const urlsToCache = [
    './student_organizer.html',
    './manifest.json',
    // In a real scenario, you would need to include your icon files here too:
    // './icon-192.png',
    // './icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Failed to cache files during install:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Fallback to network
        return fetch(event.request);
      }
    )
  );
});
