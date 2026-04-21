<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    type PortfolioCase = {
        title: string;
        category: string;
        highlight: string;
        tag: string;
        image: string;
        details: string[];
        website?: string;
    };

    export let featuredCases: PortfolioCase[] = [];
    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');
</script>

<section class="section featured-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="section-heading">
            <h2>Trabajos que hablan por sí mismos</h2>
            <p class="section-subtitle">
                Un portafolio enfocado en proyectos reales, landing pages de alto impacto y ecommerce que generan ventas.</p>
        </div>

        <div class="portfolio-gallery">
            {#each featuredCases as project}
                <article class="gallery-card animate-on-scroll">
                    <div class="gallery-image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                        <div class="gallery-overlay">
                            <span>{project.category}</span>
                            <h3>{project.title}</h3>
                        </div>
                    </div>
                </article>
            {/each}
        </div>

        <div class="featured-grid">
            {#each featuredCases as project}
                <article class="project-card animate-on-scroll">
                    <div class="project-image">
                        <img src={project.image} alt={project.title} loading="lazy" />
                    </div>
                    <div class="project-body">
                        <div class="project-label">{project.category}</div>
                        <h3>{project.title}</h3>
                        <p>{project.highlight}</p>
                        <ul class="project-details">
                            {#each project.details as detail}
                                <li>{detail}</li>
                            {/each}
                        </ul>
                        <span class="project-tag">{project.tag}</span>
                        {#if project.website}
                            <a class="project-link" href={project.website} target="_blank" rel="noreferrer">Visitar sitio</a>
                        {/if}
                    </div>
                </article>
            {/each}
        </div>

        <div class="cta-block">
            <div>
                <h3>Tu sitio web profesional comienza aquí</h3>
                <p>Diseñamos y desarrollamos experiencias digitales que conectan con clientes y elevan tu posicionamiento online.</p>
            </div>
            <a href="/contacto" class="cta-button">Solicitar presupuesto</a>
        </div>
    </div>
</section>

<style>
    .featured-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background: linear-gradient(180deg, rgba(27, 30, 41, 0.95) 0%, rgba(11, 14, 20, 0.98) 100%);
    }

    .portfolio-gallery {
        display: grid;
        grid-template-columns: repeat(3, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    .gallery-card {
        border-radius: 26px;
        overflow: hidden;
        background: rgba(255,255,255,0.04);
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.16);
    }

    .gallery-image {
        position: relative;
        min-height: 320px;
        overflow: hidden;
    }

    .gallery-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.4s ease;
    }

    .gallery-card:hover .gallery-image img {
        transform: scale(1.03);
    }

    .gallery-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.8rem;
        background: linear-gradient(180deg, rgba(11, 14, 20, 0) 0%, rgba(11, 14, 20, 0.88) 100%);
    }

    .gallery-overlay span {
        color: var(--color-primary);
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        margin-bottom: 0.75rem;
        font-weight: 700;
    }

    .gallery-overlay h3 {
        margin: 0;
        font-size: clamp(1.4rem, 2.5vw, 2rem);
        color: var(--color-text-light);
        line-height: 1.1;
    }

    .featured-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    .project-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        padding: 0;
        border-radius: 28px;
        display: flex;
        flex-direction: column;
        gap: 0;
        min-height: 420px;
        box-shadow: 0 30px 90px rgba(0,0,0,0.18);
        transition: transform 0.25s ease, border-color 0.25s ease;
        overflow: hidden;
    }

    .project-card:hover {
        transform: translateY(-6px);
        border-color: rgba(73,228,176,0.25);
    }

    .project-image {
        position: relative;
        min-height: 220px;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(11,14,20,0.94), transparent 0%);
    }

    .project-image img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        display: block;
        filter: saturate(1.05);
        transition: transform 0.35s ease;
    }

    .project-card:hover .project-image img {
        transform: scale(1.03);
    }

    .project-body {
        padding: 1.9rem 2rem 2rem;
        display: grid;
        gap: 1rem;
    }

    .project-label {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.72rem;
        color: var(--color-primary);
        font-weight: 700;
    }

    .project-details {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 0.75rem;
        color: var(--color-text-muted);
    }

    .project-details li::before {
        content: '•';
        margin-right: 0.75rem;
        color: var(--color-primary);
    }

    .project-card h3 {
        margin: 0;
        font-size: 1.45rem;
    }

    .project-card p {
        color: var(--color-text-muted);
        line-height: 1.9;
        margin: 0;
        flex-grow: 1;
    }

    .project-tag {
        display: inline-flex;
        padding: 0.55rem 1rem;
        background: rgba(73, 228, 176, 0.12);
        color: var(--color-primary);
        border-radius: 999px;
        font-size: 0.9rem;
        font-weight: 700;
        align-self: start;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.8rem;
        padding: 0.9rem 1.2rem;
        border-radius: 12px;
        background: rgba(73,228,176,0.14);
        color: var(--color-primary);
        font-weight: 700;
        text-decoration: none;
        transition: transform 0.2s ease, background 0.2s ease;
    }

    .project-link:hover {
        transform: translateY(-1px);
        background: rgba(73,228,176,0.22);
    }

    .cta-block {
        display: grid;
        grid-template-columns: 1.8fr 1fr;
        align-items: center;
        gap: 1.5rem;
        padding: 2.5rem;
        border-radius: 24px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
    }

    .cta-block h3 {
        margin: 0 0 0.8rem;
        font-size: 2rem;
    }

    .cta-block p {
        margin: 0;
        color: var(--color-text-muted);
        line-height: 1.8;
    }

    .cta-button {
        justify-self: end;
        background: linear-gradient(90deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        padding: 1rem 1.8rem;
        border-radius: 14px;
        font-weight: 800;
        border: none;
        transition: transform 0.28s ease;
    }

    .cta-button:hover {
        transform: translateY(-3px);
    }

    @media (max-width: 980px) {
        .featured-grid,
        .cta-block {
            grid-template-columns: 1fr;
        }
        .cta-button {
            justify-self: stretch;
        }
    }
</style>
