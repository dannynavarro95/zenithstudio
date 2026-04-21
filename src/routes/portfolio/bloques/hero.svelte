<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';
    import TypewriterText from '$lib/TypewriterText.svelte';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    let isFinished = false;

    onMount(() => {
        const timeout = setTimeout(() => {
            isFinished = true;
        }, 4500);

        return () => clearTimeout(timeout);
    });

    function handleTypewriterDone() {
        isFinished = true;
    }
</script>

<section class="hero-section portfolio-hero">
    <div class="hero-content content-wrapper" use:scrollObserverAction>
        <div class="hero-badge">
            <span class="badge-text">✨ Portfolio Profesional</span>
        </div>

        <h1 class="main-title">
            <span class="title-line">Creamos</span>
            <span class="title-line highlight-line">
                <TypewriterText
                    words={['Experiencias', 'Resultados', 'Éxitos']}
                    delay={120}
                    pause={2500}
                    on:done={handleTypewriterDone}
                />
            </span>
            <span class="title-line">Digitales</span>
        </h1>

        <p class="hero-description">
            Descubre nuestro portfolio de proyectos exitosos. Desde webs corporativas que generan confianza
            hasta ecommerce que multiplican ventas. Cada proyecto cuenta una historia de transformación digital.
        </p>

        <div class="hero-metrics">
            <div class="metric-item">
                <div class="metric-number">50+</div>
                <div class="metric-label">Proyectos Completados</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
                <div class="metric-number">98%</div>
                <div class="metric-label">Clientes Satisfechos</div>
            </div>
            <div class="metric-divider"></div>
            <div class="metric-item">
                <div class="metric-number">24h</div>
                <div class="metric-label">Entrega Promedio</div>
            </div>
        </div>

        <div class="hero-actions">
            <a href="#casos" class="cta-button">
                <i class="fas fa-eye"></i>
                Explorar Casos
            </a>
            <a href="/contacto" class="secondary-button">
                <i class="fas fa-paper-plane"></i>
                Solicitar Propuesta
            </a>
        </div>

        <div class="hero-visual-elements">
            <div class="floating-element element-1">
                <i class="fas fa-code"></i>
            </div>
            <div class="floating-element element-2">
                <i class="fas fa-rocket"></i>
            </div>
            <div class="floating-element element-3">
                <i class="fas fa-palette"></i>
            </div>
            <div class="floating-element element-4">
                <i class="fas fa-chart-line"></i>
            </div>
        </div>
    </div>
</section>

<style>
    .portfolio-hero {
        min-height: 92vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 7rem;
        padding-bottom: 4rem;
        position: relative;
        background: radial-gradient(circle at top right, rgba(73, 228, 176, 0.14), transparent 25%),
                    radial-gradient(circle at 20% 20%, rgba(0, 191, 255, 0.1), transparent 18%),
                    linear-gradient(180deg, rgba(11, 14, 20, 0.98) 0%, #0B0E14 100%);
        overflow: hidden;
    }

    .portfolio-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 55%);
        opacity: 0.9;
        pointer-events: none;
    }

    .hero-content {
        position: relative;
        z-index: 2;
        max-width: 960px;
        text-align: center;
    }

    .eyebrow {
        display: inline-block;
        margin-bottom: 1rem;
        color: var(--color-primary);
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.85rem;
    }

    .main-title {
        font-size: clamp(2.8rem, 6vw, 4.6rem);
        font-weight: 900;
        line-height: 1.02;
        margin: 0;
    }

    .subtitle {
        margin: 1.8rem auto 2.8rem;
        max-width: 720px;
        color: var(--color-text-muted);
        font-size: 1.08rem;
        line-height: 1.9;
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .cta-button,
    .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.95rem 2rem;
        border-radius: 12px;
        font-weight: 700;
        min-width: 180px;
        transition: transform 0.28s ease, box-shadow 0.28s ease;
    }

    .cta-button {
        background: linear-gradient(90deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        box-shadow: 0 16px 40px rgba(73, 228, 176, 0.18);
    }

    .secondary-button {
        background: rgba(255, 255, 255, 0.08);
        color: var(--color-text-light);
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(12px);
    }

    .cta-button:hover,
    .secondary-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 22px 48px rgba(73, 228, 176, 0.18);
    }

    .typing-text {
        display: inline-block;
        min-height: 1.1em;
    }

    .typing-text.finished {
        color: var(--color-primary);
        text-shadow: 0 0 14px rgba(73, 228, 176, 0.55), 0 0 28px rgba(73, 228, 176, 0.25);
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        background: rgba(73, 228, 176, 0.1);
        border: 1px solid rgba(73, 228, 176, 0.3);
        border-radius: 50px;
        padding: 8px 16px;
        margin-bottom: 2rem;
    }

    .badge-text {
        color: var(--color-primary);
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }

    .main-title {
        font-size: clamp(3rem, 8vw, 5rem);
        font-weight: 900;
        line-height: 1.1;
        margin: 0 0 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .title-line {
        display: block;
        color: var(--color-text-light);
    }

    .highlight-line {
        background: linear-gradient(135deg, var(--color-primary), #00BFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        min-height: 1.2em;
    }

    .hero-description {
        font-size: 1.25rem;
        color: var(--color-text-muted);
        line-height: 1.6;
        max-width: 700px;
        margin: 0 auto 3rem;
    }

    .hero-metrics {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        margin: 3rem 0;
        flex-wrap: wrap;
    }

    .metric-item {
        text-align: center;
        min-width: 120px;
    }

    .metric-number {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--color-primary);
        display: block;
        margin-bottom: 0.5rem;
    }

    .metric-label {
        font-size: 0.9rem;
        color: var(--color-text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .metric-divider {
        width: 1px;
        height: 60px;
        background: rgba(255,255,255,0.1);
    }

    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .cta-button, .secondary-button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1.25rem 2.5rem;
        border-radius: 50px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1.1rem;
        min-width: 220px;
        justify-content: center;
    }

    .cta-button {
        background: linear-gradient(135deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        box-shadow: 0 20px 40px rgba(73, 228, 176, 0.3);
    }

    .secondary-button {
        background: rgba(255, 255, 255, 0.08);
        color: var(--color-text-light);
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(12px);
    }

    .cta-button:hover, .secondary-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 25px 50px rgba(73, 228, 176, 0.3);
    }

    .hero-visual-elements {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .floating-element {
        position: absolute;
        width: 60px;
        height: 60px;
        background: rgba(73, 228, 176, 0.1);
        border: 1px solid rgba(73, 228, 176, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--color-primary);
        animation: float 6s ease-in-out infinite;
    }

    .element-1 {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }

    .element-2 {
        top: 60%;
        right: 15%;
        animation-delay: 2s;
    }

    .element-3 {
        bottom: 25%;
        left: 20%;
        animation-delay: 4s;
    }

    .element-4 {
        top: 30%;
        right: 10%;
        animation-delay: 1s;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-20px) rotate(120deg); }
        66% { transform: translateY(10px) rotate(240deg); }
    }

    .typing-text {
        display: inline-block;
        min-height: 1.1em;
    }

    .typing-text.finished {
        color: var(--color-primary);
        text-shadow: 0 0 14px rgba(73, 228, 176, 0.55), 0 0 28px rgba(73, 228, 176, 0.25);
    }

    @media (max-width: 768px) {
        .hero-metrics {
            gap: 1rem;
        }

        .metric-divider {
            display: none;
        }

        .hero-actions {
            flex-direction: column;
        }

        .cta-button, .secondary-button {
            width: 100%;
        }

        .main-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
        }

        .hero-description {
            font-size: 1.1rem;
        }
    }
</style>
