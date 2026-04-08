<script lang="ts">
	import Hero from './bloques/hero.svelte';
	import Bloque1 from './bloques/bloque1.svelte';
	import Bloque2 from './bloques/bloque2.svelte';
	import Bloque3 from './bloques/bloque3.svelte';
	import { setContext, onMount } from 'svelte';
	import type { Action } from 'svelte/action';

	onMount(() => {
		// --- Lógica del observador de scroll directamente aquí ---

		// 1. Creamos el observador que vigilará los elementos.
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// Cuando un elemento es visible, le añadimos la clase 'visible'.
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						// Dejamos de observarlo para no repetir la animación.
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 } // La animación se activa cuando el 10% del elemento es visible.
		);

		// 2. Creamos la "acción" de Svelte que usaremos en los bloques.
		const scrollObserverAction: Action<HTMLElement> = (node) => {
			// Le decimos al observador que vigile los elementos con la clase '.animated-content'
			// que estén dentro del nodo donde se usa la acción.
			const elementsToAnimate = node.querySelectorAll('.animated-content');
			elementsToAnimate.forEach((el) => observer.observe(el));

			return {
				// Cuando el componente se destruye, dejamos de observar para limpiar.
				destroy() {
					elementsToAnimate.forEach((el) => observer.unobserve(el));
				}
			};
		};

		// 3. Proveemos la acción a los componentes hijos (hero, bloque1, etc.).
		setContext('scrollObserverAction', scrollObserverAction);
	});
</script>

<div class="services-page">
	<Hero />
	<Bloque1 />
	<Bloque2 />
	<Bloque3 />
</div>
