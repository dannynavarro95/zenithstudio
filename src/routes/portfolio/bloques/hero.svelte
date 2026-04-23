<script lang="ts">
	import { mockupSvg } from '$lib/portfolioMockupUrls';
	import PortfolioMockupSvg from '$lib/PortfolioMockupSvg.svelte';
	import { getScrollObserverAction } from '$lib/scrollObserverContext';

	const scrollObserverAction = getScrollObserverAction();
</script>

<section class="portfolio-hero">
	<div class="hero-glow"></div>
	<div class="content-wrapper hero-grid" use:scrollObserverAction>
		<div class="hero-copy">
			<p class="hero-kicker">Portfolio visual</p>
			<h1>Ejemplos de webs creadas para vender más</h1>

			<div class="hero-actions">
				<a href="#casos" class="cta-primary">
					<i class="fa-solid fa-eye"></i>
					Ver ejemplos
				</a>
				<a href="/contacto" class="cta-secondary">
					<i class="fa-solid fa-bolt"></i>
					Pedir propuesta
				</a>
			</div>
		</div>

		<div class="hero-showcase">
			<div class="mockup-collage">
				<div class="collage-card collage-a browser">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-a">
						<PortfolioMockupSvg svg={mockupSvg.barberPrime} label="Vista previa web barbería" />
					</div>
				</div>
				<div class="collage-card collage-b browser">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-b">
						<PortfolioMockupSvg svg={mockupSvg.lioraBeauty} decorative />
					</div>
				</div>
				<div class="collage-card collage-c browser">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-c">
						<PortfolioMockupSvg svg={mockupSvg.nexaFit} decorative />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.portfolio-hero {
		position: relative;
		padding: 7.5rem 0 5.5rem;
		background: radial-gradient(circle at 10% 20%, rgba(73, 228, 176, 0.18), transparent 30%),
			radial-gradient(circle at 90% 10%, rgba(0, 191, 255, 0.14), transparent 25%),
			linear-gradient(180deg, rgba(11, 14, 20, 1) 0%, rgba(11, 14, 20, 0.92) 100%);
		overflow: visible;
	}

	.hero-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
		pointer-events: none;
	}

	.hero-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr 1.12fr;
		gap: 2rem;
		align-items: center;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3.4rem);
		line-height: 1.08;
		font-weight: 900;
		color: var(--color-text-light);
	}

	.hero-kicker {
		margin: 0 0 1rem;
		display: inline-block;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.2rem;
	}

	.cta-primary,
	.cta-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.9rem 1.4rem;
		border-radius: 999px;
		font-weight: 700;
		transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
	}

	.cta-primary {
		background: linear-gradient(120deg, rgba(73, 228, 176, 1), rgba(20, 184, 166, 1));
		color: var(--color-background);
		box-shadow: 0 14px 28px rgba(73, 228, 176, 0.25);
	}

	.cta-secondary {
		border: 1px solid rgba(255, 255, 255, 0.16);
		background: rgba(255, 255, 255, 0.04);
	}

	.cta-primary:hover,
	.cta-secondary:hover {
		transform: translateY(-2px);
	}

	.hero-showcase {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		min-height: 0;
	}

	.mockup-collage {
		position: relative;
		width: 100%;
		max-width: 520px;
		height: clamp(320px, 42vw, 400px);
		margin-left: auto;
		isolation: isolate;
	}

	.collage-card {
		position: absolute;
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.22);
		background: rgba(13, 17, 24, 0.95);
		box-shadow:
			0 24px 48px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.06) inset;
		transform-origin: center center;
		transition:
			transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.35s ease,
			z-index 0s linear;
		will-change: transform;
	}

	.collage-card:hover {
		z-index: 40;
		box-shadow:
			0 32px 64px rgba(0, 0, 0, 0.55),
			0 0 0 1px rgba(73, 228, 176, 0.35);
	}

	.collage-a {
		left: -2%;
		top: 10%;
		width: 64%;
		z-index: 3;
		transform: rotate(-4deg);
	}

	.collage-a:hover {
		transform: rotate(-2deg) scale(1.03);
	}

	.collage-b {
		right: -6%;
		top: -4%;
		width: 58%;
		z-index: 4;
		transform: rotate(6deg);
	}

	.collage-b:hover {
		transform: rotate(4deg) scale(1.03);
	}

	.collage-c {
		left: 8%;
		bottom: -10%;
		width: 60%;
		z-index: 2;
		transform: rotate(-2.5deg);
	}

	.collage-c:hover {
		transform: rotate(-1deg) scale(1.03);
	}

	.browser-top {
		height: 26px;
		display: flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0 0.55rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.browser-top span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.45);
	}

	.screen {
		position: relative;
		background: #0d1118;
	}

	.screen-a {
		height: 220px;
	}

	.screen-b {
		height: 200px;
	}

	.screen-c {
		height: 210px;
	}

	@media (max-width: 900px) {
		.portfolio-hero {
			overflow: hidden;
		}

		.hero-grid {
			grid-template-columns: 1fr;
		}

		.hero-showcase {
			justify-content: center;
		}

		.mockup-collage {
			max-width: 100%;
			height: clamp(300px, 78vw, 380px);
			margin: 0 auto;
		}

		.collage-a {
			left: 2%;
			top: 12%;
			width: 62%;
			transform: rotate(-2.5deg);
		}

		.collage-b {
			right: 2%;
			top: -2%;
			width: 58%;
			transform: rotate(4deg);
		}

		.collage-c {
			left: 9%;
			bottom: -2%;
			width: 60%;
			transform: rotate(-1.5deg);
		}

		.screen-a {
			height: 200px;
		}

		.screen-b {
			height: 180px;
		}

		.screen-c {
			height: 190px;
		}
	}
</style>
