/**
 * Mockups como texto SVG (`?raw`). Se pintan con `{@html}` en `PortfolioMockupSvg`
 * para no depender de `<img>`, URLs ni data-URL (misma apariencia en dev y build).
 */
import barberPrime from '$lib/assets/portfolio-mockups/barber-prime.svg?raw';
import cafeAura from '$lib/assets/portfolio-mockups/cafe-aura.svg?raw';
import dentalNova from '$lib/assets/portfolio-mockups/dental-nova.svg?raw';
import glowStudio from '$lib/assets/portfolio-mockups/glow-studio.svg?raw';
import lioraBeauty from '$lib/assets/portfolio-mockups/liora-beauty.svg?raw';
import nexaFit from '$lib/assets/portfolio-mockups/nexa-fit.svg?raw';
import romaAtelier from '$lib/assets/portfolio-mockups/roma-atelier.svg?raw';

export const mockupSvg = {
	barberPrime,
	cafeAura,
	dentalNova,
	glowStudio,
	lioraBeauty,
	nexaFit,
	romaAtelier
} as const;
