<script lang="ts">
	import { getScrollObserverAction } from '$lib/scrollObserverContext';

	const observeSections = getScrollObserverAction();

	const highlights = [
		{ value: '+43%', label: 'media de mejora en leads' },
		{ value: '<1.8s', label: 'tiempo de carga objetivo' },
		{ value: '100%', label: 'foco en mobile first' }
	];

	const features = [
		{
			icon: 'fas fa-rocket',
			title: 'Performance orientada a negocio',
			description:
				'Optimizamos cada vista para cargar rápido y sostener la atención del usuario desde el primer segundo.'
		},
		{
			icon: 'fas fa-shield-alt',
			title: 'Arquitectura estable y escalable',
			description:
				'Construimos soluciones robustas, seguras y preparadas para crecer sin rehacer la base técnica.'
		},
		{
			icon: 'fas fa-compass-drafting',
			title: 'Diseño estratégico y diferencial',
			description:
				'Cada bloque visual tiene intención: reforzar autoridad, guiar decisiones y convertir visitas en oportunidades.'
		},
		{
			icon: 'fas fa-chart-line',
			title: 'Medición real de resultados',
			description:
				'Implementamos analítica y eventos clave para optimizar con datos, no con suposiciones.'
		}
	];
</script>

<section class="section usp-section" id="usp">
	<div class="content-wrapper">
		<h2 class="section-title animated-content-ratio" use:observeSections>
			¿Por qué elegir <span class="gradient-title">Zenith Studio</span>?
		</h2>
		<p class="section-subtitle animated-content-ratio" use:observeSections>
			Combinamos dirección creativa, ingeniería sólida y enfoque comercial para que tu presencia digital
			sea una ventaja competitiva real.
		</p>

		<div class="highlights animated-content-ratio" use:observeSections>
			{#each highlights as item}
				<div class="highlight-item">
					<strong>{item.value}</strong>
					<span>{item.label}</span>
				</div>
			{/each}
		</div>

		<div class="features-grid">
			{#each features as feature, i}
				<article
					class="feature-card animated-content-ratio"
					use:observeSections
					style={`transition-delay: ${i * 0.12}s;`}
				>
					<div class="feature-icon">
						<i class={feature.icon}></i>
					</div>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.usp-section {
		position: relative;
		background:
			radial-gradient(circle at 16% 18%, rgba(73, 228, 176, 0.12), transparent 26%),
			radial-gradient(circle at 90% 6%, rgba(0, 191, 255, 0.1), transparent 24%),
			var(--color-surface);
	}

	.highlights {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.8rem;
		margin: 0 auto 2.2rem;
		max-width: 900px;
	}

	.highlight-item {
		padding: 0.95rem;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-align: center;
	}

	.highlight-item strong {
		display: block;
		font-size: 1.25rem;
		color: var(--color-primary);
		line-height: 1.1;
	}

	.highlight-item span {
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.feature-card {
		padding: 1.35rem;
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.11);
		background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
		transition:
			transform 0.25s ease,
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.feature-card:hover {
		transform: translateY(-4px);
		border-color: rgba(73, 228, 176, 0.42);
		box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
	}

	.feature-icon {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 1.15rem;
		margin-bottom: 0.9rem;
		background: rgba(73, 228, 176, 0.16);
		border: 1px solid rgba(73, 228, 176, 0.3);
		color: var(--color-primary);
	}

	.feature-card h3 {
		margin: 0 0 0.45rem;
		font-size: clamp(1.04rem, 2.4vw, 1.25rem);
		line-height: 1.3;
	}

	.feature-card p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	@media (max-width: 900px) {
		.highlights {
			grid-template-columns: 1fr;
		}

		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>