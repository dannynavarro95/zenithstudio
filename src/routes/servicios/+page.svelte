<script lang="ts">
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import type { Action } from 'svelte/action';
	import Hero from './bloques/hero.svelte';
	import Bloque1 from './bloques/bloque1.svelte';
	import Bloque2 from './bloques/bloque2.svelte';

	/**
	 * setContext debe ejecutarse en la inicialización del componente, no en onMount:
	 * los hijos (Hero, bloques) leen el contexto al montarse, antes de que onMount del padre corra.
	 */
	const scrollObserverAction: Action<HTMLElement> = (node) => {
		if (!browser || !('IntersectionObserver' in window)) {
			node.querySelectorAll('.animated-content').forEach((el) => el.classList.add('visible'));
			return {};
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const elementsToAnimate = node.querySelectorAll('.animated-content');
		elementsToAnimate.forEach((el) => observer.observe(el));

		return {
			destroy() {
				elementsToAnimate.forEach((el) => observer.unobserve(el));
			}
		};
	};

	setContext('scrollObserverAction', scrollObserverAction);
</script>

<div class="services-page">
	<Hero />
	<Bloque1 />
	<Bloque2 />
</div>
