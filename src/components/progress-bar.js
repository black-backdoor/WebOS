class ProgressBar extends HTMLElement {
    constructor() {
        super();
        
        this.bar_style = this.getAttribute('bar-style') || 'round';
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    css() {
        return `
            /* COLORS */
            :host {
                /* PROGRESSBAR SPECIFIC COLORS */
                --progressbar-color: #007bff;
                --progressbar-bgcolor: transparent;
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
                background-color: var(--progressbar-bgcolor);
            }
            
            .fill {
                width: 0%;
                height: 100%;
                background-color: var(--progressbar-color);
                border-radius: var(--progressbar-border-radius);
            }
        `;
    }

    template() {
        return `
            <div class="bar" title="${this.getAttribute('percent')}%">
                <div class="fill" style="width: ${this.getAttribute('percent')}%"></div>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['percent'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'percent') {
            // Basic validation -> before setting the value
            if (isNaN(newValue)) newValue = 0;
            if (newValue < 0) newValue = 0;
            if (newValue > 100) newValue = 100;

            this.render();
            this.shadowRoot.querySelector('.fill').style.width = `${newValue}%`;
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css().trim()}</style>
            ${this.template().trim()}
        `;
    }

    // Getter and Setter for percent attribute
    get percent() {
        const percent = this.getAttribute('percent');
        return Number(percent);
    }

    set percent(value) {
        this.setAttribute('percent', value);
    }
}

customElements.define('progress-bar', ProgressBar);
