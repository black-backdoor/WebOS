/* ----------- EVENT LOGS ----------- */
self.addEventListener("install", function(event) {
    console.debug("%cService Worker: %cInstalled", "color: lightblue", "color: green");
});

self.addEventListener("activate", function(event) {
    console.log("%cService Worker: %cActivated", "color: lightblue", "color: inherit");
});

