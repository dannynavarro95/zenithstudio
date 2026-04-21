<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from 'svelte';
	import type { Action } from 'svelte/action';

	const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

	function staticUrl(path: string): string {
		return `${base}${path.startsWith('/') ? path : `/${path}`}`;
	}

	/** Mockups en `static/images/portfolio/mockups/` */
	const heroMain = staticUrl('/images/portfolio/mockups/barber-prime.svg');
	const heroThumb1 = staticUrl('/images/portfolio/mockups/liora-beauty.svg');
	const heroThumb2 = staticUrl('/images/portfolio/mockups/nexa-fit.svg');
	const heroThumb3 = staticUrl('/images/portfolio/mockups/roma-atelier.svg');
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
			<div class="browser mockup-main">
				<div class="browser-top"><span></span><span></span><span></span></div>
				<div class="screen">
					<img
						src={heroMain}
						alt="Vista previa web barbería"
						width="800"
						height="520"
						decoding="async"
						fetchpriority="high"
					/>
				</div>
			</div>
			<div class="hero-submockups">
				<div class="browser mockup-tile">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-sm">
						<img src={heroThumb1} alt="" width="800" height="520" decoding="async" />
					</div>
				</div>
				<div class="browser mockup-tile">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-sm">
						<img src={heroThumb2} alt="" width="800" height="520" decoding="async" />
					</div>
				</div>
				<div class="browser mockup-tile">
					<div class="browser-top"><span></span><span></span><span></span></div>
					<div class="screen screen-sm">
						<img src={heroThumb3} alt="" width="800" height="520" decoding="async" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.portfolio-hero {
		position: relative;
		padding: 7.5rem 0 4rem;
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
		grid-template-columns: 1fr 1.1fr;
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
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		min-height: 0;
	}

	.hero-submockups {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.55rem;
	}

	.browser {
		border-radius: 14px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.18);
		background: rgba(13, 17, 24, 0.9);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
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
		height: 260px;
		background: #0d1118;
	}

	.screen img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
	}

	.screen-sm {
		height: 120px;
	}

	.mockup-main {
		width: 100%;
		max-width: 520px;
		margin-left: auto;
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		.mockup-main {
			margin-left: auto;
			margin-right: auto;
		}

		.screen {
			height: 220px;
		}

		.screen-sm {
			height: 100px;
		}
	}
</style>
