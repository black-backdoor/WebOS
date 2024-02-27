document.addEventListener('DOMContentLoaded', function() {
    // initial check
    setWifiStatus(navigator.onLine);
    console.info("[Connection] Initial check: ", navigator.onLine);

    // add event listeners
    window.addEventListener('online', function() {
        console.info("[Connection] Wifi is connected");
        setWifiStatus(true);
    });

    window.addEventListener('offline', function() {
        console.info("[Connection] Wifi is not connected");
        setWifiStatus(false);
    });
    
});







function setWifiStatus(status){
    if(typeof status !== 'boolean'){ console.warn("[setWifiStatus] Status should be a boolean  | input", typeof status); return; }

    const wifi = document.querySelector("#taskbar .menu .internet-access");
    const wifiIcon = document.querySelector("#taskbar .menu .internet-access img");
    const yes_src = wifiIcon.getAttribute("src-yes");
    const no_src = wifiIcon.getAttribute("src-no");

    const onlineTitle = wifi.getAttribute("online-title");
    const offlineTitle = wifi.getAttribute("offline-title");
    
    if(status) {
        wifiIcon.src = yes_src;
        wifi.title = onlineTitle;
        console.debug("[setWifiStatus] Wifi is connected");
    } else {
        wifiIcon.src = no_src;
        wifi.title = offlineTitle;
        console.debug("[setWifiStatus] Wifi is not connected");
    }
    
}
