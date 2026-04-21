import { getContext } from 'svelte';
import type { Action } from 'svelte/action';

const KEY = 'scrollObserverAction';

const fallback: Action<HTMLElement> = (node) => {
	node.classList.add('visible');
	return {};
};

/** Acción del layout; si falta el contexto (p. ej. error de setup), no rompe el render. */
export function getScrollObserverAction(): Action<HTMLElement> {
	const action = getContext<Action<HTMLElement> | undefined>(KEY);
	return typeof action === 'function' ? action : fallback;
}
