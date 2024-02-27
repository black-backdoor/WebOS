## Cache
The cache is a very important part of a PWA. It allows the app to work offline and to load faster. Since WebOS should also work offline, the cache is very important. Which is why it is important to cache the right files and to update the cache when the app is updated.

### Caches
The App has tree caches.

1. Offline Page Cache
2. App Cache
3. Dynamic Cache


#### Offline Page Cache
Name: `offline-cache`

It caches the offline page and the favicon. The offline page is a simple HTML page with a message that the app is offline. The files will be downloaded when the app is installed.


#### App Cache
Name: `app-cache`

It caches the most important files of the app. This includes the HTML, CSS, JS, and images. The files will be downloaded when the app is installed.


#### Dynamic Cache
Name: `site-dynamic`

It caches the most recent 100 requests. This includes the HTML, CSS, JS, and images. The files will not be downloaded when the app is installed.