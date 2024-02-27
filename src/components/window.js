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



/*
    Dragging windows

    1. Add a mousedown event listener to the header of each window
    2. When the mouse button is pressed, add a dragging class to the window and body
    3. Calculate the initial offset from the top-left corner of the window
    4. Add a mousemove event listener to update the window position
    5. Add a mouseup event listener to stop tracking cursor movement
    6. Remove the event listeners when the mouse button is released
*/


document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('app-window');
    windows.forEach(function (windowElement) {
        // Add mousedown event listeners to each window to start tracking cursor movement
        // the event listeners are added to the header of the window
        const windowHead = windowElement.querySelector('app-window > header');
        windowHead.addEventListener('mousedown', function (e) {
            /* add dragging class to the window */
            windowElement.classList.add('dragging');
            document.body.classList.add('window-dragging')

            // Calculate the initial offset from the top-left corner of the window
            let offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            let offsetY = e.clientY - windowElement.getBoundingClientRect().top;

            // Add a mousemove event listener to update the window position
            function moveWindow(e) {
                // Set the window position based on the cursor position
                windowElement.style.left = e.clientX - offsetX + 'px';
                windowElement.style.top = e.clientY - offsetY + 'px';
            }

            // Add a mouseup event listener to stop tracking cursor movement
            function stopMoving() {
                windowElement.classList.remove('dragging');
                document.body.classList.remove('window-dragging')

                // Remove the event listeners when the mouse button is released
                document.removeEventListener('mousemove', moveWindow);
                document.removeEventListener('mouseup', stopMoving);
            }

            // Attach the event listeners
            document.addEventListener('mousemove', moveWindow);
            document.addEventListener('mouseup', stopMoving);
        });
    });
});

