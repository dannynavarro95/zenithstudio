<script>
    import { onMount, getContext } from 'svelte';
    import TypewriterText from '$lib/TypewriterText.svelte'; 

    const scrollObserverAction = getContext('scrollObserverAction');
    
    let isFinished = false; 
    
    const words = ['Estrategia', 'Rendimiento'];

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
                Transformamos el presente<br>
                con 
                <span class="gradient-title typing-text" class:finished={isFinished}>
                    <TypewriterText 
                        words={['Innovación', 'Excelencia', 'Visión']} 
                        delay={120} 
                        pause={3500}
                        on:done={handleTypewriterDone}
                    />
                </span>
                .
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
        
        /* Aseguramos que el contenido esté centrado */
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center; /* Centrar texto */
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

    /* =========================
       Botón principal: "Empezar un proyecto"
       Efecto premium: halo + shine + elevación
       ========================= */
    .cta-button {
        background: linear-gradient(90deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        padding: 10px 24px;
        border-radius: 10px;
        font-weight: 800;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.06);
        transition: transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s ease, filter 0.28s ease;
        box-shadow: 0 8px 22px rgba(14,20,25,0.18);
        backdrop-filter: blur(4px);
        text-decoration: none;
        display: inline-block;
    }

    .cta-button > * { position: relative; z-index: 2; }

    /* Halo sutil */
    .cta-button::before {
        content: "";
        position: absolute;
        inset: -6px;
        background: radial-gradient(700px 90px at 10% 0%, rgba(73,228,176,0.18), transparent 36%);
        z-index: 0;
        filter: blur(12px);
        opacity: 0;
        transition: opacity 0.28s ease, transform 0.28s ease;
        transform: scale(0.98);
    }

    /* Brillo que atraviesa el botón */
    .cta-button::after {
        content: "";
        position: absolute;
        top: -80%;
        left: -50%;
        width: 38%;
        height: 260%;
        background: linear-gradient(120deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.18) 40%,
            rgba(255,255,255,0.02) 70%,
            transparent 100%);
        transform: rotate(25deg) translateX(0);
        opacity: 0;
        z-index: 3;
        will-change: transform, opacity;
    }

    .cta-button:hover,
    .cta-button:focus {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 46px rgba(73,228,176,0.18), 0 8px 28px rgba(0,0,0,0.32);
        filter: saturate(1.12) brightness(1.03);
    }

    .cta-button:hover::before,
    .cta-button:focus::before {
        opacity: 1;
        transform: scale(1);
    }

    .cta-button:hover::after {
        opacity: 1;
        animation: hero-cta-shine 0.9s cubic-bezier(.2,.9,.2,1);
    }

    @keyframes hero-cta-shine {
        0% {
            transform: translateX(-140%) rotate(25deg);
            opacity: 0;
        }
        30% { opacity: 0.95; }
        100% {
            transform: translateX(280%) rotate(25deg);
            opacity: 0;
        }
    }

    /* =========================
       Botón secundario: "Ver Proyectos"
       Estética premium: borde suave, fondo glass + micro-animación
       ========================= */
    .secondary-button {
        position: relative;
        overflow: hidden;
        display: inline-block;
        padding: 10px 24px;
        border-radius: 12px;
        font-weight: 700;
        color: var(--color-text-muted);
        background: rgba(255,255,255,0.02); /* glass base */
        border: 1px solid rgba(255,255,255,0.06);
        transition: color 0.28s ease, transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s ease, background 0.28s ease;
        backdrop-filter: blur(4px);
        z-index: 1;
        text-decoration: none;
    }

    /* contenido por encima de los efectos */
    .secondary-button > * { position: relative; z-index: 4; }

    /* borde degradado / halo animado (efecto premium) */
    .secondary-button::before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 14px;
        background: linear-gradient(90deg, rgba(73,228,176,0.95), rgba(20,184,166,0.95), rgba(73,228,176,0.95));
        filter: blur(14px);
        opacity: 0;
        transition: opacity 0.35s ease, transform 0.35s ease;
        will-change: opacity, transform;
        z-index: 0;
        /* permitir animación de desplazamiento de gradiente */
        background-size: 200% 100%;
    }

    /* brillo suave interior */
    .secondary-button::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0));
        opacity: 0;
        transition: opacity 0.35s ease, transform 0.35s ease;
        z-index: 2;
        border-radius: 12px;
    }

    /* Hover: invertir a degradado activo, elevar y mostrar halo */
    .secondary-button:hover,
    .secondary-button:focus {
        color: var(--color-background);
        background: linear-gradient(90deg, rgba(73,228,176,1), rgba(20,184,166,1));
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 18px 40px rgba(20,184,166,0.14);
    }

    .secondary-button:hover::before,
    .secondary-button:focus::before {
        opacity: 1;
        transform: scale(1);
        animation: secondary-border-shift 3s linear infinite;
    }

    .secondary-button:hover::after,
    .secondary-button:focus::after {
        opacity: 0.9;
        transform: translateY(0);
    }

    @keyframes secondary-border-shift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    /* Accesibilidad: foco visible */
    .secondary-button:focus-visible {
        outline: 2px solid rgba(73,228,176,0.26);
        outline-offset: 4px;
    }

    /* Móvil: suavizar efecto */
    @media (max-width: 600px) {
        .secondary-button {
            padding: 9px 16px;
            border-radius: 10px;
        }
        .secondary-button::before { filter: blur(10px); opacity: 0.9; }
        .secondary-button:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 10px 22px rgba(20,184,166,0.12); }
    }
</style>