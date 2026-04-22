<script lang="ts">
	import { getScrollObserverAction } from '$lib/scrollObserverContext';

	const scrollObserverAction = getScrollObserverAction();
</script>

<section class="contact-hero">
	<div class="hero-glow"></div>
	<div class="hero-grid-overlay"></div>
	<div class="content-wrapper hero-grid" use:scrollObserverAction>
		<div class="hero-copy">
			<h1>Contacta con nosotros</h1>
			<p>
				Cuéntanos tu objetivo y te proponemos la mejor solución para tu web.
			</p>

			<div class="hero-actions">
				<a href="https://wa.me/613003673" target="_blank" rel="noreferrer" class="cta-primary">
					<i class="fab fa-whatsapp"></i>
					<span>WhatsApp directo</span>
				</a>
				<a href="mailto:contacto@zenithstudio.com" class="cta-secondary">
					<i class="fa-solid fa-envelope"></i>
					<span>Enviar email</span>
				</a>
				<a href="#formulario" class="cta-secondary">
					<i class="fa-solid fa-pen-to-square"></i>
					<span>Completar formulario</span>
				</a>
			</div>

			<div class="hero-meta">
				<span><i class="fa-solid fa-clock"></i> Menos de 24h</span>
				<span><i class="fa-solid fa-shield"></i> Sin compromiso</span>
				<span><i class="fa-solid fa-bolt"></i> Enfoque en conversión</span>
			</div>
		</div>

		<div class="hero-panel">
			<div class="panel-top">
				<span class="dot"></span><span class="dot"></span><span class="dot"></span>
				<p>Cómo trabajamos contigo</p>
			</div>
			<div class="panel-body">
				<div class="flow-step">
					<span>1</span>
					<div>
						<strong>Nos cuentas tu objetivo</strong>
						<p>Qué necesitas y qué quieres conseguir.</p>
					</div>
				</div>
				<div class="flow-step">
					<span>2</span>
					<div>
						<strong>Analizamos tu caso</strong>
						<p>Te damos el enfoque más efectivo.</p>
					</div>
				</div>
				<div class="flow-step">
					<span>3</span>
					<div>
						<strong>Recibes propuesta clara</strong>
						<p>Con inversión, plazos y siguientes pasos.</p>
					</div>
				</div>
			</div>
			<div class="panel-foot">
				<i class="fa-solid fa-clock"></i>
				Sin tecnicismos innecesarios, con enfoque práctico
			</div>
		</div>
	</div>
</section>

<style>
	.contact-hero {
		position: relative;
		padding: 6.5rem 0 3.2rem;
		background: radial-gradient(circle at 12% 18%, rgba(73, 228, 176, 0.16), transparent 30%),
			radial-gradient(circle at 88% 10%, rgba(0, 191, 255, 0.14), transparent 26%),
			linear-gradient(180deg, rgba(11, 14, 20, 1) 0%, rgba(11, 14, 20, 0.92) 100%);
		overflow: hidden;
	}

	.hero-glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, rgba(255, 255, 255, 0.04), transparent 64%);
		pointer-events: none;
	}

	.hero-grid-overlay {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
		background-size: 36px 36px;
		opacity: 0.12;
		pointer-events: none;
	}

	.hero-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 1.2rem;
		align-items: center;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 4.9vw, 3.4rem);
		line-height: 1.06;
		font-weight: 900;
		color: transparent;
		background: linear-gradient(98deg, #f8fbff 0%, #dcf8ef 45%, #9df1d2 100%);
		-webkit-background-clip: text;
		background-clip: text;
		max-width: 14ch;
		letter-spacing: -0.02em;
		text-shadow: 0 6px 28px rgba(73, 228, 176, 0.18);
	}

	.hero-copy p {
		margin: 0.95rem 0 0;
		max-width: 56ch;
		color: rgba(240, 244, 248, 0.88);
		font-size: 1.04rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.25rem;
	}

	.cta-primary,
	.cta-secondary {
		position: relative;
		display: inline-grid;
		grid-auto-flow: column;
		align-items: center;
		gap: 0.55rem;
		padding: 0.82rem 1.1rem;
		border-radius: 999px;
		font-weight: 700;
		font-size: 0.93rem;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			border-color 0.25s ease,
			background 0.25s ease;
		overflow: hidden;
	}

	.cta-primary::after,
	.cta-secondary::after {
		content: '';
		position: absolute;
		top: -70%;
		left: -40%;
		width: 28%;
		height: 240%;
		background: linear-gradient(
			120deg,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.5) 45%,
			rgba(255, 255, 255, 0) 100%
		);
		transform: rotate(20deg);
		opacity: 0;
		pointer-events: none;
	}

	.cta-primary {
		background: linear-gradient(120deg, rgba(73, 228, 176, 1), rgba(20, 184, 166, 1));
		color: var(--color-background);
		box-shadow:
			0 14px 24px rgba(73, 228, 176, 0.22),
			0 0 0 1px rgba(255, 255, 255, 0.16) inset;
	}

	.cta-secondary {
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: rgba(255, 255, 255, 0.04);
	}

	.cta-primary:hover,
	.cta-secondary:hover {
		transform: translateY(-2px);
	}

	.cta-primary:hover::after,
	.cta-secondary:hover::after {
		opacity: 1;
		animation: button-shine 0.8s ease;
	}

	.cta-secondary:hover {
		border-color: rgba(73, 228, 176, 0.35);
		background: rgba(255, 255, 255, 0.07);
	}

	.hero-meta {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.hero-meta span {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		padding: 0.35rem 0.58rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.11);
		color: var(--color-text-muted);
	}

	.hero-meta i {
		color: var(--color-primary);
	}

	.hero-panel {
		position: relative;
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: linear-gradient(150deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
		overflow: hidden;
		box-shadow:
			0 20px 32px rgba(0, 0, 0, 0.24),
			0 0 0 1px rgba(255, 255, 255, 0.06) inset;
		animation: panel-float 6s ease-in-out infinite;
	}

	.hero-panel::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 16px;
		padding: 1px;
		background: linear-gradient(130deg, rgba(73, 228, 176, 0.45), rgba(0, 191, 255, 0.25), rgba(73, 228, 176, 0.4));
		mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
		-webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
		mask-composite: exclude;
		-webkit-mask-composite: xor;
		pointer-events: none;
		opacity: 0.7;
	}

	.panel-top {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.75rem 0.9rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(11, 14, 20, 0.55);
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.55);
	}

	.panel-top p {
		margin: 0 0 0 0.45rem;
		font-size: 0.78rem;
		color: var(--color-text-muted);
		font-weight: 600;
	}

	.panel-body {
		padding: 0.9rem;
		display: grid;
		gap: 0.65rem;
	}

	.flow-step {
		display: grid;
		grid-template-columns: 26px 1fr;
		gap: 0.6rem;
		align-items: start;
		padding: 0.5rem;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.03);
	}

	.flow-step span {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.76rem;
		font-weight: 700;
		background: rgba(73, 228, 176, 0.17);
		color: var(--color-primary);
	}

	.flow-step strong {
		display: block;
		font-size: 0.9rem;
	}

	.flow-step p {
		margin: 0.15rem 0 0;
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

	.panel-foot {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.78rem 0.9rem;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.8rem;
		color: var(--color-text-muted);
		background: rgba(255, 255, 255, 0.02);
	}

	.panel-foot i {
		color: var(--color-primary);
	}

	@keyframes button-shine {
		0% {
			transform: translateX(-140%) rotate(20deg);
			opacity: 0;
		}
		40% {
			opacity: 0.9;
		}
		100% {
			transform: translateX(260%) rotate(20deg);
			opacity: 0;
		}
	}

	@keyframes panel-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	@media (max-width: 880px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		h1 {
			max-width: 18ch;
		}
	}
</style>
