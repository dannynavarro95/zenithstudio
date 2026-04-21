<script lang="ts">
	import { onMount } from 'svelte';

	const services = [
		{
			icon: 'fas fa-laptop-code',
			title: 'Desarrollo Web High-End',
			description: 'Sitios ultra rápidos construidos con SvelteKit y optimizados para conversión y SEO técnico.',
			features: ['Arquitectura Escalable', 'Performance 100/100', 'SEO de Élite']
		},
		{
			icon: 'fas fa-mobile-alt',
			title: 'Apps Progresivas (PWA)',
			description: 'Experiencias móviles fluidas sin la fricción de las tiendas de aplicaciones tradicionales.',
			features: ['Acceso Offline', 'Notificaciones Push', 'Instalación Directa']
		},
		{
			icon: 'fas fa-bezier-curve',
			title: 'Diseño UX/UI Premium',
			description: 'Interfaces quirúrgicas diseñadas para guiar al usuario y fortalecer la identidad de marca.',
			features: ['Prototipado Avanzado', 'Sistemas de Diseño', 'Micro-interacciones']
		},
		{
			icon: 'fas fa-rocket',
			title: 'Estrategia Digital',
			description: 'No solo hacemos webs; trazamos la ruta técnica para escalar tu facturación y visibilidad.',
			features: ['Auditoría de Embudos', 'Analítica Avanzada', 'Growth Hacking']
		}
	];

	// Lógica para el efecto de luz que sigue al cursor en las tarjetas
	function handleMouseMove(e: MouseEvent, card: HTMLDivElement) {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	}

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

<section class="section services-block">
	<div class="content-wrapper">
		<div class="header-group animate-on-scroll">
			<span class="eyebrow">Excelencia Técnica</span>
			<h2 class="section-title">
				Soluciones <span class="gradient-title">Digitales de Alto Impacto</span>
			</h2>
			<p class="section-subtitle">
				Fusionamos ingeniería de vanguardia con diseño de clase mundial para crear activos digitales que no solo se ven bien, sino que dominan el mercado.
			</p>
		</div>

		<div class="services-grid">
			{#each services as service, i}
				<div 
					class="service-card animate-on-scroll step-card" 
					style="transition-delay: {i * 0.1}s"
					on:mousemove={(e) => handleMouseMove(e, e.currentTarget as HTMLDivElement)}
				>
					<!-- Capa de brillo dinámico -->
					<div class="spotlight"></div>
					
					<div class="card-inner">
						<div class="icon-box">
							<i class={service.icon}></i>
						</div>
						<h3 class="service-title">{service.title}</h3>
						<p class="service-text">{service.description}</p>
						
						<ul class="feature-list">
							{#each service.features as feature}
								<li><i class="fas fa-check-circle"></i> {feature}</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.services-block {
		position: relative;
		background: radial-gradient(circle at 50% 0%, rgba(73, 228, 176, 0.05) 0%, transparent 50%);
	}

	.header-group {
		text-align: center;
		margin-bottom: 5rem;
	}

	.eyebrow {
		color: var(--color-primary);
		text-transform: uppercase;
		letter-spacing: 0.2em;
		font-size: 0.8rem;
		font-weight: 700;
		display: block;
		margin-bottom: 1rem;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.service-card {
		position: relative;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		padding: 2.5rem;
		overflow: hidden;
		transition: transform 0.3s ease, background 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.service-card:hover {
		background: rgba(255, 255, 255, 0.05);
		transform: translateY(-10px);
	}

	/* Efecto de luz dinámica */
	.spotlight {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
			rgba(73, 228, 176, 0.1),
			transparent 40%
		);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}

	.service-card:hover .spotlight {
		opacity: 1;
	}

	.icon-box {
		width: 60px;
		height: 60px;
		background: rgba(73, 228, 176, 0.1);
		border-radius: 16px;
		display: grid;
		place-items: center;
		margin-bottom: 1.5rem;
		color: var(--color-primary);
		font-size: 1.5rem;
		box-shadow: 0 0 20px rgba(73, 228, 176, 0.1);
	}

	.service-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
	}

	.service-text {
		color: var(--color-text-muted);
		font-size: 0.95rem;
		margin-bottom: 2rem;
	}

	.feature-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1.5rem;
	}

	.feature-list li {
		font-size: 0.85rem;
		margin-bottom: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-text-light);
	}

	.feature-list li i {
		color: var(--color-primary);
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
