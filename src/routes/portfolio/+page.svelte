<script lang="ts">
	import { mockupSvg } from '$lib/portfolioMockupUrls';
	import Hero from './bloques/hero.svelte';
	import PortfolioContent from './bloques/portfolio-content.svelte';

	const trustStats: Array<{ icon: string; stat: string; description: string }> = [
		{ icon: 'fa-solid fa-rocket', stat: '+70', description: 'proyectos lanzados' },
		{ icon: 'fa-solid fa-chart-line', stat: '+43%', description: 'media de mejora en leads' },
		{ icon: 'fa-solid fa-stopwatch', stat: '14 días', description: 'tiempo de entrega estándar' },
		{ icon: 'fa-solid fa-star', stat: '4.9/5', description: 'valoración media de clientes' }
	];

	const featuredProject = {
		category: 'Caso destacado',
		title: 'Glow Studio',
		description: 'Rediseño visual + estructura de captación.',
		results: [
			{ label: 'Más reservas mensuales', value: '+68%' },
			{ label: 'Tiempo medio en página', value: '+2m 11s' },
			{ label: 'Conversión de visitas a lead', value: '+37%' }
		],
		deliverables: ['Diseño premium', 'SEO local', 'WhatsApp integrado', 'Mobile first'],
		image: mockupSvg.glowStudio
	};

	const portfolioProjects: Array<{
		title: string;
		category: string;
		result: string;
		tags: string[];
		image: string;
	}> = [
		{
			title: 'Barber Prime',
			category: 'Barbería',
			result: '+52% reservas online',
			tags: ['Reservas', 'Landing', 'SEO local'],
			image: mockupSvg.barberPrime
		},
		{
			title: 'Nexa Fit Club',
			category: 'Gimnasio',
			result: '+39% altas desde web',
			tags: ['Prueba gratis', 'Ads', 'Tracking'],
			image: mockupSvg.nexaFit
		},
		{
			title: 'Liora Beauty',
			category: 'Clínica estética',
			result: '+44% formularios cualificados',
			tags: ['Autoridad', 'Storytelling', 'Formulario'],
			image: mockupSvg.lioraBeauty
		},
		{
			title: 'Café Aura',
			category: 'Restauración',
			result: '+31% reservas entre semana',
			tags: ['Carta', 'Reservas', 'Eventos'],
			image: mockupSvg.cafeAura
		},
		{
			title: 'Roma Atelier',
			category: 'Moda',
			result: '+27% conversión ecommerce',
			tags: ['Ecommerce', 'Checkout', 'Upsell'],
			image: mockupSvg.romaAtelier
		},
		{
			title: 'Dental Nova',
			category: 'Clínica dental',
			result: '+46% solicitudes de valoración',
			tags: ['Tratamientos', 'Confianza', 'Carga rápida'],
			image: mockupSvg.dentalNova
		}
	];

	const cta = {
		title: '¿Quieres una web así para tu negocio?',
		description: 'Diseño visual, enfoque comercial y lanzamiento rápido.',
		primaryText: 'Quiero mi propuesta',
		secondaryText: 'Ver servicios',
		primaryLink: '/contacto',
		secondaryLink: '/servicios'
	};
</script>

<svelte:head>
	<title>Portfolio | Zenith Studio</title>
	<meta
		name="description"
		content="Descubre proyectos reales de Zenith Studio: webs premium orientadas a conversión, resultados medibles y diseño estratégico."
	/>
</svelte:head>

<Hero />
<PortfolioContent
	stats={trustStats}
	featured={featuredProject}
	projects={portfolioProjects}
	{cta}
/>
