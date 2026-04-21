<script lang="ts">
	/** Markup SVG del repo (solo mockups locales, no contenido externo). */
	export let svg: string;
	/** Accesibilidad: texto corto; si es decorativo, usar decorative y label vacío */
	export let label = '';
	export let decorative = false;
</script>

<div
	class="portfolio-mockup-svg"
	role={decorative ? undefined : 'img'}
	aria-label={decorative ? undefined : label}
	aria-hidden={decorative ? 'true' : undefined}
>
	{@html svg}
</div>

<style>
	.portfolio-mockup-svg {
		width: 100%;
		height: 100%;
		min-height: 0;
		display: block;
		overflow: hidden;
		line-height: 0;
	}

	.portfolio-mockup-svg :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		object-position: top center;
		max-height: 100%;
	}
</style>
