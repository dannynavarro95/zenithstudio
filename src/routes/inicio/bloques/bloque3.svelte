<script lang="ts">
	import { getScrollObserverAction } from '$lib/scrollObserverContext';

	const observeSections = getScrollObserverAction();

	const techIcons: { [key: string]: string } = {
		SvelteKit: 'fas fa-cogs',
		'SEO Técnico': 'fas fa-magnifying-glass-chart',
		HubSpot: 'fas fa-bullseye',
		'React + Vite': 'fab fa-react',
		Shopify: 'fab fa-shopify',
		Stripe: 'fab fa-stripe-s',
		'Next.js': 'fas fa-layer-group',
		'GA4': 'fas fa-chart-line',
		'Meta Ads': 'fab fa-meta'
	};

	const projects = [
		{
			title: 'Rebranding web para Glow Studio',
			result: '+68% en reservas mensuales',
			description:
				'Rediseño de experiencia, velocidad y narrativa comercial para elevar percepción de marca y conversión.',
			tech: ['SvelteKit', 'SEO Técnico', 'HubSpot'],
			link: '/portfolio'
		},
		{
			title: 'Ecommerce para Roma Atelier',
			result: '+27% en conversión de checkout',
			description:
				'Arquitectura de compra simplificada con enfoque mobile y optimización de ticket medio.',
			tech: ['React + Vite', 'Shopify', 'Stripe'],
			link: '/portfolio'
		},
		{
			title: 'Lanzamiento digital Nexa Fit',
			result: '+39% en altas desde web',
			description:
				'Página de captación y automatización de leads para acelerar la adquisición de nuevos clientes.',
			tech: ['Next.js', 'GA4', 'Meta Ads'],
			link: '/portfolio'
		}
	];
</script>

<section class="section projects-section" id="projects">
	<div class="content-wrapper">
		<h2 class="section-title animated-content-ratio" use:observeSections>
			Proyectos <span class="gradient-title">con impacto medible</span>
		</h2>
		<p class="section-subtitle animated-content-ratio" use:observeSections>
			Trabajos recientes donde diseño, posicionamiento y estrategia comercial se unieron para producir
			resultados reales.
		</p>

		<div class="projects-grid">
			{#each projects as project, i}
				<article
					class="project-card animated-content-ratio"
					use:observeSections
					style={`transition-delay: ${i * 0.1}s;`}
				>
					<div class="project-header">
						<p class="project-result">{project.result}</p>
						<a href={project.link} class="project-link-icon" aria-label="Ver caso en portfolio">
							<i class="fas fa-arrow-up-right-from-square"></i>
						</a>
					</div>

					<h3 class="project-title">{project.title}</h3>
					<p class="project-description">{project.description}</p>

					<div class="project-tech">
						{#each project.tech as tech}
							<span><i class={techIcons[tech] || 'fas fa-microchip'}></i> {tech}</span>
						{/each}
					</div>
				</article>
			{/each}
		</div>

		<div class="view-more-container animated-content-ratio" use:observeSections>
			<a href="/portfolio" class="view-more-button">
				Ver portfolio completo <i class="fas fa-chevron-right"></i>
			</a>
			<a href="/contacto" class="text-link">Quiero una propuesta similar</a>
		</div>
	</div>
</section>

<style>
	.projects-section {
		background:
			radial-gradient(ellipse at bottom, rgba(27, 39, 53, 0.88) 0%, rgba(9, 10, 15, 1) 100%),
			var(--color-background);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.project-card {
		padding: 1.25rem;
		border-radius: 16px;
		background: linear-gradient(155deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
		border: 1px solid rgba(255, 255, 255, 0.11);
		transition:
			transform 0.28s ease,
			border-color 0.28s ease,
			box-shadow 0.28s ease;
		display: flex;
		flex-direction: column;
	}

	.project-card:hover {
		transform: translateY(-4px);
		border-color: rgba(73, 228, 176, 0.38);
		box-shadow: 0 20px 38px rgba(0, 0, 0, 0.28);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.15rem;
	}

	.project-result {
		margin: 0;
		display: inline-flex;
		align-items: center;
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		background: rgba(73, 228, 176, 0.13);
		color: var(--color-primary);
		font-size: 0.8rem;
		font-weight: 700;
	}

	.project-title {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0;
		color: var(--color-text-light);
		line-height: 1.3;
	}

	.project-description {
		color: var(--color-text-muted);
		margin: 0.65rem 0 1.15rem;
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.project-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: auto;
	}

	.project-tech span {
		background-color: rgba(73, 228, 176, 0.09);
		color: var(--color-primary);
		padding: 0.32rem 0.62rem;
		border-radius: 20px;
		font-size: 0.76rem;
		font-weight: 500;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		border: 1px solid rgba(73, 228, 176, 0.18);
	}

	.project-link-icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.85rem;
		color: var(--color-text-muted);
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.12);
		transition:
			transform 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease;
	}

	.project-card:hover .project-link-icon {
		color: var(--color-primary);
		transform: translateY(-2px);
		border-color: rgba(73, 228, 176, 0.4);
	}

	.view-more-container {
		margin-top: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.view-more-button {
		background: linear-gradient(90deg, var(--color-primary), #00bfff);
		color: var(--color-background);
		padding: 0.75rem 1.15rem;
		border-radius: 999px;
		font-size: 0.95rem;
		font-weight: 700;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
		box-shadow: 0 10px 22px rgba(73, 228, 176, 0.2);
	}

	.view-more-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 16px 30px rgba(73, 228, 176, 0.24);
	}

	.view-more-button i {
		margin-left: 0.45rem;
		transition: transform 0.25s ease;
	}

	.view-more-button:hover i {
		transform: translateX(3px);
	}

	.text-link {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		border-bottom: 1px dashed rgba(255, 255, 255, 0.25);
		padding-bottom: 0.2rem;
	}

	.text-link:hover {
		color: var(--color-primary);
		border-bottom-color: rgba(73, 228, 176, 0.5);
	}

	@media (max-width: 1024px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 720px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>