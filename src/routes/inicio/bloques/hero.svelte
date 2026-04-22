<script lang="ts">
	import { onMount } from 'svelte';
	import { getScrollObserverAction } from '$lib/scrollObserverContext';
	import TypewriterText from '$lib/TypewriterText.svelte';

	const scrollObserverAction = getScrollObserverAction();
	let isFinished = false;

	onMount(() => {
		const fallbackTimer = setTimeout(() => {
			isFinished = true;
		}, 5200);

		return () => clearTimeout(fallbackTimer);
	});

	function handleTypewriterDone() {
		isFinished = true;
	}
</script>

<section id="hero" class="hero-section">
	<div class="video-background-container">
		<video autoplay muted loop playsinline class="hero-video">
			<source src="/fondo-abstracto-tech-video.mp4" type="video/mp4" />
		</video>
	</div>
	<div class="hero-overlay"></div>
	<div class="hero-noise"></div>

	<div class="content-wrapper hero-content" use:scrollObserverAction>
		<p class="hero-kicker">Estudio digital premium</p>
		<h1 class="main-title">
			Construimos activos digitales
			<span class="title-break">con</span>
			<span class="gradient-title typing-text" class:finished={isFinished}>
				<TypewriterText
					words={['Innovación', 'Precisión', 'Visión de negocio']}
					delay={120}
					pause={2600}
					on:done={handleTypewriterDone}
				/>
			</span>
		</h1>

		<p class="subtitle">
			Diseño, tecnología y estrategia comercial en una sola ejecución para hacer que tu web se vea
			excelente y convierta mejor.
		</p>

		<div class="hero-actions">
			<a href="/contacto" class="cta-button">
				<i class="fa-solid fa-bolt"></i>
				Empezar proyecto
			</a>
			<a href="#projects" class="secondary-button">
				<i class="fa-solid fa-eye"></i>
				Ver casos
			</a>
		</div>

		<div class="trust-strip">
			<div>
				<strong>+70</strong>
				<span>proyectos lanzados</span>
			</div>
			<div>
				<strong>14 días</strong>
				<span>entrega estándar</span>
			</div>
			<div>
				<strong>4.9/5</strong>
				<span>satisfacción media</span>
			</div>
		</div>
	</div>

	<div class="fade-divider"></div>
</section>

<style>
	.hero-section {
		position: relative;
		min-height: 100vh;
		padding: 7rem 0 1.8rem;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		isolation: isolate;
	}

	.video-background-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: -3;
	}

	.hero-video {
		position: absolute;
		top: 50%;
		left: 50%;
		min-width: 100%;
		min-height: 100%;
		transform: translate(-50%, -50%);
		mix-blend-mode: soft-light;
		opacity: 0.55;
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		z-index: -2;
		background:
			radial-gradient(circle at 12% 20%, rgba(73, 228, 176, 0.18), transparent 34%),
			radial-gradient(circle at 85% 10%, rgba(0, 191, 255, 0.16), transparent 32%),
			linear-gradient(180deg, rgba(11, 14, 20, 0.52) 0%, rgba(11, 14, 20, 0.94) 90%);
	}

	.hero-noise {
		position: absolute;
		inset: 0;
		z-index: -1;
		background-image: radial-gradient(rgba(255, 255, 255, 0.07) 0.5px, transparent 0.5px);
		background-size: 3px 3px;
		opacity: 0.16;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
	}

	.hero-kicker {
		margin: 0;
		padding: 0.35rem 0.7rem;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		font-weight: 700;
		border-radius: 999px;
		background: rgba(73, 228, 176, 0.12);
		border: 1px solid rgba(73, 228, 176, 0.25);
		color: var(--color-primary);
	}

	.main-title {
		margin: 0;
		font-size: clamp(2.4rem, 7vw, 4.8rem);
		font-weight: 900;
		line-height: 1.05;
		max-width: 18ch;
	}

	.title-break {
		margin-right: 0.35rem;
	}

	.typing-text {
		display: inline-block;
		min-height: 1.1em;
	}

	.typing-text.finished {
		color: var(--color-primary);
		text-shadow:
			0 0 10px rgba(73, 228, 176, 0.8),
			0 0 24px rgba(73, 228, 176, 0.4);
		animation: neon-pulse 3s ease-in-out infinite alternate;
	}

	@keyframes neon-pulse {
		from {
			text-shadow:
				0 0 8px rgba(73, 228, 176, 0.7),
				0 0 18px rgba(73, 228, 176, 0.32);
		}
		to {
			text-shadow:
				0 0 14px rgba(73, 228, 176, 1),
				0 0 34px rgba(73, 228, 176, 0.5);
		}
	}

	.subtitle {
		margin: 0;
		max-width: 62ch;
		color: rgba(240, 244, 248, 0.88);
		font-size: clamp(1rem, 1.9vw, 1.2rem);
	}

	.hero-actions {
		margin-top: 0.3rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.85rem;
	}

	.cta-button,
	.secondary-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.86rem 1.3rem;
		border-radius: 999px;
		font-weight: 700;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			background 0.25s ease;
	}

	.cta-button {
		background: linear-gradient(120deg, rgba(73, 228, 176, 1), rgba(20, 184, 166, 1));
		color: var(--color-background);
		box-shadow: 0 14px 26px rgba(73, 228, 176, 0.2);
	}

	.secondary-button {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.18);
		color: var(--color-text-light);
	}

	.cta-button:hover,
	.secondary-button:hover {
		transform: translateY(-2px);
	}

	.trust-strip {
		margin-top: 1rem;
		padding: 0.7rem;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.65rem;
		width: min(720px, 100%);
		border-radius: 14px;
		background: rgba(11, 14, 20, 0.45);
		border: 1px solid rgba(255, 255, 255, 0.11);
		backdrop-filter: blur(6px);
	}

	.trust-strip div {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.5rem;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.03);
	}

	.trust-strip strong {
		font-size: 1rem;
		color: var(--color-primary);
	}

	.trust-strip span {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.fade-divider {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 160px;
		z-index: 2;
		background: linear-gradient(to bottom, rgba(11, 14, 20, 0) 0%, var(--color-surface) 100%);
	}

	@media (max-width: 800px) {
		.hero-section {
			padding-top: 6.4rem;
		}

		.trust-strip {
			grid-template-columns: 1fr;
		}
	}
</style>