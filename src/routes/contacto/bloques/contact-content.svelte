<script lang="ts">
	import { getScrollObserverAction } from '$lib/scrollObserverContext';

	const scrollObserverAction = getScrollObserverAction();

	let name = '';
	let email = '';
	let company = '';
	let service = 'Diseño y desarrollo web';
	let budget = 'Menos de 500€';
	let timeline = 'Este mes';
	let message = '';
	let statusMessage = '';
	let isSubmitting = false;

	const highlights = [
		{ icon: 'fa-solid fa-clock', text: 'Respuesta en menos de 24h laborables' },
		{ icon: 'fa-solid fa-bolt', text: 'Propuesta accionable y sin relleno' },
		{ icon: 'fa-solid fa-shield', text: 'Transparencia total en inversión y plazos' }
	];

	function handleSubmit() {
		if (!name || !email || !message) {
			statusMessage = 'Completa nombre, email y detalle del proyecto.';
			return;
		}

		isSubmitting = true;
		statusMessage = 'Enviando información...';

		// Simulación de envío hasta conectar backend o endpoint real.
		setTimeout(() => {
			isSubmitting = false;
			statusMessage =
				'Gracias, recibimos tu briefing. Te responderemos con próximos pasos en menos de 24h laborables.';

			name = '';
			email = '';
			company = '';
			service = 'Diseño y desarrollo web';
			budget = 'Menos de 500€';
			timeline = 'Este mes';
			message = '';
		}, 1600);
	}
</script>

<section id="formulario" class="contact-content">
	<div class="content-wrapper content-grid">
		<div class="contact-data" use:scrollObserverAction>
			<h2>Respuesta rápida y enfoque claro</h2>
			<p>
				Describe tu proyecto en pocas líneas y te diremos el mejor siguiente paso.
			</p>

			<div class="mini-highlights">
				{#each highlights as item}
					<article class="highlight-item">
						<i class={item.icon}></i>
						<p>{item.text}</p>
					</article>
				{/each}
			</div>
		</div>

		<form class="contact-form" use:scrollObserverAction on:submit|preventDefault={handleSubmit}>
			<div class="form-head">
				<p class="form-kicker">Formulario de proyecto</p>
				<h3>Cuéntanos tu proyecto</h3>
				<p class="form-intro">
					1 minuto para completarlo.
				</p>
			</div>

			<div class="form-grid">
				<label>
					Nombre completo *
					<input type="text" bind:value={name} required placeholder="Tu nombre" />
				</label>

				<label>
					Email profesional *
					<input type="email" bind:value={email} required placeholder="nombre@empresa.com" />
				</label>

				<label>
					Empresa
					<input type="text" bind:value={company} placeholder="Nombre de tu marca" />
				</label>

				<label>
					Servicio principal
					<select bind:value={service}>
						<option>Diseño y desarrollo web</option>
						<option>Rediseño completo</option>
						<option>Optimización de conversión</option>
						<option>SEO y rendimiento técnico</option>
						<option>Consultoría estratégica</option>
					</select>
				</label>

				<label>
					Presupuesto estimado
					<select bind:value={budget}>
						<option>Menos de 500€</option>
						<option>500€ - 1.000€</option>
						<option>1.000€ - 2.000€</option>
						<option>2.000€ - 3.000€</option>
						<option>Más de 3.000€</option>
					</select>
				</label>

				<label>
					¿Cuándo quieres empezar?
					<select bind:value={timeline}>
						<option>Esta semana</option>
						<option>Este mes</option>
						<option>En 1-2 meses</option>
						<option>Solo estoy valorando</option>
					</select>
				</label>
			</div>

			<label class="full-field">
				Detalles del proyecto *
				<textarea
					rows="5"
					bind:value={message}
					required
					placeholder="Qué necesitas, objetivos, referencias y cualquier detalle útil."
				></textarea>
			</label>

			<div class="form-actions">
				<button type="submit" disabled={isSubmitting}>
					{#if isSubmitting}
						Enviando...
					{:else}
						Enviar briefing
					{/if}
				</button>
				<p>Sin spam. Solo te contactamos para ayudarte con tu proyecto.</p>
			</div>

			{#if statusMessage}
				<p class="status-message" class:success={statusMessage.includes('Gracias')}>{statusMessage}</p>
			{/if}
		</form>
	</div>
</section>

<style>
	.contact-content {
		padding: 0 0 5rem;
		background: linear-gradient(180deg, rgba(27, 30, 41, 0.45) 0%, rgba(11, 14, 20, 0.92) 100%);
	}

	.content-grid {
		display: grid;
		grid-template-columns: 0.95fr 1.2fr;
		gap: 1rem;
		align-items: start;
	}

	.contact-data {
		padding: 1.2rem;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.09);
	}

	.contact-data h2 {
		margin: 0;
		font-size: clamp(1.4rem, 2.3vw, 2rem);
		line-height: 1.2;
	}

	.contact-data > p {
		margin: 0.7rem 0 0;
		color: var(--color-text-muted);
		max-width: 48ch;
	}

	.mini-faq {
		margin-top: 1.2rem;
	}

	.mini-highlights {
		margin-top: 1.2rem;
		display: grid;
		gap: 0.65rem;
	}

	.highlight-item {
		margin: 0;
		display: grid;
		grid-template-columns: 30px 1fr;
		gap: 0.58rem;
		align-items: center;
		padding: 0.62rem;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.highlight-item i {
		width: 30px;
		height: 30px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: rgba(73, 228, 176, 0.14);
		color: var(--color-primary);
		font-size: 0.78rem;
	}

	.highlight-item p {
		margin: 0;
		font-size: 0.84rem;
		color: var(--color-text-muted);
	}

	.contact-form {
		padding: 1.2rem;
		border-radius: 16px;
		background: linear-gradient(150deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
		border: 1px solid rgba(255, 255, 255, 0.14);
	}

	.form-head {
		margin-bottom: 1rem;
	}

	.form-kicker {
		margin: 0;
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	.form-head h3 {
		margin: 0.45rem 0 0;
		font-size: clamp(1.2rem, 2vw, 1.6rem);
	}

	.form-intro {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text-muted);
		max-width: 60ch;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.42rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: rgba(240, 244, 248, 0.96);
	}

	input,
	select,
	textarea {
		font: inherit;
		padding: 0.72rem 0.78rem;
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.15);
		background: rgba(11, 14, 20, 0.68);
		color: var(--color-text-light);
		outline: none;
		transition:
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	input:focus,
	select:focus,
	textarea:focus {
		border-color: rgba(73, 228, 176, 0.6);
		box-shadow: 0 0 0 3px rgba(73, 228, 176, 0.16);
	}

	.full-field {
		margin-top: 0.75rem;
	}

	.form-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.form-actions button {
		padding: 0.85rem 1.2rem;
		border: none;
		border-radius: 999px;
		font-size: 0.95rem;
		font-weight: 700;
		cursor: pointer;
		color: var(--color-background);
		background: linear-gradient(120deg, rgba(73, 228, 176, 1), rgba(0, 191, 255, 0.9));
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			filter 0.25s ease;
		box-shadow: 0 14px 24px rgba(73, 228, 176, 0.2);
	}

	.form-actions button:hover:not(:disabled) {
		transform: translateY(-2px);
		filter: brightness(1.02) saturate(1.04);
	}

	.form-actions button:disabled {
		opacity: 0.68;
		cursor: not-allowed;
	}

	.form-actions p {
		margin: 0;
		font-size: 0.78rem;
		color: var(--color-text-muted);
	}

	.status-message {
		margin: 0.9rem 0 0;
		padding: 0.72rem;
		border-radius: 10px;
		font-size: 0.9rem;
		background: rgba(245, 101, 101, 0.12);
		color: #f8a4a4;
		border: 1px solid rgba(245, 101, 101, 0.35);
	}

	.status-message.success {
		background: rgba(73, 228, 176, 0.12);
		color: var(--color-primary);
		border-color: rgba(73, 228, 176, 0.35);
	}

	@media (max-width: 980px) {
		.content-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 720px) {
		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
