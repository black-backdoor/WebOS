class AppWindow extends HTMLElement {
    template() {
        const window_title = this.getAttribute('window-title') || 'Window';
        return `
        <header title="${window_title}">
            <section class="controls">
                <button title="close" class="close"></button>
                <button title="minimize" class="minimize"></button>
                <button title="maximize" class="maximize"></button>
            </section>
            <h3 class="title">${window_title}</h3>
        </header>
        <main>
            ${this.content}
        </main>
        <footer></footer>
        `;
    }

    render() {
        /* get current content */
        this.content = this.querySelector("app-window > main")?.innerHTML || this.content;
       
        /* render the window */        
        this.innerHTML = this.template().trim();
        
        /*
        this.style.height = this.size.height;
        this.style.width = this.size.width;
        */
    }

    constructor () {
        super();

        /* this.content contains the content of the window */
        this.content = this.innerHTML;

        /*
        this.position = { x: 0, y: 0 };
        this.size = { width: "700px", height: "600px" };
        */

        /* clean input */
        /*if(this.size.width < 120) { this.size.width = 142; }
        if(this.size.height < 120) { this.size.height = 142; }*/

        this.render();
    }

    static get observedAttributes() {
        /* return an array of attribute names to monitor for changes */
        return ['window-title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        /* update the window if a attribute changes */
        this.render();
    }

    set window_title(value) {
        this.setAttribute('window-title', value);
    }
    get window_title() {
        return this.getAttribute('window-title');
    }
}

customElements.define('app-window', AppWindow);






// WINDOW OVERLAP
var zIndexCounter = 1;

function resetZIndex() {
    const elements = document.querySelectorAll('app-window');
    zIndexCounter = 0;

    elementsDict = {};
    elements.forEach(item => {
        elementsDict[item.style.zIndex] = item;
    });

    const sortedElements = Object.entries(elementsDict)
        .sort((a, b) => b[0] - a[0])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});


    for (const [key, value] of Object.entries(sortedElements)) {
        value.style.zIndex = zIndexCounter++;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const desktop = document.querySelector("#desktop");
    const windows = document.querySelectorAll('app-window');
    windows.forEach(function (windowElement) {
        // DRAGGING WINDOWS (MOUSE) / (TOUCH)
        const windowHead = windowElement.querySelector('app-window > header');
        const windowControls = windowElement.querySelector('app-window > header > .controls');
        windowHead.addEventListener('mousedown', startDragging);
        windowHead.addEventListener('touchstart', startDragging);

        function startDragging(e) {
            // don't drag the window if the user clicks on the controls (close, minimize, maximize)
            if (e.target == windowControls || windowControls.contains(e.target)) {
                return;
            }

            // add dragging class to the window
            windowElement.classList.add('dragging');
            document.body.classList.add('window-dragging');

            // Calculate the initial offset from the top-left corner of the window
            let offsetX, offsetY;
            if (e.type === 'mousedown') {
                offsetX = e.clientX - windowElement.getBoundingClientRect().left;
                offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            } else if (e.type === 'touchstart') {
                offsetX = e.touches[0].clientX - windowElement.getBoundingClientRect().left;
                offsetY = e.touches[0].clientY - windowElement.getBoundingClientRect().top;
            }

            if ( windowElement.classList.contains('fullscreen') ) { 
                // ! order of these two lines is important !
                // ? we need the width of the window in non-fullscreen mode since else the windowElement.offsetWidth will be the width of the screen
                windowElement.classList.remove('fullscreen');
                offsetX = (windowElement.offsetWidth / 2);
            }

            windowElement.style.zIndex = zIndexCounter++;
            if(zIndexCounter > (windows.length * 2)) {
                resetZIndex();
            }

            // Add a move event listener to update the window position
            function moveWindow(e) {
                let clientX, clientY;
                if (e.type === 'mousemove') {
                    clientX = e.clientX;
                    clientY = e.clientY;
                } else if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                }

                // Set the window position based on the cursor position
                let x = clientX - offsetX;
                let y = clientY - offsetY;

                // don't let the window go outside the screen
                if(x < 0) x = 0;  // don't let the window go outside the left edge of the screen
                if(y < 0) y = 0;  // don't let the window go outside the top edge of the screen

                if(y > (desktop.offsetHeight - 50)) y = desktop.offsetHeight - 50;  // don't let the window go outside the bottom edge of the screen
                if(x > (desktop.offsetWidth - 100)) x = desktop.offsetWidth - 100;  // don't let the window go outside the right edge of the screen

                windowElement.style.left = x + 'px';
                windowElement.style.top = y + 'px';
            }

            // Add a stop event listener to stop tracking cursor movement
            function stopMoving() {
                windowElement.classList.remove('dragging');
                document.body.classList.remove('window-dragging');

                // Remove the event listeners when the mouse button is released
                document.removeEventListener('mousemove', moveWindow);
                document.removeEventListener('mouseup', stopMoving);
                document.removeEventListener('touchmove', moveWindow);
                document.removeEventListener('touchend', stopMoving);

                saveWindows();
            }

            // Attach the event listeners
            document.addEventListener('mousemove', moveWindow);
            document.addEventListener('mouseup', stopMoving);
            document.addEventListener('touchmove', moveWindow);
            document.addEventListener('touchend', stopMoving);
        }
    });
});



// STORING WINDOW POSITIONS AND SIZES
function saveWindows() {
    let windowsStorage = [];

    const windows = document.querySelectorAll('app-window');
    
    windows.forEach(function (windowElement) {
        // save the position and size of each window
        windowsStorage.push({ 
            x: windowElement.style.left,
            y: windowElement.style.top,
            width: windowElement.style.width,
            height: windowElement.style.height
        });
    });

    // save the windows to local storage
    sessionStorage.setItem('windows', JSON.stringify(windowsStorage));
}


function loadWindows() {
    let windowsStorage = sessionStorage.getItem('windows') || "";
    if (windowsStorage == "") { return; }

    windowsStorage = JSON.parse(windowsStorage);
    if (windowsStorage.length == 0) { return; }

    const windows = document.querySelectorAll('app-window');

    windowsStorage.forEach(function (window) {
        const index = windowsStorage.indexOf(window);
        windows[index].style.left = window.x;
        windows[index].style.top = window.y;
        windows[index].style.width = window.width;
        windows[index].style.height = window.height;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadWindows();
});





