<script lang="ts">
	import PortfolioMockupSvg from '$lib/PortfolioMockupSvg.svelte';

	export let stats: Array<{ icon: string; stat: string; description: string }> = [];
	export let featured: {
		category: string;
		title: string;
		description: string;
		results: Array<{ label: string; value: string }>;
		deliverables: string[];
		/** Markup SVG completo (`mockupSvg.*` desde `+page`) */
		image: string;
	};
	export let projects: Array<{
		title: string;
		category: string;
		result: string;
		tags: string[];
		image: string;
	}> = [];
	export let cta: {
		title: string;
		description: string;
		primaryText: string;
		secondaryText: string;
		primaryLink: string;
		secondaryLink: string;
	};
</script>

<!-- Estadísticas -->
<section class="trust-section" aria-label="Indicadores de confianza">
	<div class="content-wrapper trust-grid">
		{#each stats as stat}
			<article class="stat-card">
				<i class={stat.icon}></i>
				<p class="stat-number">{stat.stat}</p>
				<p class="stat-label">{stat.description}</p>
			</article>
		{/each}
	</div>
</section>

<!-- Caso destacado -->
<section class="featured-project" aria-labelledby="featured-heading">
	<div class="content-wrapper featured-wrap">
		<div class="copy">
			<p class="eyebrow">{featured.category}</p>
			<h2 id="featured-heading">{featured.title}</h2>
			<div class="deliverables">
				{#each featured.deliverables as item}
					<span>{item}</span>
				{/each}
			</div>

			<div class="showcase-mini featured-showcase">
				<div class="mini-top"></div>
				<div class="mini-content">
					<PortfolioMockupSvg svg={featured.image} label={`Vista previa ${featured.title}`} />
				</div>
			</div>
		</div>

		<div class="results">
			<p class="results-title">{featured.description}</p>
			{#each featured.results as result}
				<div class="result-row">
					<span>{result.label}</span>
					<strong>{result.value}</strong>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Grid de proyectos -->
<section class="portfolio-grid" id="casos" aria-labelledby="grid-heading">
	<div class="content-wrapper">
		<h2 id="grid-heading" class="section-title">Ejemplos visuales de webs</h2>

		<div class="projects-grid">
			{#each projects as project}
				<article class="project-card">
					<div class="preview">
						<div class="preview-top">
							<span></span><span></span><span></span>
						</div>
						<div class="preview-body">
							<PortfolioMockupSvg
								svg={project.image}
								label={`Vista previa web ${project.title}`}
							/>
						</div>
					</div>

					<div class="meta">
						<p class="category">{project.category}</p>
						<h3>{project.title}</h3>

						<p class="result">
							<i class="fa-solid fa-arrow-trend-up"></i>
							{project.result}
						</p>

						<div class="highlights">
							{#each project.tags as item}
								<span>{item}</span>
							{/each}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- CTA final -->
<section class="final-cta" aria-labelledby="cta-heading">
	<div class="content-wrapper cta-wrap">
		<div>
			<h2 id="cta-heading">{cta.title}</h2>
			<p>{cta.description}</p>
			<div class="points">
				<span><i class="fa-solid fa-check"></i> Diagnóstico inicial gratuito</span>
				<span><i class="fa-solid fa-check"></i> Enfoque 100% orientado a conversión</span>
				<span><i class="fa-solid fa-check"></i> Acompañamiento en lanzamiento</span>
			</div>
		</div>
		<div class="actions">
			<a href={cta.primaryLink} class="btn btn-primary">{cta.primaryText}</a>
			<a href={cta.secondaryLink} class="btn btn-secondary">{cta.secondaryText}</a>
		</div>
	</div>
</section>

<style>
	/* —— Trust —— */
	.trust-section {
		padding: 1.2rem 0 3.8rem;
	}

	.trust-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.9rem;
	}

	.stat-card {
		padding: 1.1rem;
		border-radius: 14px;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.02);
	}

	.stat-card i {
		font-size: 1.1rem;
		color: var(--color-primary);
	}

	.stat-number {
		margin: 0.5rem 0 0;
		font-size: 1.7rem;
		font-weight: 900;
		line-height: 1.1;
	}

	.stat-label {
		margin: 0.3rem 0 0;
		font-size: 0.88rem;
		color: var(--color-text-muted);
	}

	@media (max-width: 900px) {
		.trust-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	/* —— Featured —— */
	.featured-project {
		padding: 4rem 0;
	}

	.featured-wrap {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 1rem;
		padding: 1.2rem;
		border-radius: 20px;
		background: linear-gradient(130deg, rgba(73, 228, 176, 0.16), rgba(0, 191, 255, 0.08));
		border: 1px solid rgba(255, 255, 255, 0.14);
	}

	.eyebrow {
		margin: 0;
		font-size: 0.82rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-primary);
		font-weight: 700;
	}

	.copy h2 {
		margin: 0.6rem 0 0;
		font-size: clamp(1.7rem, 4vw, 2.4rem);
		line-height: 1.15;
	}

	.deliverables {
		margin-top: 0.8rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.deliverables span {
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		font-size: 0.85rem;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.22);
	}

	.showcase-mini {
		margin-top: 1rem;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}

	/* Glow Studio: ventana más grande, ratio de mockup real, imagen a cubrir todo el hueco */
	.featured-showcase {
		margin-top: 1.15rem;
	}

	.featured-showcase .mini-top {
		height: 24px;
		background: rgba(255, 255, 255, 0.2);
	}

	.featured-showcase .mini-content {
		position: relative;
		width: 100%;
		height: clamp(260px, 34vw, 400px);
		background: #0d1118;
	}

	.featured-showcase .mini-content :global(.portfolio-mockup-svg) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.featured-showcase .mini-content :global(.portfolio-mockup-svg svg) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
	}

	.mini-top {
		height: 20px;
		background: rgba(255, 255, 255, 0.18);
	}

	.mini-content {
		position: relative;
		height: 130px;
		background: #0d1118;
	}

	.results {
		border-radius: 14px;
		padding: 1rem;
		background: rgba(11, 14, 20, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.results-title {
		margin: 0 0 0.9rem;
		font-size: 0.9rem;
		color: rgba(240, 244, 248, 0.92);
	}

	.result-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
		padding: 0.7rem 0;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.result-row:first-of-type {
		border-top: none;
		padding-top: 0;
	}

	.results strong {
		font-size: 1.1rem;
		color: var(--color-primary);
	}

	@media (max-width: 900px) {
		.featured-wrap {
			grid-template-columns: 1fr;
		}

		.featured-showcase .mini-content {
			height: clamp(240px, 58vw, 360px);
		}
	}

	/* —— Grid —— */
	.portfolio-grid {
		padding: 3.8rem 0 4.8rem;
	}

	.section-title {
		margin: 0 0 1.5rem;
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 800;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.1rem;
	}

	.project-card {
		overflow: hidden;
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition:
			transform 0.25s ease,
			border-color 0.25s ease;
	}

	.project-card:hover {
		transform: translateY(-4px);
		border-color: rgba(73, 228, 176, 0.4);
	}

	.preview {
		padding: 0.6rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.preview-top {
		height: 24px;
		display: flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0 0.45rem;
		border-radius: 9px 9px 0 0;
		background: rgba(255, 255, 255, 0.13);
	}

	.preview-top span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.7);
	}

	.preview-body {
		position: relative;
		border-radius: 0 0 10px 10px;
		height: 200px;
		overflow: hidden;
		background: #0d1118;
	}

	.meta {
		padding: 0.9rem;
	}

	.category {
		margin: 0;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--color-primary);
		font-weight: 700;
	}

	.meta h3 {
		margin: 0.55rem 0 0;
		font-size: 1.15rem;
	}

	.result {
		margin: 0.7rem 0 0;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.9rem;
		color: var(--color-text-light);
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		background: rgba(73, 228, 176, 0.16);
	}

	.highlights {
		margin-top: 0.7rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.highlights span {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		padding: 0.25rem 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 999px;
	}

	@media (max-width: 1050px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 700px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	/* —— CTA —— */
	.final-cta {
		padding: 1rem 0 5rem;
	}

	.cta-wrap {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 1rem;
		padding: 1.4rem;
		border-radius: 18px;
		background: linear-gradient(125deg, rgba(73, 228, 176, 0.2), rgba(11, 14, 20, 0.6));
		border: 1px solid rgba(255, 255, 255, 0.14);
	}

	.cta-wrap h2 {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.2rem);
	}

	.cta-wrap p {
		margin: 0.8rem 0 1rem;
		color: rgba(240, 244, 248, 0.9);
		max-width: 58ch;
	}

	.points {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
	}

	.points span {
		font-size: 0.83rem;
		padding: 0.35rem 0.6rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.12);
	}

	.points i {
		color: var(--color-primary);
	}

	.actions {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.75rem;
	}

	.btn {
		padding: 0.9rem 1rem;
		text-align: center;
		border-radius: 12px;
		font-weight: 700;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.btn:hover {
		transform: translateY(-2px);
	}

	.btn-primary {
		color: var(--color-background);
		background: linear-gradient(120deg, rgba(73, 228, 176, 1), rgba(20, 184, 166, 1));
	}

	.btn-secondary {
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.05);
	}

	@media (max-width: 900px) {
		.cta-wrap {
			grid-template-columns: 1fr;
		}
	}
</style>
