class ProgressBar extends HTMLElement {
    css = () => {
        return `
            /* COLORS */
            :host {
                /* PROGRESSBAR SPECIFIC COLORS */
                --progressbar-color: #007bff;
                --progressbar-height: 1rem;
                --progressbar-border-color: transparent;
                --progressbar-border-radius: ${this.bar_style === 'round' ? '1rem' : '0rem'};
            }
            
            :host {
                height: 2rem;
                width: 100%;
                display: flex;
                align-items: center;
            }
            
            .bar {
                width: 100%;
                height: var(--progressbar-height);
                border: 1px solid var(--progressbar-border-color);
                border-radius: var(--progressbar-border-radius);
            }
            
            .fill {
                width: 0%;
                height: 100%;
                background-color: var(--progressbar-color);
                border-radius: var(--progressbar-border-radius);
            }
        `;
    }

    template = () => {
        return `
        <div class="bar" title="${this.percent}%">
            <div class="fill"></div>
        </div>
        `;
    }


    static get observedAttributes() {
        return ['percent'];
    }


    constructor() {
        super();

        // #007bff == is blue
        this.color = this.getAttribute('bar-color') || '#007bff';
        this.bar_style = this.getAttribute('bar-style') || 'round';

        console.log(this.color, this.bar_style);

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }


    /* SET & GET progressbar percent */
    get percent() {
        const percent = this.getAttribute('percent');

        // basic validation
        if(isNaN(percent)) return 0;
        if(percent < 0) return 0;
        if(percent > 100) return 100;


        return Number(percent);
    }

    set percent(value) {
        this.setAttribute('percent', value);
    }


    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'percent') {
            this.shadowRoot.querySelector('.fill').style.width = `${newValue}%`;
        }
    }
}

customElements.define('progress-bar', ProgressBar);