<script>
    import { onMount, getContext } from 'svelte';
    import TypewriterText from '$lib/TypewriterText.svelte'; 

    const scrollObserverAction = getContext('scrollObserverAction');
    
    let isFinished = false; 
    
    const words = ['Digital', 'Estrategia', 'Rendimiento'];

    onMount(() => {
        const typingDuration = 5000; 
        
        setTimeout(() => {
            isFinished = true;
        }, typingDuration);
    });
    
    function handleTypewriterDone() {
        isFinished = true;
    }
</script>

<section id="hero" class="hero-section">
    <div class="video-background-container">
        <video autoplay muted loop playsinline class="hero-video">
            <source src="/fondo-abstracto-tech-video.mp4" type="video/mp4">
        </video>
    </div>

    <div class="content-wrapper hero-content">
        <div class="content-text" use:scrollObserverAction>
            <h1 class="main-title">
                Construimos el futuro 
                <span class="gradient-title typing-text" class:finished={isFinished}>
                    <TypewriterText 
                        words={words} 
                        delay={120} 
                        pause={3500}
                        on:done={handleTypewriterDone}
                    />
                </span>
                con maestría y precisión.
            </h1>
            <p class="subtitle">
                Diseño web de alto impacto y desarrollo escalable para tu marca.
            </p>
            <div class="hero-actions">
                <a href="#contact" class="cta-button">
                    Empezar un proyecto
                </a>
                <a href="#projects" class="secondary-button">
                    Ver Proyectos
                </a>
            </div>
        </div>
    </div>
    
    <div class="fade-divider"></div>
</section>

<style>
    /* ----------------------------------------------------
       ESTILOS BASE DEL HERO
    ---------------------------------------------------- */
    .hero-section {
        position: relative;
        min-height: 100vh;
        padding-top: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden; 
        padding-bottom: 0;
    }
    
    /* Aseguramos que el contenido esté por encima del video */
    .hero-content {
        position: relative;
        z-index: 10; 
    }

    /* ----------------------------------------------------
       ESTILOS DEL VIDEO DE FONDO (Opacidad Ajustada)
    ---------------------------------------------------- */
    .video-background-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1; 
        
        background-color: var(--color-background); 
        /* 🔥 Reducimos la opacidad para que el texto resalte más */
        opacity: 0.2; 
    }

    .hero-video {
        position: absolute;
        top: 50%;
        left: 50%;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        transform: translate(-50%, -50%);
        mix-blend-mode: soft-light; 
    }
    
    /* ----------------------------------------------------
       DIVISOR DESAPARICIÓN PREMIUM (FADE-TO-BLOCK-1)
    ---------------------------------------------------- */
    .fade-divider {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px; /* Más alto para una transición suave */
        z-index: 2; /* Sobre el video, pero bajo el contenido */
        
        /* 🔥 Degradado que va de Transparente al color del Bloque 1 */
        background: linear-gradient(
            to bottom, 
            rgba(11, 14, 20, 0) 0%, /* Transparente al inicio */
            var(--color-surface) 100% /* El color del Bloque 1 */
        );
    }
    
    /* ------------------- (El resto de estilos del Hero se mantienen igual) ------------------- */
    
    .main-title {
        font-size: clamp(2.5rem, 8vw, 5rem);
        font-weight: 900;
        line-height: 1.1;
        margin-bottom: 1.5rem;
    }
    
    .typing-text {
        display: inline-block;
        min-height: 1.1em; 
    }

    /* EFECTO NEÓN/GLOW PREMIUM MEJORADO */
    .typing-text.finished {
        color: var(--color-primary); 
        text-shadow: 
            0 0 10px var(--color-primary), 
            0 0 30px rgba(73, 228, 176, 0.9), 
            0 0 50px rgba(73, 228, 176, 0.5); 
        
        animation: neon-pulse 4s infinite alternate; 
    }

    @keyframes neon-pulse {
        from {
            text-shadow: 0 0 8px var(--color-primary), 0 0 20px rgba(73, 228, 176, 0.8);
        }
        to {
            text-shadow: 0 0 12px var(--color-primary), 0 0 35px rgba(73, 228, 176, 0.9);
        }
    }
    
    .hero-actions {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
    }

    .cta-button {
        background-color: var(--color-primary);
        color: var(--color-background);
        padding: 12px 30px;
        border-radius: 6px;
        font-weight: 700;
        transition: background-color 0.3s ease;
    }
    
    .cta-button:hover {
        background-color: #38c89b;
    }
    
    .secondary-button {
        background: none;
        border: 2px solid var(--color-text-muted);
        color: var(--color-text-light);
        padding: 12px 30px;
        border-radius: 6px;
        font-weight: 700;
        transition: border-color 0.3s ease, color 0.3s ease;
    }
    
    .secondary-button:hover {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
</style>