<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';
    
    const observeSections = getContext<Action<HTMLElement>>('scrollObserverAction');

    const projects = [
        {
            title: 'Plataforma Analítica IA',
            description: 'Un dashboard de alto rendimiento para visualización de datos en tiempo real, impulsado por SvelteKit.',
            tech: ['SvelteKit', 'D3.js', 'PostgreSQL'],
            link: '#'
        },
        {
            title: 'E-commerce Modular B2B',
            description: 'Solución de comercio electrónico escalable con microservicios y una interfaz React ultra-rápida.',
            tech: ['React', 'Node.js', 'Stripe'],
            link: '#'
        },
        {
            title: 'Aplicación Móvil Híbrida',
            description: 'Aplicación multiplataforma para gestión de equipos, con una experiencia de usuario nativa y fluida.',
            tech: ['Angular', 'Capacitor', 'Firebase'],
            link: '#'
        }
    ];
</script>

<section class="section projects-section" id="projects">
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>Nuestros <span class="gradient-title">Proyectos Destacados</span></h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>La prueba de nuestra maestría. Soluciones reales, impactantes y técnicamente sofisticadas.</p>

        <div class="projects-grid">
            {#each projects as project, i}
                <a href={project.link} class="project-card animated-content-ratio" 
                   use:observeSections
                   style={`transition-delay: ${i * 0.15}s;`}>
                    
                    <div class="project-content">
                        <h3 class="project-title">{project.title}</h3>
                        <p class="project-description">{project.description}</p>
                        <div class="project-tech">
                            {#each project.tech as tech}
                                <span>{tech}</span>
                            {/each}
                        </div>
                    </div>
                    <i class="fas fa-external-link-alt project-link-icon"></i>
                </a>
            {/each}
        </div>
        
        <div class="view-more-container animated-content-ratio" use:observeSections>
            <button class="view-more-button">
                Ver todos los casos de éxito <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</section>

<style>
    .projects-section {
        background-color: var(--color-background);
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 4rem;
    }

    .project-card {
        display: flex;
        justify-content: space-between;
        background-color: var(--color-surface);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        text-decoration: none;
        color: var(--color-text-light);
    }
    
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(73, 228, 176, 0.15);
        border-color: var(--color-primary);
    }

    .project-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: var(--color-primary);
    }

    .project-description {
        color: var(--color-text-muted);
        margin-bottom: 1rem;
        font-size: 0.95rem;
    }

    .project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .project-tech span {
        background-color: rgba(73, 228, 176, 0.1);
        color: var(--color-primary);
        padding: 0.3rem 0.7rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .project-link-icon {
        color: var(--color-text-muted);
        font-size: 1.2rem;
        transition: color 0.3s ease;
    }
    
    .project-card:hover .project-link-icon {
        color: var(--color-primary);
    }
    
    .view-more-container {
        text-align: center;
        margin-top: 4rem;
    }
    
    .view-more-button {
        background: none;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        padding: 10px 25px;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    .view-more-button:hover {
        background-color: var(--color-primary);
        color: var(--color-background);
    }
    
    .view-more-button i {
        margin-left: 8px;
    }
</style>