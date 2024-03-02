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


document.addEventListener('DOMContentLoaded', function() {
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
                windowElement.style.left = clientX - offsetX + 'px';
                windowElement.style.top = clientY - offsetY + 'px';
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
            }

            // Attach the event listeners
            document.addEventListener('mousemove', moveWindow);
            document.addEventListener('mouseup', stopMoving);
            document.addEventListener('touchmove', moveWindow);
            document.addEventListener('touchend', stopMoving);
        }
    });
});


