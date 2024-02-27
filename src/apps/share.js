document.addEventListener('DOMContentLoaded', function() {
    const shareApp = document.querySelector('#taskbar > .apps .app.share');
    const shareAppButton = document.querySelector('#taskbar > .apps .app.share button');
    const shareButtonIMG = document.querySelector('#taskbar > .apps .app.share button img');
    
    shareAppButton.addEventListener('click', async function() {
        shareApp.classList.add("running");
        

        const error = function() {
            shareApp.classList.add("alert");
            setInterval(function() { shareApp.classList.remove("alert"); }, 2000);
        };

        const clipboard = function() {
            /* change button icon for user feedback */
            let oldSRC = shareButtonIMG.src;
            let newSRC = shareButtonIMG.getAttribute('copied');

            shareButtonIMG.src = newSRC;

            setTimeout(() => { shareButtonIMG.src = oldSRC; }, 500);
        };

        await share(clipboard, undefined, error);

        shareApp.classList.remove("running");
    });
});