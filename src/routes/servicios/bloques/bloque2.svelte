<script lang="ts">
	import { onMount } from 'svelte';

	const steps = [
		{
			number: '01',
			title: 'Descubrimiento y Estrategia',
			description: 'Analizamos tu modelo de negocio, competencia y objetivos para trazar un mapa técnico que garantice el éxito.',
			icon: 'fas fa-search-dollar'
		},
		{
			number: '02',
			title: 'Arquitectura y UX/UI',
			description: 'Creamos prototipos de alta fidelidad enfocados en la experiencia del usuario y la identidad visual de tu marca.',
			icon: 'fas fa-drafting-pencil'
		},
		{
			number: '03',
			title: 'Desarrollo de Alta Ingeniería',
			description: 'Codificamos tu solución usando SvelteKit para lograr una velocidad de carga y rendimiento insuperables.',
			icon: 'fas fa-code'
		},
		{
			number: '04',
			title: 'Lanzamiento y Optimización',
			description: 'Desplegamos en la nube y monitorizamos métricas para escalar tu presencia digital de forma constante.',
			icon: 'fas fa-chart-line'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<section class="section process-section">
	<!-- Fondo decorativo sutil -->
	<div class="glow-bg"></div>

	<div class="content-wrapper">
		<div class="header-group animate-on-scroll">
			<span class="eyebrow">Metodología Zenith</span>
			<h2 class="section-title">
				Del Concepto a la <span class="gradient-title">Realidad Digital</span>
			</h2>
			<p class="section-subtitle">
				Un flujo de trabajo optimizado para eliminar la fricción y maximizar la calidad técnica en cada fase del proyecto.
			</p>
		</div>

		<div class="timeline-container">
			<!-- Línea central decorativa -->
			<div class="timeline-line"></div>

			{#each steps as step, i}
				<div class="process-step animate-on-scroll step-card" style="transition-delay: {i * 0.15}s">
					<div class="step-content-box">
						<div class="step-number">{step.number}</div>
						<div class="step-icon">
							<i class={step.icon}></i>
						</div>
						<h3 class="step-title">{step.title}</h3>
						<p class="step-description">{step.description}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bloque de cierre / CTA Final -->
		<div class="final-cta animate-on-scroll">
			<div class="cta-inner">
				<h2 class="cta-title">¿Listo para elevar tu presencia digital?</h2>
				<p class="cta-text">Estamos listos para transformar tu visión en una herramienta de facturación y prestigio.</p>
				<a href="/contacto" class="primary-button">
					<span>Iniciar un Proyecto</span>
					<i class="fas fa-arrow-right"></i>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.process-section {
		position: relative;
		overflow: hidden;
		padding-bottom: 8rem;
	}

	.glow-bg {
		position: absolute;
		bottom: -10%;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 400px;
		background: radial-gradient(circle, rgba(73, 228, 176, 0.08) 0%, transparent 70%);
		filter: blur(60px);
		pointer-events: none;
		z-index: 0;
	}

	.eyebrow {
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.8rem;
		font-weight: 700;
		display: block;
		margin-bottom: 1rem;
		text-align: center;
	}

	.timeline-container {
		position: relative;
		display: grid;
		width: 100%;
		/* Usamos minmax(0, 1fr) para asegurar que los 4 bloques quepan siempre en escritorio */
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 2rem;
		margin-top: 4rem;
		margin-bottom: 8rem;
		z-index: 1;
	}

	.step-content-box {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 3rem 2rem;
		border-radius: 32px;
		height: 100%;
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		backdrop-filter: blur(10px);
		position: relative;
	}

	.process-step:hover .step-content-box {
		background: rgba(73, 228, 176, 0.03);
		border-color: rgba(73, 228, 176, 0.3);
		transform: translateY(-10px);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.step-number {
		position: absolute;
		top: 1rem;
		right: 2rem;
		font-size: 3rem;
		font-weight: 900;
		opacity: 0.05;
		color: var(--color-primary);
		transition: opacity 0.4s ease;
	}

	.process-step:hover .step-number {
		opacity: 0.2;
	}

	.step-icon {
		font-size: 2rem;
		color: var(--color-primary);
		margin-bottom: 1.5rem;
	}

	.step-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: var(--color-text-light);
	}

	.step-description {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		line-height: 1.7;
		/* Evitamos que palabras largas rompan el layout */
		word-break: break-word;
	}

	/* CTA Final */
	.final-cta {
		text-align: center;
		padding: 6rem 2rem;
		background: linear-gradient(180deg, rgba(73, 228, 176, 0.05) 0%, transparent 100%);
		border-radius: 40px;
		border: 1px solid rgba(255, 255, 255, 0.05);
		max-width: 1000px;
		margin: 0 auto;
	}

	.cta-title {
		font-size: clamp(1.5rem, 4vw, 2.5rem);
		font-weight: 800;
		margin-bottom: 1.5rem;
	}

	.cta-text {
		color: var(--color-text-muted);
		margin-bottom: 3rem;
		font-size: 1.1rem;
	}

	.primary-button {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		background: var(--color-primary);
		color: #000;
		padding: 1.2rem 2.5rem;
		border-radius: 100px;
		font-weight: 700;
		transition: all 0.3s ease;
		box-shadow: 0 10px 30px rgba(73, 228, 176, 0.2);
	}

	.primary-button:hover {
		transform: scale(1.05);
		box-shadow: 0 15px 40px rgba(73, 228, 176, 0.4);
	}

	/* Bajamos a 2x2 en pantallas medianas (tablets/portátiles pequeños) */
	@media (max-width: 1200px) {
		.timeline-container {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 768px) {
		.timeline-container {
			grid-template-columns: 1fr;
		}
		.final-cta {
			padding: 4rem 1.5rem;
		}
	}
</style>
