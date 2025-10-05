<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion'; // <--- CRÍTICO: Importamos tweened
    import { cubicOut } from 'svelte/easing';
    import type { Action } from 'svelte/action';

    // --- LÓGICA DE HERENCIA ---
    let heroElement: HTMLElement | null = null; 
    const scrollPosition = tweened(0, { duration: 0, easing: cubicOut }); 
    let heroHeight: number = 1;

    // Control de animaciones de entrada inicial del Hero
    let titleLoaded: boolean = false;
    let subtitleLoaded: boolean = false;
    let ctaLoaded: boolean = false;
    
    // --- LÓGICA CURSOR SEGUIDOR ---
    let cursorX: number = 0; 
    let cursorY: number = 0;

    function handleScroll(): void {
        const currentScroll = window.scrollY;
        if (heroElement) { 
            heroHeight = heroElement.clientHeight;
        }
        scrollPosition.set(currentScroll);
    }

    function handleMouseMoveRelative(event: MouseEvent): void {
        cursorX = event.clientX;
        cursorY = event.clientY;
    }

    function handleVideoError(event: Event): void {
        const videoElement = event.currentTarget as HTMLVideoElement;
        videoElement.style.display = 'none';
        
        const container = videoElement.closest('.video-container') as HTMLElement | null;
        if (container) {
            container.style.setProperty('background-color', '#050812');
        }
    }

    onMount(() => {
        const calculateHeight = () => {
            if (heroElement) { 
                heroHeight = heroElement.clientHeight;
            }
        };
        
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        window.addEventListener('scroll', handleScroll);
        
        window.addEventListener('mousemove', handleMouseMoveRelative);
        
        // Animación de entrada del Hero
        setTimeout(() => { titleLoaded = true; }, 300); 
        setTimeout(() => { subtitleLoaded = true; }, 500);  
        setTimeout(() => { ctaLoaded = true; }, 700);     
    });

    onDestroy(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMoveRelative);
    });

    // CÁLCULOS REACTIVOS PARA EL EFECTO DE FADE DEL CONTENIDO
    $: scrollRatio = Math.min(1, $scrollPosition / heroHeight); 
    $: contentOpacity = 1 - (scrollRatio * 3); 
    $: contentParallaxY = $scrollPosition * 0.2; 
    
    // CORRECCIÓN FINAL CURSOR
    $: followerStyleAbsolute = `
        transform: translate3d(calc(${cursorX}px - 25px), calc(${cursorY}px - 25px), 0);
        top: 0; 
        left: 0;
    `;

    // ------------------------------------------------------------------
    // --- LÓGICA DE INTERSECCIÓN (Fundido Proporcional al Scroll SUAVE) ---
    // ------------------------------------------------------------------
    
    const observeSections: Action<HTMLElement> = (node) => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            node.style.opacity = '1'; 
            return {};
        }
        
        // 1. Crear un valor Svelte "tweened" para suavizar la opacidad
        // Duración corta (200ms) para que sea sensible pero suave.
        const opacityValue = tweened(0, {
            duration: 200, 
            easing: cubicOut 
        });

        // 2. Suscribirse al tween y aplicar el valor reactivo
        const unsubscribe = opacityValue.subscribe(value => {
            node.style.opacity = value.toString();
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Multiplicamos el ratio para asegurar el 100% de opacidad un poco antes
                const newOpacity = Math.min(1, entry.intersectionRatio * 1.5); 
                
                // 3. Establecer el valor del tween. Svelte se encarga de la suavidad.
                opacityValue.set(newOpacity);
            });
        }, {
            // Usamos un array de thresholds denso para que el observer se dispare muy a menudo
            threshold: Array.from({ length: 100 }, (_, i) => i / 100),
            // Disparar la aparición 100px antes del borde inferior de la pantalla.
            rootMargin: '0px 0px -100px 0px' 
        });

        observer.observe(node);

        return {
            destroy() {
                observer.unobserve(node);
                unsubscribe(); // Limpiar la suscripción del tween
            }
        };
    };
    
    // ------------------------------------------------------------------
    // --- LÓGICA DE ANIMACIÓN LÍNEA DE TIEMPO (Especializada) ---
    // Se mantiene separada ya que tiene una animación más compleja.
    // ------------------------------------------------------------------
    let timelineObserver: IntersectionObserver | undefined = undefined;
    const filledWidth = tweened(0, { duration: 1500, easing: cubicOut }); 
    const activeStep = tweened(0, { duration: 100, easing: cubicOut }); 

    const observeTimeline: Action<HTMLElement> = (node) => {
        timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    filledWidth.set(100); 
                    for (let i = 0; i < processSteps.length; i++) {
                        setTimeout(() => {
                            activeStep.set(i + 1);
                        }, 500 + (i * 300)); 
                    }
                } else {
                    if (entry.boundingClientRect.top < 0 && entry.rootBounds && entry.boundingClientRect.bottom < entry.rootBounds.top) {
                         filledWidth.set(0); 
                         activeStep.set(0);
                    }
                }
            });
        }, {
            rootMargin: '0px 0px -20% 0px', 
            threshold: 0.1
        });
        timelineObserver.observe(node);
        return {
            destroy() {
                if (timelineObserver) {
                    timelineObserver.unobserve(node);
                }
            }
        };
    };

    // ------------------------------------------------------------------
    // --- DATOS ---
    // ------------------------------------------------------------------

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

    const processSteps = [
        { step: 1, title: "Consulta y Descubrimiento", description: "Reunión inicial para entender el ADN de tu marca, objetivos de negocio y desafíos técnicos." },
        { step: 2, title: "Estrategia & Wireframes", description: "Definición de la arquitectura de contenidos (Sitemap) y prototipado de la experiencia de usuario (UX)." },
        { step: 3, title: "Diseño Visual (UI/UX)", description: "Creación del diseño de alta fidelidad, paleta de colores premium y especificaciones de interactividad." },
        { step: 4, title: "Desarrollo de Arquitectura", description: "Fase de codificación con Svelte, integraciones de CMS/API y pruebas continuas de performance." },
        { step: 5, title: "Lanzamiento y Auditoría", description: "Despliegue final en servidores optimizados y auditoría post-lanzamiento para asegurar la máxima calidad y velocidad." }
    ];
</script>

<div 
    class="cursor-follower" 
    style={followerStyleAbsolute}
></div>

<section class="hero" bind:this={heroElement}>
    <div class="video-container absolute-video-bg"> 
        <video 
            autoplay 
            loop 
            muted 
            playsinline
            preload="auto" 
            src="/fondo-abstracto-tech-video.mp4" 
            class="hero-video"
            on:error={handleVideoError}
        ></video>
        <div class="video-overlay absolute-overlay"></div>
    </div>
    
    <div class="video-fade-to-section"></div> 

    <div 
        class="hero-content" 
        style="
            opacity: {contentOpacity};
            transform: translateY(-{contentParallaxY}px);
        "
    >
        <h1 class:animate-in={titleLoaded}>
            <span class="light-text">Creamos</span>
            <span class="gradient-text">Arquitectura Digital</span>
            <span class="light-text">para Liderar tu Sector.</span>
        </h1>
        <p class="subtitle" class:animate-in={subtitleLoaded}>
            Diseño web de vanguardia, rendimiento extremo y consultoría estratégica para marcas que exigen la excelencia.
        </p>
        
        <div class="cta-wrapper" class:animate-in={ctaLoaded}>
            <a href="/contacto" class="cta-primary"> 
                Comenzar mi Proyecto
            </a>
        </div>
    </div>
</section>

<section class="section client-journey-section" data-section-id="process" use:observeTimeline>
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>El Viaje a la <strong class="gradient-title">Maestría Digital</strong></h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>Tu visión, estructurada en cinco fases estratégicas para asegurar un lanzamiento impecable y escalable.</p>
        
        <div class="process-timeline-wrapper animated-content-ratio" use:observeSections> 
            <div class="process-steps-timeline">
                
                <div class="timeline-line-fill" style="width: {$filledWidth}%;"></div>
                
                {#each processSteps as step}
                    <div class="timeline-step">
                        <div 
                            class="step-icon {step.step <= $activeStep ? 'is-active' : ''}"
                            style={`
                                ${step.step === 1 ? '--step-anchor-x: 0%;' : ''}
                                ${step.step === 2 ? '--step-anchor-x: 25%;' : ''}
                                ${step.step === 3 ? '--step-anchor-x: 50%;' : ''}
                                ${step.step === 4 ? '--step-anchor-x: 75%;' : ''}
                                ${step.step === 5 ? '--step-anchor-x: 100%;' : ''}
                            `}
                        >
                            <span class="step-number">{step.step}</span>
                        </div>
                        
                        <div 
                            class="step-content"
                        > 
                            <h3 class="step-title-animate">{step.title}</h3> 
                            <p>{step.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<section class="section value-prop-grid" data-section-id="usp">
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>Pilares de una <strong class="gradient-title">Plataforma de Alto Valor</strong></h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>Nuestra metodología se fundamenta en la performance, la conversión y la innovación tecnológica.</p>
        
        <div class="usp-cards-wrapper">
            {#each uspItems as item}
                <div class="usp-card animated-content-ratio" use:observeSections>
                    <div class="icon-circle">
                        {@html item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div class="card-border-glow"></div> 
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="featured-projects-section" data-section-id="projects">
    <div class="projects-header-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>Construyendo el <strong class="gradient-title">Legado Digital</strong></h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>Casos de éxito y soluciones de alto impacto para marcas que buscan la dominación de su nicho.</p>
        
        <a href="/proyectos" class="cta-secondary-button animated-content-ratio" use:observeSections>
            Explorar todo nuestro portfolio &rarr;
        </a>
    </div>

    <div class="projects-scroll-container">
        <div class="projects-grid-scroll">
            {#each featuredProjects as project}
                <a href="/proyectos/{project.title.toLowerCase().replace(/\s/g, '-')}" class="project-card animated-content-ratio" use:observeSections>
                    <div class="project-image-wrapper">
                        <div class="project-image" style="background-image: url({project.image || '/default-project.jpg'});">
                            <div class="image-overlay"></div>
                        </div>
                    </div>
                    <div class="project-info">
                        <span class="project-tag">{project.category}</span>
                        <h3 class="project-title-animate">{project.title}</h3> 
                        <p>{project.description}</p>
                        <div class="tech-tag">{project.tag}</div>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<section class="section final-cta-premium" data-section-id="cta">
    <div class="cta-content-premium animated-content-ratio" use:observeSections>
        <p class="tagline-premium">El futuro comienza hoy</p>
        <h2 class="cta-title-premium-redesign">
            Construyamos algo que <strong class="gradient-title">Transforme el Mercado</strong>.
        </h2>
        <p class="description-premium">
            Nuestros desarrollos no solo cumplen expectativas, las superan. Consigue una plataforma diseñada para la conversión y la dominación del mercado.
        </p>
        <a href="/contacto" class="cta-final-button cta-neon-glow">
            Solicitar Auditoría Gratuita &rarr;
        </a>
    </div>
</section>

<footer class="footer-placeholder animated-content-ratio" use:observeSections>
    <div class="content-wrapper">
        <p>© 2025 <strong>ZenithStudio</strong>. Todos los derechos reservados. | Privacidad | Aviso Legal</p>
    </div>
</footer>


<style>
    /* ---------------------------------------------------- */
    /* ANIMACIÓN SCROLL-REVEAL - FUNDIDO PROPORCIONAL (RATIO) */
    /* ---------------------------------------------------- */
    
    .animated-content-ratio {
        /* Estado base: Transparente. El JS (tweened) controlará la opacidad. */
        opacity: 0; 
        /* CRÍTICO: Eliminamos cualquier transición CSS que pueda interferir 
           con el control preciso del tweened de Svelte. */
        transition: none !important; 
        will-change: opacity;
        transform: translateY(0);
    }
    
    /* ---------------------------------------------------- */
    /* CURSOR SEGUIDOR: NÚCLEO MÁS SUTIL Y TRASLÚCIDO */
    /* ---------------------------------------------------- */
    :global(.cursor-follower) {
        position: fixed !important; 
        width: 50px; 
        height: 50px; 
        border-radius: 50%;
        
        /* Fondo y Brillo más suave */
        background-color: rgba(73, 228, 176, 0.8); 
        box-shadow: 0 0 5px #49e4b0, 0 0 15px rgba(73, 228, 176, 0.5); 
        
        filter: blur(10px); 
        
        opacity: 0.5; 
        pointer-events: none; 
        z-index: 9999; 
        transition: none; 
        will-change: transform;
    }
    
    /* ---------------------------------------------------- */
    /* 0. PALETA DE COLORES Y FONDOS BASE */
    /* ---------------------------------------------------- */
    :global(body) {
        background-color: var(--color-surface); 
        color: white; 
        font-family: 'Inter', sans-serif;
    }

    :root {
        --color-primary: #49e4b0; 
        --color-surface: #0A1020; 
        --color-background: #050812; 
        --color-text-light: #ffffff; 
        --color-text-muted: #99A3BA; 
        --transition-duration: 0.3s;
        --content-padding: 3rem; 
        --step-anchor-x: 0; 
        --content-transform: translateX(0); 
        --content-align: left;
    }

    .gradient-text {
        background: linear-gradient(90deg, #fff 10%, var(--color-primary) 100%);
        -webkit-background-clip: text;
        background-clip: text; 
        -webkit-text-fill-color: transparent;
        font-weight: 800;
    }
    .gradient-title {
        background: linear-gradient(90deg, #fff 10%, var(--color-primary) 100%);
        -webkit-background-clip: text;
        background-clip: text; 
        -webkit-text-fill-color: transparent;
        font-weight: 800;
    }
    
    /* ---------------------------------------------------- */
    /* 1. HERO SECTION */
    /* ---------------------------------------------------- */
    .hero { 
        position: relative; 
        background-color: var(--color-background); 
        min-height: 70vh; 
        padding-top: 150px; 
        padding-bottom: 50px; 
        margin-top: -100px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        text-align: center; 
        overflow: hidden; 
        z-index: 100; 
    }
    
    .absolute-video-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 1; }
    .absolute-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.85); z-index: 2; }
    .hero-video { width: 100%; height: 100%; object-fit: cover; }
    .video-fade-to-section { position: absolute; bottom: 0; left: 0; width: 100%; height: 150px; z-index: 3; background: linear-gradient(to top, var(--color-background) 0%, rgba(0, 0, 0, 0) 100%); }
    .hero-content { max-width: 900px; z-index: 5; padding: 4rem 2rem; position: relative; margin: auto; }
    .hero-content h1 { font-size: 3.5rem; font-weight: 900; line-height: 1.2; }
    .hero-content .subtitle { font-size: 1.3rem; color: #b0b8c9; margin-bottom: 2rem; font-weight: 300; }
    .cta-primary { background-color: var(--color-primary); color: #000; padding: 1.2rem 2.8rem; border-radius: 8px; font-weight: 700; font-size: 1.15rem; transition: all 0.3s ease; text-decoration: none; display: inline-block; box-shadow: 0 5px 20px rgba(73, 228, 176, 0.4); }
    .cta-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 8px 25px rgba(73, 228, 176, 0.6); }

    /* ---------------------------------------------------- */
    /* 2. BASE DE SECCIONES GENERALES */
    /* ---------------------------------------------------- */
    .section { padding: 5rem 0; text-align: center; background-color: var(--color-surface); position: relative; z-index: 20; }
    
    .client-journey-section { 
        background-color: var(--color-background); 
        padding-top: 10rem; 
        padding-bottom: 15rem; 
        margin-top: 0; 
        z-index: 50; 
    } 
    .featured-projects-section { background-color: var(--color-background); position: relative; z-index: 25; padding: 5rem 0; }
    .content-wrapper { max-width: 1400px; margin: 0 auto; padding: 0 var(--content-padding); }
    .section-title { font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--color-text-light); }
    .section-subtitle { font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 3rem; }

    /* ---------------------------------------------------- */
    /* 3. PROCESO DEL CLIENTE (Línea de Tiempo) */
    /* ---------------------------------------------------- */
    
    .process-timeline-wrapper {
        padding: 20px 0; 
        display: flex;
        justify-content: center;
    }
    
    .process-steps-timeline {
        display: flex; 
        justify-content: space-between; 
        position: relative; 
        max-width: 1200px; 
        width: 100%; 
        height: 2px;
        background: rgba(73, 228, 176, 0.2); 
        align-items: center; 
        margin: 0 auto; 
    }
    
    .timeline-step {
        width: 0; 
        flex-shrink: 1; 
        text-align: left; 
        position: relative; 
        padding: 50px 0 0 0;
        z-index: 2; 
    }
    
    /* Icono: Anclaje de la línea */
    .timeline-step .step-icon { 
        position: absolute; 
        top: 50%; 
        /* Usamos la variable de CSS para el posicionamiento */
        left: var(--step-anchor-x); 
        transform: translate(-50%, -50%) scale(0.8); 
        
        background-color: var(--color-background); 
        border: 2px solid rgba(73, 228, 176, 0.4);
        border-radius: 50%; width: 50px; height: 50px; 
        display: flex; justify-content: center; align-items: center; 
        z-index: 3;
        transition: all 0.3s ease;
        opacity: 0; 
    }

    /* Contenido: Posición y Desplazamiento */
    .timeline-step .step-content {
        position: absolute;
        top: 60px; 
        /* Usamos la variable de CSS para el posicionamiento */
        left: var(--step-anchor-x);
        transform: var(--content-transform); 
        text-align: var(--content-align); 
        color: var(--color-text-muted); 
        width: 250px; 
        word-break: break-word; 
        transition: transform 0.3s ease;
        margin-top: 15px; 
    }
    /* Definición de las variables para el contenido de los pasos */
    .timeline-step:nth-child(1) .step-content { --step-anchor-x: 0%; --content-transform: translateX(0%); --content-align: left; }
    .timeline-step:nth-child(2) .step-content { --step-anchor-x: 25%; --content-transform: translateX(-50%); --content-align: center; } 
    .timeline-step:nth-child(3) .step-content { --step-anchor-x: 50%; --content-transform: translateX(-50%); --content-align: center; } 
    .timeline-step:nth-child(4) .step-content { --step-anchor-x: 75%; --content-transform: translateX(-50%); --content-align: center; } 
    .timeline-step:nth-child(5) .step-content { --step-anchor-x: 100%; --content-transform: translateX(-100%); --content-align: right; }

    /* Animación */
    .timeline-line-fill {
        position: absolute; top: 0; left: 0; height: 100%;
        background: linear-gradient(90deg, rgba(73, 228, 176, 0.5) 0%, var(--color-primary) 100%); 
        transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        width: 0%; 
    }
    
    .step-icon.is-active {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
        border-color: var(--color-primary);
        background-color: var(--color-primary);
        box-shadow: 0 0 15px rgba(73, 228, 176, 0.8);
    }
    .step-icon.is-active .step-number { color: var(--color-background); }
    
    .timeline-step:hover .step-icon { 
        transform: translate(-50%, -50%) scale(1.1); 
    }
    
    .step-title-animate { 
        font-size: 1.2rem; 
        font-weight: 700; 
        color: var(--color-text-light); 
        transition: transform 0.3s ease, color 0.3s ease; 
        display: inline-block; 
        margin-bottom: 0.5rem; 
    }
    .timeline-step:hover .step-title-animate { transform: scale(1.03); color: var(--color-text-light); }
    .step-number { font-weight: 700; font-size: 1.1rem; color: var(--color-primary); transition: color 0.3s ease; }

    /* ---------------------------------------------------- */
    /* 4. PROPUESTA DE VALOR (USP) */
    /* ---------------------------------------------------- */
    .value-prop-grid { 
        background-color: var(--color-surface); 
        padding-top: 10rem; 
        padding-bottom: 8rem;
    }
    .usp-cards-wrapper { display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; }
    .usp-card {
        background-color: var(--color-background); border: 1px solid rgba(255, 255, 255, 0.05);
        padding: 2.5rem; border-radius: 12px; max-width: 350px; text-align: left;
        position: relative; overflow: hidden;
        transition: transform var(--transition-duration) ease, border-color var(--transition-duration) ease, box-shadow var(--transition-duration) ease;
        z-index: 1; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .card-border-glow {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 12px;
        background: radial-gradient(circle at center, rgba(73, 228, 176, 0.6) 0%, rgba(73, 228, 176, 0) 60%);
        opacity: 0; transition: opacity 0.5s ease; z-index: -1; 
    }

    .usp-card:hover { 
        transform: translateY(-8px); 
        border-color: rgba(73, 228, 176, 0.4);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(73, 228, 176, 0.1), 0 0 30px rgba(73, 228, 176, 0.2); 
    }
    
    .usp-card:hover .card-border-glow { opacity: 0.3; }
    
    .icon-circle {
        background-color: rgba(73, 228, 176, 0.1); border: 1px solid var(--color-primary);
        border-radius: 50%; width: 50px; height: 50px; display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem;
        transition: all var(--transition-duration) ease;
    }
    .usp-card:hover .icon-circle { background-color: var(--color-primary); box-shadow: 0 0 15px var(--color-primary); }
    .usp-card:hover .icon-circle svg { color: var(--color-background); }


    /* ---------------------------------------------------- */
    /* 5. PROYECTOS DESTACADOS */
    /* ---------------------------------------------------- */
    
    .projects-header-wrapper { max-width: 1400px; margin: 0 auto; padding: 0 var(--content-padding); margin-bottom: 2rem; text-align: center; }
    
    .cta-secondary-button { display: inline-block; margin-top: 2rem; padding: 10px 20px; color: var(--color-primary); border: 1px solid var(--color-primary); border-radius: 6px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; background-color: transparent; }
    .cta-secondary-button:hover { background-color: rgba(73, 228, 176, 0.1); transform: translateY(-2px); }
    
    .projects-scroll-container { width: 100%; overflow-x: auto; padding: 2rem 0; -ms-overflow-style: none; scrollbar-width: none; }
    .projects-scroll-container::-webkit-scrollbar { display: none; }

    .projects-grid-scroll { display: flex; gap: 3rem; padding: 0 var(--content-padding); min-width: fit-content; justify-content: center; margin-left: auto; margin-right: auto; }
    
    @media (min-width: 1200px) {
        .projects-grid-scroll { justify-content: center; padding: 0; max-width: fit-content; margin: 0 auto; }
    }
    
    .project-card {
        background-color: var(--color-surface); width: 350px; flex-shrink: 0; 
        border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; overflow: hidden; text-align: left; 
        transition: transform var(--transition-duration) ease, box-shadow var(--transition-duration) ease, border-color var(--transition-duration) ease;
        text-decoration: none; color: inherit;
    }
    
    .project-card:hover { transform: translateY(-5px); border-color: var(--color-primary); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(73, 228, 176, 0.1); }

    .project-info { padding: 1.5rem; }
    .project-tag { color: var(--color-primary); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
    .project-info p { color: var(--color-text-muted); }
    
    .project-title-animate { font-size: 1.4rem; color: var(--color-text-light); margin-bottom: 0.5rem; transition: color 0.3s ease, transform 0.3s ease; display: inline-block; }
    .project-card:hover .project-title-animate { color: var(--color-text-light); transform: translateX(5px); }
    
    .tech-tag { display: inline-block; background-color: rgba(73, 228, 176, 0.1); color: var(--color-primary); padding: 0.3rem 0.8rem; border-radius: 5px; font-size: 0.8rem; margin-top: 1rem; }
    
    /* ---------------------------------------------------- */
    /* 6. CTA FINAL PREMIUM (PULSO ANIMADO) */
    /* ---------------------------------------------------- */
    
    .final-cta-premium { padding: 8rem var(--content-padding); position: relative; overflow: hidden; }
    
    .cta-content-premium {
        max-width: 1000px; margin: 0 auto; padding: 4rem 3rem; border-radius: 16px;
        background-color: var(--color-background); 
        border: 2px solid rgba(73, 228, 176, 0.4);
        box-shadow: 0 0 80px rgba(73, 228, 176, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2; 
        animation: pulse-glow 3s infinite ease-in-out;
    }

    @keyframes pulse-glow {
        0% { box-shadow: 0 0 60px rgba(73, 228, 176, 0.05), 0 15px 50px rgba(0, 0, 0, 0.4); }
        50% { box-shadow: 0 0 100px rgba(73, 228, 176, 0.25), 0 25px 70px rgba(0, 0, 0, 0.6); }
        100% { box-shadow: 0 0 60px rgba(73, 228, 176, 0.05), 0 15px 50px rgba(0, 0, 0, 0.4); }
    }
    
    .tagline-premium { color: var(--color-primary); font-weight: 600; text-transform: uppercase; margin-bottom: 1rem; }
    .cta-title-premium-redesign { font-size: 3rem; margin-bottom: 1.5rem; }
    .description-premium { font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 2.5rem; }

    .cta-neon-glow {
        background-color: var(--color-primary); color: #000;
        padding: 1.2rem 3rem; border-radius: 8px; font-weight: 700; font-size: 1.15rem; 
        text-decoration: none; display: inline-block;
        box-shadow: 0 0 10px var(--color-primary), 0 0 20px rgba(73, 228, 176, 0.5);
        transition: all 0.3s ease;
    }

    .cta-neon-glow:hover {
        background-color: #38c89c; 
        box-shadow: 0 0 15px var(--color-primary), 0 0 30px rgba(73, 228, 176, 0.8);
        transform: scale(1.02);
    }

    /* ---------------------------------------------------- */
    /* 7. FOOTER */
    /* ---------------------------------------------------- */
    
    .footer-placeholder {
        padding: 2rem 0; text-align: center; background-color: var(--color-surface); 
        position: relative; z-index: 30; font-size: 0.9rem; color: var(--color-text-muted);
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }


    /* ---------------------------------------------------- */
    /* Responsive (Móvil/Tablet) - Mantenemos corrección vertical */
    /* ---------------------------------------------------- */
    @media (max-width: 900px) {
        :root { --content-padding: 1.5rem; }
        .client-journey-section { 
            padding-top: 5rem; 
            padding-bottom: 5rem;
        } 
        
        /* En móvil, la línea es vertical. */
        .process-steps-timeline { flex-direction: column; margin: 0; height: auto; width: 2px; left: 20px; transform: none; align-items: flex-start; }
        .timeline-step { width: 100%; max-width: 100%; flex: 1 0 100%; margin-bottom: 3rem; min-width: unset; text-align: left; padding-top: 0; }
        
        /* Ajuste de posición de iconos para móvil (vertical) */
        .timeline-step .step-icon { 
            left: -24px !important; right: auto !important; top: -10px !important;
            transform: translate(0, 0) scale(0.8) !important; 
        }
        
        /* Forzamos que el contenido vaya a la izquierda para el diseño vertical de móvil */
        .step-content { 
            margin-left: 30px; margin-right: 0; 
            text-align: left !important; 
            transform: none !important; 
            position: static; width: auto; 
            top: auto; right: auto; left: auto;
        }

        .usp-cards-wrapper { flex-direction: column; }
        .hero-content h1 { font-size: 2.5rem; }
        .projects-grid-scroll { padding: 0 var(--content-padding); }
        .projects-header-wrapper { padding: 0 var(--content-padding); }
        .value-prop-grid { padding-top: 5rem; padding-bottom: 5rem; }
    }
</style>