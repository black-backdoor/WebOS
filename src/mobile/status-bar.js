// ----------------- Clock -----------------
document.addEventListener('DOMContentLoaded', function () {
    const timeElement = document.querySelector('.mobile#status-bar .time .time');

    setInterval( function () {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        timeElement.innerText = time;
    }, 1000);
});