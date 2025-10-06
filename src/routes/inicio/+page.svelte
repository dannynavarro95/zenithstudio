<script lang="ts">
    import Hero from './bloques/hero.svelte';
    import Bloque1Proceso from './bloques/bloque1.svelte';
    import Bloque2USP from './bloques/bloque2.svelte';
    import Bloque3ProyectosYCTA from './bloques/bloque3.svelte';

    // --- DATOS ESTÁTICOS PARA LOS BLOQUES ---

    const processSteps = [
        { step: 1, title: "Consulta y Descubrimiento", description: "Reunión inicial para entender el ADN de tu marca, objetivos de negocio y desafíos técnicos." },
        { step: 2, title: "Estrategia & Wireframes", description: "Definición de la arquitectura de contenidos (Sitemap) y prototipado de la experiencia de usuario (UX)." },
        { step: 3, title: "Diseño Visual (UI/UX)", description: "Creación del diseño de alta fidelidad, paleta de colores premium y especificaciones de interactividad." },
        { step: 4, title: "Desarrollo de Arquitectura", description: "Fase de codificación con Svelte, integraciones de CMS/API y pruebas continuas de performance." },
        { step: 5, title: "Lanzamiento y Auditoría", description: "Despliegue final en servidores optimizados y auditoría post-lanzamiento para asegurar la máxima calidad y velocidad." }
    ];

    const uspItems = [
        { title: "Rendimiento Inigualable", description: "Codificación ligera con Svelte para puntajes PageSpeed perfectos y una latencia casi nula.", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
        { title: "Diseño Orientado a ROI", description: "Interfaces UX/UI sofisticadas, diseñadas científicamente para maximizar la conversión y la retención de clientes.", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M14.5 9.5a3 3 0 0 0-3-3m-3 3a3 3 0 0 0 3 3"/></circle></svg>` },
        { title: "Arquitectura Futura", description: "Plataformas *headless* y modulares que se adaptan a la evolución del negocio sin necesidad de rehacer la inversión.", icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>` }
    ];

    const featuredProjects = [
        { category: "E-Commerce de Lujo", title: "Plataforma Quantum X", description: "Revolucionamos la experiencia de compra con un frontend ultra-rápido y animaciones de producto en 3D.", tag: "SvelteKit + Headless CMS", image: '/project-thumb-1.jpg' },
        { category: "SaaS Empresarial", title: "Dashboard Sentinel", description: "Un panel de control B2B que procesa millones de datos en tiempo real con una latencia mínima.", tag: "Svelte + TypeScript", image: '/project-thumb-2.jpg' },
        { category: "Branding & Web", title: "Identidad KAIZEN", description: "Diseño de marca completo e implementación en sitio web corporativo estático y elegante.", tag: "Astro + Tailwind", image: '/project-thumb-3.jpg' },
        { category: "Fintech", title: "Portal Genesis", description: "Un portal de clientes seguro y extremadamente rápido para la gestión de activos financieros.", tag: "SvelteKit + Supabase", image: '/project-thumb-4.jpg' }
    ];
</script>

<svelte:head>
    <title>ZenithStudio - Arquitectura Digital de Vanguardia</title>
</svelte:head>

<!-- 1. BLOQUE HERO (con lógica de Parallax y Fade) -->
<Hero />

<!-- 2. BLOQUE 1: PROCESO (Línea de tiempo animada) -->
<Bloque1Proceso {processSteps} />

<!-- 3. BLOQUE 2: USP (Grid de Propuestas de Valor) -->
<Bloque2USP {uspItems} />

<!-- 4. BLOQUE 3: PROYECTOS, CTA y FOOTER -->
<Bloque3ProyectosYCTA {featuredProjects} />
