<script lang="ts">
	import Hero from './bloques/hero.svelte';
	import Bloque1Proceso from './bloques/bloque1.svelte';
	import Bloque2USP from './bloques/bloque2.svelte';
	import Bloque3ProyectosYCTA from './bloques/bloque3.svelte';
</script>

<svelte:head>
	<title>ZenithStudio - Arquitectura Digital de Vanguardia</title>
</svelte:head>

<!-- 1. BLOQUE HERO (con lógica de Parallax y Fade) -->
<Hero />

<!-- 2. BLOQUE 1: PROCESO (Línea de tiempo animada) — datos internos del bloque -->
<Bloque1Proceso />

<!-- 3. BLOQUE 2: USP — datos internos del bloque -->
<Bloque2USP />

<!-- 4. BLOQUE 3: PROYECTOS — datos internos del bloque -->
<Bloque3ProyectosYCTA />
