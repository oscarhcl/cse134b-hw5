class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'image', 'image-alt', 'description', 'link', 'link-text', 'technologies', 'date'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const title = this.getAttribute('title') || 'Project Title';
        const image = this.getAttribute('image') || '';
        const imageAlt = this.getAttribute('image-alt') || 'Project image';
        const description = this.getAttribute('description') || '';
        const link = this.getAttribute('link') || '#';
        const linkText = this.getAttribute('link-text') || 'Learn More';
        const technologies = this.getAttribute('technologies') || '';
        const date = this.getAttribute('date') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-bg: var(--bg-primary, #ffffff);
                    --card-bg-secondary: var(--bg-secondary, #f5f5f5);
                    --card-text: var(--text-primary, #1f2937);
                    --card-text-secondary: var(--text-secondary, #6b7280);
                    --card-border: var(--border-color, #e5e7eb);
                    --card-primary: var(--primary-color, #2563eb);
                    --card-secondary: var(--secondary-color, #10b981);
                    --card-radius: var(--border-radius-md, 8px);
                    --card-spacing: var(--spacing-md, 1.5rem);
                    --card-spacing-sm: var(--spacing-sm, 1rem);
                    --card-spacing-xs: var(--spacing-xs, 0.5rem);
                    --card-animation: var(--animation-duration, 0.3s);

                    display: block;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    background-color: var(--card-bg);
                    border: 1px solid var(--card-border);
                    border-radius: var(--card-radius);
                    overflow: hidden;
                    transition: transform var(--card-animation) ease,
                                box-shadow var(--card-animation) ease,
                                border-color var(--card-animation) ease;
                    height: 100%;
                }

                .card:hover {
                    transform: translateY(-0.5rem);
                    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.12);
                    border-color: var(--card-primary);
                }

                .card-image {
                    position: relative;
                    width: 100%;
                    aspect-ratio: 16 / 10;
                    overflow: hidden;
                    background-color: var(--card-bg-secondary);
                }

                .card-image picture {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    transition: transform var(--card-animation) ease;
                }

                .card:hover .card-image img {
                    transform: scale(1.05);
                }

                .card-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: var(--card-spacing);
                    gap: var(--card-spacing-sm);
                }

                .card-header {
                    display: flex;
                    flex-direction: column;
                    gap: var(--card-spacing-xs);
                }

                h2 {
                    font-family: 'Merriweather', Georgia, serif;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: var(--card-text);
                    margin: 0;
                    line-height: 1.3;
                    transition: color var(--card-animation) ease;
                }

                .card:hover h2 {
                    color: var(--card-primary);
                }

                .date {
                    font-size: 0.875rem;
                    color: var(--card-text-secondary);
                    font-weight: 500;
                }

                .technologies {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.25rem;
                }

                .tech-tag {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    background-color: var(--card-bg-secondary);
                    color: var(--card-primary);
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    border: 1px solid var(--card-border);
                    transition: background-color var(--card-animation) ease,
                                color var(--card-animation) ease;
                }

                .card:hover .tech-tag {
                    background-color: var(--card-primary);
                    color: white;
                    border-color: var(--card-primary);
                }

                .description {
                    font-size: 0.9375rem;
                    line-height: 1.6;
                    color: var(--card-text-secondary);
                    flex: 1;
                }

                .card-footer {
                    margin-top: auto;
                    padding-top: var(--card-spacing-sm);
                }

                .card-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background-color: var(--card-primary);
                    color: white;
                    text-decoration: none;
                    border-radius: var(--card-radius);
                    font-size: 0.875rem;
                    font-weight: 600;
                    transition: background-color var(--card-animation) ease,
                                transform 0.2s ease,
                                box-shadow var(--card-animation) ease;
                }

                .card-link:hover {
                    background-color: color-mix(in srgb, var(--card-primary) 85%, black 15%);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                }

                .card-link:active {
                    transform: translateY(0);
                }

                .card-link svg {
                    width: 1rem;
                    height: 1rem;
                    transition: transform 0.2s ease;
                }

                .card-link:hover svg {
                    transform: translateX(3px);
                }

                @media (max-width: 480px) {
                    .card-content {
                        padding: var(--card-spacing-sm);
                    }

                    h2 {
                        font-size: 1.125rem;
                    }

                    .description {
                        font-size: 0.875rem;
                    }

                    .tech-tag {
                        font-size: 0.6875rem;
                        padding: 0.2rem 0.5rem;
                    }
                }
            </style>

            <article class="card">
                <div class="card-image">
                    <picture>
                        <img src="${image}" alt="${imageAlt}" loading="lazy">
                    </picture>
                </div>
                <div class="card-content">
                    <div class="card-header">
                        <h2>${title}</h2>
                        ${date ? `<span class="date">${date}</span>` : ''}
                        ${technologies ? `
                            <div class="technologies">
                                ${technologies.split(',').map(tech => `<span class="tech-tag">${tech.trim()}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <p class="description">${description}</p>
                    <div class="card-footer">
                        <a href="${link}" class="card-link" target="_blank" rel="noopener noreferrer">
                            ${linkText}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </article>
        `;
    }
}

customElements.define('project-card', ProjectCard);
