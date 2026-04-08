<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Action } from 'svelte/action';

	const observeSections = getContext<Action<HTMLElement>>('scrollObserverAction'); // Acción para observar el scroll

	// Mapa de tecnologías a iconos de Font Awesome para un toque más visual
	const techIcons: { [key: string]: string } = {
		SvelteKit: 'fas fa-cogs',
		'D3.js': 'fas fa-chart-bar',
		PostgreSQL: 'fas fa-database', // Este es un comentario de ejemplo
		React: 'fab fa-react',
		'Node.js': 'fab fa-node-js',
		Stripe: 'fab fa-stripe-s',
		Angular: 'fab fa-angular',
		Capacitor: 'fas fa-mobile-alt',
		Firebase: 'fas fa-fire'
	};

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

	let sectionElement: HTMLElement;

	// onMount se ejecuta después de que el componente se ha renderizado en el DOM.
	// Es el lugar seguro para interactuar con elementos del DOM.
	onMount(() => {
		// Seleccionamos las tarjetas de proyecto que están DENTRO de este componente.
		const cards = sectionElement.querySelectorAll('.project-card');

		cards.forEach((card) => {
			card.addEventListener('mousemove', (e: MouseEvent) => {
				const rect = (card as HTMLElement).getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				(card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
				(card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
			});
		});
	});
</script>

<section class="section projects-section" id="projects" bind:this={sectionElement}>
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>
            Nuestros <span class="gradient-title">Proyectos Destacados</span>
        </h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>
            La prueba de nuestra maestría. Soluciones reales, impactantes y técnicamente
            sofisticadas.
        </p>

        <div class="projects-grid">
            {#each projects as project, i}
                <div
                    class="project-card animated-content-ratio"
                    use:observeSections
                    style={`--delay: ${i * 0.1}s`}
                >
                    <div class="project-header">
                        <i class="fas fa-folder-open project-icon"></i>
                        <a href={project.link} class="project-link-icon" aria-label="Ver proyecto">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">{project.title}</h3>
                        <p class="project-description">{project.description}</p>
                    </div>
                    <div class="project-tech">
                        {#each project.tech as tech}
                            <span><i class={techIcons[tech] || 'fas fa-microchip'}></i> {tech}</span>
                        {/each}
                    </div>
                </div>
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
        /* Fondo con un gradiente sutil para dar profundidad */
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
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
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0));
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px); /* Para Safari */
        position: relative;
        overflow: hidden;
        animation-delay: var(--delay); /* Retraso de animación individual */
    }

	.project-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1), transparent 40%);
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
    }

	.project-card:hover::before {
        opacity: 1;
    }

	.project-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(73, 228, 176, 0.2);
        border-color: rgba(73, 228, 176, 0.4);
    }

	.project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

	.project-icon {
        font-size: 2rem;
        color: var(--color-primary);
        opacity: 0.8;
    }

	.project-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
        color: var(--color-text-light);
    }

	.project-content {
        flex-grow: 1;
    }

	.project-description {
        color: var(--color-text-muted);
        margin-bottom: 1.5rem;
        font-size: 1rem;
        line-height: 1.6;
    }

	.project-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: auto; /* Empuja las tecnologías al final de la tarjeta */
    }

	.project-tech span {
        background-color: rgba(73, 228, 176, 0.1);
        color: var(--color-primary);
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 500;
		display: inline-flex;
        align-items: center;
        gap: 0.4rem;
    }

	.project-link-icon {
        font-size: 1.2rem;
        color: var(--color-text-muted);
        transition: transform 0.3s ease, color 0.3s ease;
    }

	.project-card:hover .project-link-icon {
        color: var(--color-primary);
        transform: scale(1.2);
    }

    .view-more-container {
        text-align: center;
        margin-top: 4rem;
    }

	.view-more-button {
        background: linear-gradient(90deg, var(--color-primary), #00BFFF);
        color: var(--color-background);
        border: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        box-shadow: 0 4px 15px rgba(73, 228, 176, 0.2);
    }

	.view-more-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(73, 228, 176, 0.3);
    }

	.view-more-button i {
        margin-left: 8px;
        transition: transform 0.3s ease;
    }

	.view-more-button:hover i {
        transform: translateX(4px);
    }
</style>