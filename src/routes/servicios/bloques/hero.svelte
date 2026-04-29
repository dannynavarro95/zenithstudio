<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// --- Elementos del DOM ---
	let container: HTMLElement;
	let track: HTMLElement;
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
	let mobileCarouselRaf = 0;
	let mobilePauseUntil = 0;

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
		isMobileLayout = window.matchMedia('(max-width: 900px)').matches;
	}

	function handleTouchGlow(event: TouchEvent) {
		if (!isMobileLayout || !container) return;
		const t = event.touches[0];
		if (!t) return;
		const rect = container.getBoundingClientRect();
		const relativeX = t.clientX - rect.left;
		const relativeY = t.clientY - rect.top;
		container.style.setProperty('--mouse-x', `${relativeX}px`);
		container.style.setProperty('--mouse-y', `${relativeY}px`);
	}

	function pauseMobileCarousel(ms = 2200) {
		mobilePauseUntil = Date.now() + ms;
	}

	function mobileCarouselLoop() {
		if (!browser || !isMobileLayout || !track) {
			mobileCarouselRaf = 0;
			return;
		}

		const now = Date.now();
		if (now >= mobilePauseUntil) {
			const half = track.scrollWidth / 2;
			if (half > track.clientWidth + 8) {
				track.scrollLeft += 0.45;
				if (track.scrollLeft >= half) {
					track.scrollLeft -= half;
				}
			}
		}

		mobileCarouselRaf = requestAnimationFrame(mobileCarouselLoop);
	}

	function startMobileCarousel() {
		if (!isMobileLayout || !track || mobileCarouselRaf) return;
		mobilePauseUntil = Date.now() + 1000;
		mobileCarouselRaf = requestAnimationFrame(mobileCarouselLoop);
	}

	function stopMobileCarousel() {
		if (mobileCarouselRaf) {
			cancelAnimationFrame(mobileCarouselRaf);
			mobileCarouselRaf = 0;
		}
	}

	function handleSectionMouseMove(event: MouseEvent) {
		if (!container || !track) return;
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
				startMobileCarousel();
			} else {
				stopMobileCarousel();
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
			startMobileCarousel();
		}

		return () => {
			mq.removeEventListener('change', onMq);
			window.removeEventListener('resize', resizeCanvas);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
			stopMobileCarousel();
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
	class="hero-section"
	on:mousemove={handleSectionMouseMove}
	on:touchstart={handleTouchGlow}
	on:touchmove={handleTouchGlow}
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
	<div class="mobile-test-marker" aria-hidden="true">PRUEBA MOVIL V2</div>
	<div class="cards-wrapper" class:is-interactive={hasInteracted && !isHoveringText}>
		<div
			class="cards-track"
			bind:this={track}
			on:touchstart={() => pauseMobileCarousel(3000)}
			on:touchmove={() => pauseMobileCarousel(3000)}
			on:touchend={() => pauseMobileCarousel(1400)}
			on:touchcancel={() => pauseMobileCarousel(1400)}
			on:wheel={() => pauseMobileCarousel(1400)}
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
			display: block;
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

		.mobile-test-marker {
			position: fixed;
			top: 10px;
			right: 10px;
			z-index: 9999;
			display: inline-flex;
			padding: 0.55rem 0.8rem;
			border-radius: 10px;
			background: #ff2a2a;
			border: 2px solid #fff;
			color: #fff;
			font-size: 0.78rem;
			font-weight: 900;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45);
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
</style>
