<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// --- Elementos del DOM ---
	let container: HTMLElement;
	let track: HTMLElement;
	let mobileCarousel: HTMLElement;
	let mobileHeroTrack: HTMLElement;
	let cursorDot: HTMLElement;
	let cursorContainer: HTMLElement;

	// --- Canvas ---
	let trailCanvas: HTMLCanvasElement;
	let particleCanvas: HTMLCanvasElement;
	let trailCtx: CanvasRenderingContext2D | null = null;
	let particleCtx: CanvasRenderingContext2D | null = null;

	// --- Configuración de la Estela ---
	const TRAIL_LENGTH = 20;
	const MAX_LINE_WIDTH = 10;
	let trail: { x: number; y: number }[] = Array(TRAIL_LENGTH).fill({ x: -1000, y: -1000 });

	// --- Partículas ---
	let particles: Particle[] = [];

	// --- Estado ---
	let mouseX = -1000;
	let mouseY = -1000;
	let isInside = false;
	let isHoveringText = false;
	let animationFrameId = 0;
	let hasInteracted = false; // Controla si el usuario ya ha movido el ratón

	/** Vista estrecha: sin canvas de cursor; carrusel manual y resplandor al tacto. */
	let isMobileLayout = false;
	let mobileAutoScrollId: ReturnType<typeof setInterval> | null = null;
	let mobilePauseUntil = 0;
	let isProgrammaticMobileScroll = false;
	let mobileHighlightIndex = 0;
	const MOBILE_SCROLL_PX_PER_TICK = 2.35;
	const MOBILE_CARD_STRIDE = 252;

	type Particle = {
		x: number;
		y: number;
		radius: number;
		vx: number;
		vy: number;
	};

	// --- Funciones de Canvas y Animación ---
	const resizeCanvas = () => {
		if (trailCanvas) {
			trailCanvas.width = window.innerWidth;
			trailCanvas.height = window.innerHeight;
		}
		if (particleCanvas) {
			particleCanvas.width = window.innerWidth;
			particleCanvas.height = window.innerHeight;
		}
	};

	function animateCursor() {
		const narrow =
			typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
		if (cursorDot && !narrow) {
			cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
		}
		if (trailCtx && !narrow) {
			drawFluidTrail();
		}
		if (particleCtx && !narrow) {
			drawParticles();
		}
		animationFrameId = requestAnimationFrame(animateCursor);
	}

	function drawFluidTrail() {
		if (!trailCtx || !trailCanvas) return;
		trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
		trail = [...trail.slice(1), { x: mouseX, y: mouseY }];

		if (trail.length > 1) {
			trailCtx.beginPath();
			trailCtx.moveTo(trail[0].x, trail[0].y);
			for (let i = 1; i < trail.length - 1; i++) {
				const xc = (trail[i].x + trail[i + 1].x) / 2;
				const yc = (trail[i].y + trail[i + 1].y) / 2;
				trailCtx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
			}
			trailCtx.lineCap = 'round';
			trailCtx.lineJoin = 'round';
			trailCtx.lineWidth = MAX_LINE_WIDTH;
			const gradient = trailCtx.createLinearGradient(trail[0].x, trail[0].y, trail[trail.length - 1].x, trail[trail.length - 1].y);
			gradient.addColorStop(0, 'rgba(73, 228, 176, 0)');
			gradient.addColorStop(0.7, 'rgba(73, 228, 176, 0.4)');
			gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');
			trailCtx.strokeStyle = gradient;
			trailCtx.shadowColor = 'rgba(73, 228, 176, 0.6)';
			trailCtx.shadowBlur = 20;
			trailCtx.stroke();
		}
	}

	function createParticles() {
		if (typeof window === 'undefined') return;
		const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
		particles = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				radius: Math.random() * 1.5 + 0.5,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3
			});
		}
	}

	function drawParticles() {
		if (!particleCtx || !particleCanvas) return;
		particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
		for (const p of particles) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 0 || p.x > particleCanvas.width) p.vx *= -1;
			if (p.y < 0 || p.y > particleCanvas.height) p.vy *= -1;
			particleCtx.beginPath();
			particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
			particleCtx.fillStyle = 'rgba(240, 244, 248, 0.4)';
			particleCtx.fill();
			const dxCursor = mouseX - p.x;
			const dyCursor = mouseY - p.y;
			const distCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);
			if (distCursor < 200) {
				particleCtx.beginPath();
				particleCtx.moveTo(p.x, p.y);
				particleCtx.lineTo(mouseX, mouseY);
				particleCtx.strokeStyle = `rgba(73, 228, 176, ${1 - distCursor / 200})`;
				particleCtx.lineWidth = 0.5;
				particleCtx.stroke();
			}
		}
	}

	// --- Manejadores de Eventos ---
	function handleWindowMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	function syncMobileLayout() {
		if (!browser || typeof window === 'undefined') return;
		const narrow = window.matchMedia('(max-width: 900px)').matches;
		const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
		isMobileLayout = narrow || coarsePointer;
	}

	function pauseMobileAutoScroll(ms = 1800) {
		mobilePauseUntil = Date.now() + ms;
	}

	function stopMobileAutoScroll() {
		if (mobileAutoScrollId) {
			clearInterval(mobileAutoScrollId);
			mobileAutoScrollId = null;
		}
	}

	function startMobileAutoScroll() {
		if (!browser || !isMobileLayout || !mobileCarousel || mobileAutoScrollId) return;
		pauseMobileAutoScroll(1000);
		mobileAutoScrollId = setInterval(() => {
			if (!isMobileLayout || !mobileCarousel) return;
			if (Date.now() < mobilePauseUntil) return;
			const half = mobileCarousel.scrollWidth / 2;
			if (half <= mobileCarousel.clientWidth + 8) return;
			isProgrammaticMobileScroll = true;
			mobileCarousel.scrollLeft += MOBILE_SCROLL_PX_PER_TICK;
			normalizeMobileInfiniteScroll();
			syncMobileHighlightToScroll();
			requestAnimationFrame(() => {
				isProgrammaticMobileScroll = false;
			});
		}, 16);
	}

	function syncMobileHighlightToScroll() {
		if (!mobileCarousel || !displayServices.length) return;
		// Adelantamos el foco para que destaque cuando la tarjeta empieza a entrar por la derecha.
		const leadOffset = mobileCarousel.clientWidth * 0.88;
		const normalized = Math.floor((mobileCarousel.scrollLeft + leadOffset) / MOBILE_CARD_STRIDE);
		mobileHighlightIndex = ((normalized % displayServices.length) + displayServices.length) % displayServices.length;
	}

	function normalizeMobileInfiniteScroll() {
		if (!mobileCarousel) return;
		const half = mobileCarousel.scrollWidth / 2;
		if (half <= mobileCarousel.clientWidth + 8) return;
		if (mobileCarousel.scrollLeft >= half) {
			mobileCarousel.scrollLeft -= half;
		}
		if (mobileCarousel.scrollLeft < 0.5) {
			mobileCarousel.scrollLeft += half;
		}
	}

	function handleSectionMouseMove(event: MouseEvent) {
		if (!container || !track) return;
		if (isMobileLayout) return;
		if (!hasInteracted) {
			hasInteracted = true;
		}
		const { clientX, clientY } = event;
		const { innerWidth, innerHeight } = window;
		const xPercent = clientX / innerWidth;
		const yPercent = clientY / innerHeight;
		container.style.setProperty('--mouse-x', `${clientX}px`);
		container.style.setProperty('--mouse-y', `${clientY}px`);
		container.style.setProperty('--parallax-x', `${(xPercent - 0.5) * -40}px`);
		container.style.setProperty('--parallax-y', `${(yPercent - 0.5) * -20}px`);
		const cards = track.querySelectorAll<HTMLElement>('.card');
		cards.forEach((card) => {
			const { left, top, width, height } = card.getBoundingClientRect();
			const cardCenterX = left + width / 2;
			const cardCenterY = top + height / 2;
			const distance = Math.sqrt(Math.pow(clientX - cardCenterX, 2) + Math.pow(clientY - cardCenterY, 2));
			const active = Math.max(0, 1 - distance / 350);
			card.style.setProperty('--active', `${active}`);
			const cardX = (clientX - left) / width;
			const cardY = (clientY - top) / height;
			const rotateX = (cardY - 0.5) * -12;
			const rotateY = (cardX - 0.5) * 12;
			card.style.setProperty('--rotate-x', `${rotateX}deg`);
			card.style.setProperty('--rotate-y', `${rotateY}deg`);
		});
	}

	onMount(() => {
		if (!browser) return;

		syncMobileLayout();
		const mq = window.matchMedia('(max-width: 900px)');
		const onMq = () => {
			syncMobileLayout();
			if (isMobileLayout && animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = 0;
			} else if (!isMobileLayout && trailCtx && particleCtx && !animationFrameId) {
				animationFrameId = requestAnimationFrame(animateCursor);
			}
			if (isMobileLayout) {
				requestAnimationFrame(() => startMobileAutoScroll());
				requestAnimationFrame(() => syncMobileHighlightToScroll());
			} else {
				stopMobileAutoScroll();
			}
		};
		mq.addEventListener('change', onMq);

		window.addEventListener('resize', resizeCanvas);

		if (!isMobileLayout) {
			if (trailCanvas) trailCtx = trailCanvas.getContext('2d');
			if (particleCanvas) {
				particleCtx = particleCanvas.getContext('2d');
				createParticles();
			}
			resizeCanvas();
			if (!trailCtx || !particleCtx) {
				console.error('Failed to get canvas contexts');
			} else {
				animationFrameId = requestAnimationFrame(animateCursor);
			}
		}
		if (isMobileLayout) {
			requestAnimationFrame(() => startMobileAutoScroll());
			requestAnimationFrame(() => syncMobileHighlightToScroll());
		}

		return () => {
			mq.removeEventListener('change', onMq);
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			stopMobileAutoScroll();
		};
	});

	const services = [
		{ icon: 'fas fa-code-branch', title: 'Desarrollo Web', description: 'Soluciones robustas y escalables.' },
		{ icon: 'fas fa-mobile-alt', title: 'Apps Móviles', description: 'Experiencias nativas para iOS y Android.' },
		{ icon: 'fas fa-lightbulb', title: 'Estrategia Digital', description: 'Definimos tu hoja de ruta al éxito.' },
		{ icon: 'fas fa-server', title: 'Soluciones Cloud', description: 'Infraestructura segura y escalable.' },
		{ icon: 'fas fa-palette', title: 'Diseño UX/UI', description: 'Interfaces intuitivas que enamoran.' },
		{ icon: 'fas fa-chart-line', title: 'Marketing Digital', description: 'Campañas efectivas para tu visibilidad.' }
	];
	const displayServices = [...services, ...services];
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
</svelte:head>
<svelte:window on:mousemove={handleWindowMouseMove} />

<canvas class="particle-canvas" class:hero-canvas--hidden={isMobileLayout} bind:this={particleCanvas}></canvas>
<canvas class="trail-canvas" class:hero-canvas--hidden={isMobileLayout} bind:this={trailCanvas}></canvas>

<div
	class="custom-cursor"
	class:hero-canvas--hidden={isMobileLayout}
	class:is-inside={isInside}
	class:is-hovering-text={isHoveringText}
	bind:this={cursorContainer}
>
	<div class="cursor-dot" bind:this={cursorDot}></div>
</div>

<section
	class="hero-section hero-section--desktop"
	on:mousemove={handleSectionMouseMove}
	on:mouseenter={() => (isInside = true)}
	on:mouseleave={() => (isInside = false)}
	bind:this={container}
	role="region"
	aria-label="Servicios destacados"
>
	<div class="hero-touch-orb" aria-hidden="true"></div>
	<!-- Contenedor para el Título y el Indicador de Interacción -->
	<div
		class="hero-intro-wrapper"
		role="presentation"
		on:mouseenter={() => (isHoveringText = true)}
		on:mouseleave={() => (isHoveringText = false)}
		class:is-dimmed={hasInteracted && !isHoveringText}
	>
		<h1 class="hero-title">Nuestros Servicios</h1>

		<!-- Indicador de Interacción -->
		<div class="interaction-prompt interaction-prompt--desktop">
			<div class="prompt-icon-wrapper">
				<!-- Icono de Ratón -->
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<rect x="7" y="2" width="10" height="16" rx="5"></rect><path d="M12 6v4"></path>
				</svg>
			</div>
			<p class="prompt-text">Mueve el cursor</p>
		</div>

		<div class="mobile-touch-prompt" aria-hidden="true">
			<div class="swipe-glyph">
				<span class="swipe-hand"><i class="fas fa-hand-pointer"></i></span>
				<span class="swipe-arrows"><i class="fas fa-arrows-alt-h"></i></span>
			</div>
			<p class="mobile-touch-text">Carrusel automático · desliza cuando quieras</p>
		</div>
	</div>

	<!-- Contenido Principal (Tarjetas) -->
	<div class="cards-wrapper" class:is-interactive={hasInteracted && !isHoveringText}>
		<div
			class="cards-track"
			bind:this={track}
		>
			{#each displayServices as service}
				<div class="card">
					<div class="card-border"></div>
					<div class="card-content">
						<i class="{service.icon} card-icon"></i>
						<h3 class="card-title">{service.title}</h3>
						<p class="card-description">{service.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="hero-mobile" aria-label="Servicios destacados en movil">
	<div class="hero-mobile-header">
		<p class="hero-mobile-eyebrow">Excelencia Tecnica</p>
		<h1 class="hero-mobile-title section-title">Nuestros <span class="gradient-title">Servicios</span></h1>
		<p class="hero-mobile-subtitle">Desliza o deja que el carrusel avance automaticamente</p>
	</div>

	<div
		class="hero-mobile-carousel"
		bind:this={mobileCarousel}
		on:scroll={() => {
			if (!isProgrammaticMobileScroll) {
				pauseMobileAutoScroll(1400);
			}
			normalizeMobileInfiniteScroll();
			syncMobileHighlightToScroll();
		}}
	>
		<div
			class="hero-mobile-track"
			bind:this={mobileHeroTrack}
			on:touchstart={() => pauseMobileAutoScroll(2600)}
			on:touchmove={() => pauseMobileAutoScroll(2600)}
			on:touchend={() => pauseMobileAutoScroll(1100)}
			on:touchcancel={() => pauseMobileAutoScroll(1100)}
		>
			{#each displayServices as service, i}
				<article class="hero-mobile-card" class:hero-mobile-card--turn={i === mobileHighlightIndex}>
					<div class="hero-mobile-card-content">
						<i class="{service.icon} hero-mobile-card-icon"></i>
						<h3 class="hero-mobile-card-title">{service.title}</h3>
						<p class="hero-mobile-card-description">{service.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	:root {
		--color-primary: #49e4b0;
		--color-text-light: #ffffff;
		--color-text-muted: #aaaaaa;
	}

	.particle-canvas, .trail-canvas, .custom-cursor {
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
	}
	.particle-canvas { z-index: 0; }
	.trail-canvas { z-index: 2; background-color: transparent; }
	.custom-cursor { z-index: 300; width: 100%; height: 100%; opacity: 0; transition: opacity 0.3s ease; }
	.custom-cursor.is-inside { opacity: 1; }

	.hero-canvas--hidden {
		display: none !important;
	}

	@media (max-width: 900px) {
		.particle-canvas,
		.trail-canvas,
		.custom-cursor {
			display: none !important;
		}
	}

	.hero-section {
		--mouse-x: 50vw;
		--mouse-y: 50vh;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		overflow: hidden;
		background-color: transparent;
		cursor: none;
		z-index: 1;
	}

	.hero-section::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at var(--mouse-x) calc(var(--mouse-y) - 40px), rgba(73, 228, 176, 0.2) 0%, transparent 20%);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
		z-index: 1;
	}
	.hero-section:hover::before {
		opacity: 1;
	}

	.hero-touch-orb {
		display: none;
		pointer-events: none;
	}

	.mobile-touch-prompt {
		display: none;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1.75rem;
		color: var(--color-text-muted);
		pointer-events: none;
	}

	.swipe-glyph {
		position: relative;
		width: 88px;
		height: 88px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: radial-gradient(circle at 30% 25%, rgba(73, 228, 176, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.04);
		box-shadow: 0 0 0 1px rgba(73, 228, 176, 0.12) inset, 0 12px 30px rgba(0, 0, 0, 0.35);
		animation: swipe-hint 2.8s ease-in-out infinite;
	}

	.swipe-hand {
		font-size: 1.35rem;
		color: var(--color-text-light);
		opacity: 0.95;
	}

	.swipe-arrows {
		position: absolute;
		bottom: 10px;
		right: 10px;
		font-size: 0.78rem;
		color: var(--color-primary);
		opacity: 0.85;
	}

	.mobile-touch-text {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: rgba(240, 244, 248, 0.88);
		text-shadow: 0 0 14px rgba(73, 228, 176, 0.25);
	}

	@keyframes swipe-hint {
		0%,
		100% {
			transform: translateX(0) scale(1);
			box-shadow: 0 0 0 1px rgba(73, 228, 176, 0.12) inset, 0 12px 30px rgba(0, 0, 0, 0.35);
		}
		50% {
			transform: translateX(8px) scale(1.03);
			box-shadow: 0 0 0 1px rgba(73, 228, 176, 0.28) inset, 0 16px 36px rgba(0, 0, 0, 0.42);
		}
	}

	.cursor-dot {
		position: absolute;
		width: 14px;
		height: 14px;
		top: -7px;
		left: -7px;
		border-radius: 50%;
		background-color: var(--color-text-light);
		box-shadow: 0 0 15px 5px var(--color-primary);
		will-change: transform;
		transition: transform 0.05s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
	}
	.custom-cursor.is-hovering-text .cursor-dot {
		transform: scale(3);
		background-color: var(--color-primary);
		box-shadow: 0 0 25px var(--color-primary);
	}

	/* --- Contenedor del Título y el Prompt --- */
	.hero-intro-wrapper {
		position: relative;
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		pointer-events: all;
		opacity: 1;
		transition: opacity 0.4s ease-out;
	}

	.hero-intro-wrapper.is-dimmed {
		opacity: 0;
		pointer-events: none;
	}

	.hero-title {
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 900;
		letter-spacing: -0.04em;
		margin: 0;
		color: var(--color-text-light);
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
	}

	/* --- Indicador de Interacción --- */
	.interaction-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2.5rem;
		color: var(--color-text-muted);
		pointer-events: none;
	}

	.prompt-icon-wrapper {
		width: 100px;
		height: 100px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		display: grid;
		place-items: center;
		animation: pulse-glow 3s infinite ease-in-out;
	}
	.prompt-icon-wrapper svg {
		width: 32px;
		height: 32px;
		color: var(--color-text-light);
		opacity: 0.8;
	}
	.prompt-text {
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.05em;
		text-shadow: 0 0 10px rgba(73, 228, 176, 0.3);
		animation: pulse-text 3s infinite ease-in-out;
	}

	@keyframes pulse-glow {
		0%, 100% {
			transform: scale(1);
			box-shadow: 0 0 10px 0px rgba(73, 228, 176, 0.3);
			border-color: rgba(255, 255, 255, 0.2);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 40px 15px rgba(73, 228, 176, 0.5);
			border-color: rgba(73, 228, 176, 0.8);
		}
	}

	@keyframes pulse-text {
		0%, 100% {
			opacity: 0.7;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
	}

	/* --- Carrusel de Tarjetas --- */
	.cards-wrapper {
		position: absolute;
		inset: 0;
		perspective: 2000px;
		z-index: 2;
		-webkit-mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
		mask-image: linear-gradient(90deg, transparent, black 15%, black 85%, transparent);
		/* Estado inicial translúcido */
		opacity: 0.2;
		transition: opacity 0.8s ease;
	}

	/* Estado interactivo: opacidad completa */
	.cards-wrapper.is-interactive {
		opacity: 1;
	}

	@keyframes scroll { to { transform: translateX(-50%); } }

	.cards-track {
		display: flex;
		gap: 2rem;
		padding: 2rem;
		width: max-content;
		animation: scroll 80s linear infinite;
		transform: translate3d(var(--parallax-x), var(--parallax-y), 0);
		transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		position: absolute;
		inset: 0;
		align-items: center;
	}

	.card {
		--active: 0;
		--rotate-x: 0deg;
		--rotate-y: 0deg;
		position: relative;
		width: 300px;
		height: 400px;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.15);
		transition: transform 0.4s ease, opacity 0.4s ease;
		transform-style: preserve-3d;
		will-change: transform, opacity;
		/* La opacidad ahora se controla por el wrapper, pero mantenemos la reactividad al cursor */
		opacity: calc(0.9 + var(--active) * 0.1);
		transform: scale(calc(0.8 + var(--active) * 0.25)) rotateX(var(--rotate-x))
			rotateY(var(--rotate-y));
	}

	.card-border {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		border: 1px solid var(--color-primary);
		opacity: var(--active);
		transition: opacity 0.4s ease;
		box-shadow: 0 0 30px -5px var(--color-primary);
	}

	.card-content {
		padding: 2rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		opacity: calc(0.9 + var(--active) * 0.1);
		transition: opacity 0.4s ease;
		transform: translateZ(30px);
	}

	.card-icon {
		font-size: 4rem;
		color: var(--color-primary);
		margin-bottom: 1.5rem;
		text-shadow: 0 0 20px rgba(73, 228, 176, 0.5);
		transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		transform: scale(calc(0.9 + var(--active) * 0.1));
	}

	.card-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--color-text-light);
		margin-bottom: 1rem;
	}

	.card-description {
		color: var(--color-text-muted);
		font-size: 0.9rem;
		line-height: 1.6;
	}

	@media (max-width: 900px) {
		.hero-section--desktop {
			display: none;
		}

		.hero-mobile {
			display: block;
			padding: 2rem 0 1rem;
			position: relative;
			z-index: 2;
		}

		.hero-mobile-header {
			text-align: center;
			padding: 0 1rem;
			margin-bottom: 1.1rem;
		}

		.hero-mobile-eyebrow {
			margin: 0 0 0.45rem;
			font-size: 0.68rem;
			font-weight: 700;
			letter-spacing: 0.2em;
			text-transform: uppercase;
			color: rgba(73, 228, 176, 0.86);
		}

		.hero-mobile-title {
			margin: 0;
			font-size: clamp(2.1rem, 10.5vw, 3.1rem);
			font-weight: 900;
			letter-spacing: -0.04em;
			line-height: 1.02;
			color: var(--color-text-light);
			text-shadow: 0 0 26px rgba(73, 228, 176, 0.16);
		}

		.hero-mobile-subtitle {
			margin: 0.45rem auto 0;
			max-width: 320px;
			font-size: 0.72rem;
			letter-spacing: 0.02em;
			color: rgba(170, 170, 170, 0.78);
		}

		.hero-mobile-carousel {
			position: relative;
			overflow-x: auto;
			overflow-y: hidden;
			-webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
			mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none;
			touch-action: pan-x;
			overscroll-behavior-x: contain;
		}
		.hero-mobile-carousel::-webkit-scrollbar {
			display: none;
		}

		.hero-mobile-carousel::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 190px;
			height: 270px;
			transform: translate(-50%, -50%);
			pointer-events: none;
			border-radius: 24px;
			background: radial-gradient(circle, rgba(73, 228, 176, 0.24) 0%, rgba(73, 228, 176, 0.08) 48%, transparent 75%);
			filter: blur(10px);
			animation: center-premium-glow 3.2s ease-in-out infinite;
			z-index: 2;
		}

		.hero-mobile-carousel::after {
			content: '';
			position: absolute;
			left: 50%;
			bottom: 6px;
			width: 240px;
			height: 30px;
			transform: translateX(-50%);
			border-radius: 50%;
			background: radial-gradient(ellipse, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.08) 55%, transparent 80%);
			filter: blur(10px);
			pointer-events: none;
			animation: center-ground-shadow 3.2s ease-in-out infinite;
			z-index: 1;
		}

		.hero-mobile-track {
			display: flex;
			gap: 0.95rem;
			width: max-content;
			padding: 0.7rem 0.95rem 1rem;
			animation: none;
			pointer-events: none;
		}

		.hero-mobile-card {
			flex: 0 0 auto;
			width: 235px;
			height: 285px;
			border-radius: 16px;
			background: linear-gradient(160deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.03));
			border: 1px solid rgba(255, 255, 255, 0.15);
			box-shadow:
				0 12px 34px rgba(0, 0, 0, 0.34),
				0 0 0 1px rgba(73, 228, 176, 0.1) inset;
			position: relative;
			overflow: hidden;
			animation: mobile-card-depth 4.8s ease-in-out infinite;
			transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease, filter 0.35s ease;
			transform-origin: center bottom;
			transform: perspective(900px) rotateY(-5deg) rotateX(1.5deg);
			filter: saturate(0.95);
		}

		.hero-mobile-card:nth-child(2n) {
			transform: perspective(900px) rotateY(5deg) rotateX(1.5deg);
		}

		.hero-mobile-card--turn {
			transform: perspective(900px) rotateY(0deg) rotateX(0deg) scale(1.08) translateY(-3px);
			border-color: rgba(73, 228, 176, 0.75);
			box-shadow:
				0 26px 46px rgba(0, 0, 0, 0.48),
				0 0 0 2px rgba(73, 228, 176, 0.45) inset,
				0 0 34px rgba(73, 228, 176, 0.32);
			z-index: 4;
			filter: saturate(1.05);
		}


		.hero-mobile-card-content {
			height: 100%;
			padding: 1.25rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
		}

		.hero-mobile-card::before {
			content: '';
			position: absolute;
			inset: -1px;
			border-radius: inherit;
			background: linear-gradient(120deg, rgba(73, 228, 176, 0.16), transparent 40%, rgba(73, 228, 176, 0.12));
			opacity: 0.45;
			pointer-events: none;
			animation: card-sheen 4.4s ease-in-out infinite;
		}

		.hero-mobile-card::after {
			content: '';
			position: absolute;
			inset: auto 10% 8px 10%;
			height: 20px;
			border-radius: 999px;
			background: radial-gradient(ellipse, rgba(0, 0, 0, 0.38), transparent 72%);
			filter: blur(7px);
			opacity: 0.55;
			pointer-events: none;
			animation: card-floor-shadow 4.8s ease-in-out infinite;
		}

		.hero-mobile-card--turn::after {
			opacity: 0.88;
			transform: scale(1.16);
		}


		.hero-mobile-card:nth-child(3n + 1) {
			animation-delay: 0s;
		}
		.hero-mobile-card:nth-child(3n + 2) {
			animation-delay: 0.8s;
		}
		.hero-mobile-card:nth-child(3n) {
			animation-delay: 1.6s;
		}

		.hero-mobile-card-icon {
			font-size: 2.3rem;
			margin-bottom: 0.8rem;
			color: var(--color-primary);
		}

		.hero-mobile-card-title {
			margin: 0 0 0.6rem;
			font-size: 1.08rem;
			color: var(--color-text-light);
		}

		.hero-mobile-card-description {
			margin: 0;
			font-size: 0.82rem;
			line-height: 1.45;
			color: var(--color-text-muted);
		}

		@keyframes center-premium-glow {
			0%,
			100% {
				opacity: 0.45;
				transform: translate(-50%, -50%) scale(0.96);
			}
			50% {
				opacity: 0.82;
				transform: translate(-50%, -50%) scale(1.05);
			}
		}

		@keyframes center-ground-shadow {
			0%,
			100% {
				opacity: 0.36;
				transform: translateX(-50%) scale(0.92);
			}
			50% {
				opacity: 0.64;
				transform: translateX(-50%) scale(1.06);
			}
		}

		@keyframes card-sheen {
			0%,
			100% {
				opacity: 0.24;
			}
			50% {
				opacity: 0.54;
			}
		}

		@keyframes mobile-card-depth {
			0%,
			100% {
				box-shadow:
					0 12px 34px rgba(0, 0, 0, 0.32),
					0 0 0 1px rgba(73, 228, 176, 0.1) inset,
					0 0 22px rgba(73, 228, 176, 0.08);
			}
			50% {
				box-shadow:
					0 20px 40px rgba(0, 0, 0, 0.42),
					0 0 0 1px rgba(73, 228, 176, 0.2) inset,
					0 0 34px rgba(73, 228, 176, 0.16);
			}
		}

		@keyframes card-floor-shadow {
			0%,
			100% {
				opacity: 0.42;
				transform: scale(0.9);
			}
			50% {
				opacity: 0.68;
				transform: scale(1.02);
			}
		}

		.hero-section {
			cursor: auto;
			min-height: 100svh;
			height: auto;
			padding: 5.5rem 0 2.25rem;
		}

		.hero-section::before {
			opacity: 0.62;
		}

		.interaction-prompt--desktop {
			display: none;
		}

		.mobile-touch-prompt {
			display: flex;
		}

		.hero-touch-orb {
			display: none;
			position: absolute;
			width: 200px;
			height: 200px;
			left: var(--mouse-x, 50%);
			top: var(--mouse-y, 35%);
			transform: translate(-50%, -50%);
			border-radius: 50%;
			z-index: 4;
			background: radial-gradient(
				circle,
				rgba(73, 228, 176, 0.42) 0%,
				rgba(0, 191, 255, 0.14) 42%,
				transparent 72%
			);
			filter: blur(14px);
			opacity: 0.88;
			transition: left 0.14s ease-out, top 0.14s ease-out, opacity 0.35s ease;
		}

		.hero-title {
			font-size: clamp(2rem, 10vw, 3rem);
			padding: 0 1rem;
			animation: hero-title-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
		}

		@keyframes hero-title-in {
			from {
				opacity: 0;
				transform: translateY(16px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		.cards-wrapper {
			position: relative;
			inset: auto;
			margin-top: 0.5rem;
			min-height: 300px;
			opacity: 1 !important;
			perspective: 1100px;
			perspective-origin: 50% 45%;
			-webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
			mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
		}

		.cards-track {
			position: relative;
			inset: auto;
			width: 100%;
			max-width: 100%;
			animation: none;
			transform: none !important;
			transition: none;
			overflow-x: auto;
			overflow-y: visible;
			scroll-snap-type: x proximity;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: thin;
			gap: 1.1rem;
			padding: 1rem 1.25rem 1.85rem;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: nowrap;
			touch-action: auto;
			overscroll-behavior-x: contain;
		}

		.cards-track::-webkit-scrollbar {
			height: 6px;
		}
		.cards-track::-webkit-scrollbar-thumb {
			background: rgba(73, 228, 176, 0.28);
			border-radius: 999px;
		}

		.card {
			flex: 0 0 auto;
			scroll-snap-align: center;
			width: 240px;
			height: 310px;
			border-radius: 16px;
			opacity: 1;
			transform-style: preserve-3d;
			--rotate-x: 0deg;
			--rotate-y: 0deg;
			animation: card-float-3d 8s ease-in-out infinite;
		}

		.card:nth-child(3n + 1) {
			animation-delay: 0s;
		}
		.card:nth-child(3n + 2) {
			animation-delay: 0.55s;
		}
		.card:nth-child(3n) {
			animation-delay: 1.1s;
		}

		@keyframes card-float-3d {
			0%,
			100% {
				transform: translateY(0) rotateX(4deg) rotateY(-6deg) scale(1);
			}
			50% {
				transform: translateY(-10px) rotateX(-3deg) rotateY(6deg) scale(1.02);
			}
		}

		.card-content {
			padding: 1.25rem;
		}

		.card-icon {
			font-size: 2.5rem;
			margin-bottom: 0.85rem;
		}

		.card-title {
			font-size: 1.12rem;
			margin-bottom: 0.65rem;
		}

		.card-description {
			font-size: 0.82rem;
			line-height: 1.45;
		}

		.card-border {
			opacity: 0.3;
			animation: mobile-border-glow 5.5s ease-in-out infinite;
		}

		@keyframes mobile-border-glow {
			0%,
			100% {
				opacity: 0.22;
			}
			50% {
				opacity: 0.5;
			}
		}
	}

	@media (min-width: 901px) {
		.hero-mobile {
			display: none;
		}
	}
</style>
