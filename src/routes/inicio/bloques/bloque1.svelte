<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    
    // Variables para la animación de loop
    let lineWidthPercentage = 0; 
    const totalSteps = 5; 
    
    let animationFrameId: number;
    let startTime: number;
    const duration = 8000; // 8 segundos para un ciclo completo

    const processSteps = [
        {
            number: 1,
            title: 'Descubrimiento y Estrategia',
            description: 'Análisis profundo de objetivos, audiencia y competencia. Definimos la arquitectura técnica y la hoja de ruta clara para el éxito.'
        },
        {
            number: 2,
            title: 'Diseño UX/UI Centrado en la Conversión',
            description: 'Creación de wireframes y prototipos de alta fidelidad (Maquetas). Nos enfocamos en la experiencia de usuario (UX) para garantizar la máxima retención.'
        },
        {
            number: 3,
            title: 'Desarrollo de Alto Rendimiento',
            description: 'Codificación con maestría utilizando SvelteKit, React o Angular. Priorizamos el código limpio, la eficiencia y el cumplimiento estricto de los Core Web Vitals.'
        },
        {
            number: 4,
            title: 'Pruebas y Aseguramiento de Calidad (QA)',
            description: 'Implementación de pruebas unitarias, de integración y de rendimiento. Aseguramos que la plataforma sea segura, escalable y sin errores en cualquier dispositivo.'
        },
        {
            number: 5,
            title: 'Lanzamiento, Monitoreo y Escalabilidad',
            description: 'Despliegue automatizado y monitoreo continuo. Ofrecemos soporte y optimización post-lanzamiento para asegurar un crecimiento sostenible.'
        }
    ];

    function animateProgress(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        const progress = (elapsed % duration) / duration;
        lineWidthPercentage = progress * 100; 

        animationFrameId = requestAnimationFrame(animateProgress);
    }

    onMount(() => {
        if (browser) {
            animationFrameId = requestAnimationFrame(animateProgress);
        }
    });

    onDestroy(() => {
        if (browser && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    function isStepActive(index: number, percentage: number): boolean {
        const totalSegments = totalSteps - 1; 
        
        if (index === 0) return true; 

        if (index === totalSteps - 1) {
            return percentage >= 88; 
        }

        let activationThreshold = (index / totalSegments) * 100;
        
        const visualOffset = 7.5; 
        activationThreshold = Math.max(0, activationThreshold - visualOffset);

        return percentage >= activationThreshold;
    }
</script>

<section class="section process-section" id="proceso">
    <div class="content-wrapper">
        
        <h2>
            Nuestro <span class="gradient-title">Proceso de Maestría Digital</span>
        </h2>
        
        <p class="section-subtitle">
            Un camino de 5 fases diseñado para transformar tu visión en una plataforma de alto rendimiento.
        </p>

        <div class="timeline-container" 
             style={`--line-width: ${lineWidthPercentage}%;`}
        >
            <div class="timeline-track"></div>
            <div class="timeline-progress"></div>

            <div class="timeline-items-wrapper">
                {#each processSteps as step, i}
                    <div class="timeline-item">
                        
                        <div class="timeline-dot" class:active={isStepActive(i, lineWidthPercentage)}>
                            <span class="dot-number">{step.number}</span>
                        </div>
                        
                        <div class="timeline-content" class:active={isStepActive(i, lineWidthPercentage)}>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
    /* Variables de estilo para asegurar consistencia */
    :global(.process-section) {
        --line-height: 3px;
        --dot-size: 40px;
        --track-color: rgba(73, 228, 176, 0.1);
        --active-color: #39FFCA; /* AGUAMARINA */
        --fill-color: linear-gradient(90deg, var(--color-primary) 0%, var(--active-color) 100%); 
        --shadow-color: rgba(57, 255, 202, 0.5); 
        --color-background: #0D1117;
        --color-surface: #161B22;
        --color-primary: #49E4B0; 
        --color-text-light: #F0F6F0;
        --color-text-muted: #A3A3A3;
    }

    /* -------------------------------------- */
    /* --- Estilos de la Sección y Layout --- */
    /* -------------------------------------- */

    .section {
        background-color: var(--color-surface); 
        color: var(--color-text-light);
        padding: 0 1rem;
    }
    .content-wrapper {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    
    h2 {
        font-size: 2.5rem;
        text-align: center;
        margin-bottom: 0.5rem;
    }
    
    .section-subtitle {
        text-align: center;
        color: var(--color-text-muted);
        font-size: 1.1rem;
        margin-bottom: 3rem;
    }

    .process-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        min-height: auto; 
    }

    .timeline-container {
        position: relative;
        max-width: 1200px;
        margin: 4rem auto 0;
        padding-left: 0; 
        margin-bottom: 5rem; 
    }

    .timeline-items-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        z-index: 10; 
    }
    
    /* ---------------------------------- */
    /* --- Línea Horizontal y Progreso --- */
    /* ---------------------------------- */
    
    .timeline-track, .timeline-progress {
        position: absolute;
        top: calc(var(--dot-size) / 2); 
        left: 0;
        height: var(--line-height);
        width: 100%;
        transform: translateY(-50%);
    }

    .timeline-track {
        background-color: var(--track-color); 
        z-index: 1;
    }
    
    .timeline-progress {
        width: var(--line-width, 0%); 
        background: var(--fill-color); 
        box-shadow: 0 0 10px var(--shadow-color);
        z-index: 2; 
        transition: width 20ms linear; /* Animación de bucle */
        right: auto;
    }

    /* -------------------------------- */
    /* --- Ítems de la Línea de Tiempo --- */
    /* -------------------------------- */

    .timeline-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        width: calc(100% / 5); 
        padding: 0 10px;
    }
    
    .timeline-dot {
        width: var(--dot-size);
        height: var(--dot-size);
        background-color: var(--color-background); 
        border: 3px solid rgba(255, 255, 255, 0.2); 
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 15; 
        margin-bottom: 1.5rem;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .timeline-dot.active {
        border-color: var(--active-color); 
        box-shadow: 0 0 10px var(--active-color), 0 0 20px var(--shadow-color);
    }
    
    .dot-number {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--color-text-muted); 
        transition: color 0.3s ease;
    }

    .timeline-dot.active .dot-number {
        color: var(--active-color); 
    }

    .timeline-content {
        background-color: var(--color-surface);
        padding: 1rem;
        border-radius: 10px;
        width: 100%;
        border: 1px solid rgba(73, 228, 176, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    
    .timeline-content.active {
        box-shadow: 0 5px 25px rgba(57, 255, 202, 0.2); 
    }

    .timeline-content h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-text-light);
        margin-bottom: 0.5rem;
    }
    
    .timeline-content p {
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }
    
    /* ------------------------------------ */
    /* --- Responsive (Mobile: Vertical) --- */
    /* ------------------------------------ */
    @media (max-width: 900px) {
        
        .timeline-track, .timeline-progress {
            display: none;
        }

        .timeline-items-wrapper {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 20px; 
            height: auto;
            min-height: 850px;
        }
        
        /* Líneas verticales */
        .timeline-items-wrapper::before, .timeline-items-wrapper::after {
            content: '';
            position: absolute;
            top: calc(var(--dot-size) / 2); 
            left: 20px; 
            width: 3px;
            z-index: 1;
        }
        
        .timeline-items-wrapper::before {
            height: 100%; 
            background-color: var(--track-color);
        }
        
        .timeline-items-wrapper::after {
            height: calc((100% - var(--dot-size)) * (var(--line-width, 0%) / 100)); 
            background: linear-gradient(to bottom, var(--color-primary), var(--active-color)); 
            box-shadow: 0 0 10px var(--shadow-color);
            z-index: 2; 
            transition: height 20ms linear;
        }

        .timeline-item {
            flex-direction: row; 
            text-align: left;
            width: 100%;
            padding: 2rem 0; 
            align-items: flex-start;
        }
        
        .timeline-dot {
            position: absolute;
            top: 2rem;
            left: 0;
            margin-bottom: 0;
            transform: translateX(-50%);
        }

        .timeline-content {
            margin-left: 40px; 
            width: auto;
            flex-grow: 1;
        }
    }
</style>