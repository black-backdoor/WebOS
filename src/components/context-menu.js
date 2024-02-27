document.addEventListener("DOMContentLoaded", function() {
    const contextMenu = document.querySelector('#context-menu');
    const scope = document.querySelector('body');

    scope.addEventListener('contextmenu', function(event) {
        event.preventDefault();

        const { clientX: mouseX, clientY: mouseY } = event;

        contextMenu.style.top = `${mouseY}px`;
        contextMenu.style.left = `${mouseX}px`;

        // ? if right-clicked again, the context menu will close and reopen at the new position.
        contextMenu.classList.remove('visible');

        setTimeout(() => {
            contextMenu.classList.add('visible');
        });
    });

    scope.addEventListener('click', function(event) {
        if(event.target.offsetParent !== contextMenu) {
            contextMenu.classList.remove('visible');
        }
    });
});


