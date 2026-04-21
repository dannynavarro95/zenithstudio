<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');
</script>

<section class="section cta-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="cta-content animate-on-scroll">
            <h2 class="cta-title">¿Listo para llevar tu negocio al siguiente nivel?</h2>
            <p class="cta-subtitle">
                Creamos webs profesionales que convierten visitantes en clientes.
                Desde landing pages hasta ecommerce completo, tenemos la solución perfecta para tu negocio.
            </p>
            <div class="cta-features">
                <div class="feature-item">
                    <i class="fas fa-rocket"></i>
                    <span>Lanzamiento rápido (24h)</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-mobile-alt"></i>
                    <span>100% responsive</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-search"></i>
                    <span>SEO optimizado</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-headset"></i>
                    <span>Soporte incluido</span>
                </div>
            </div>
            <div class="cta-buttons">
                <a href="/contacto" class="cta-primary">Empezar mi proyecto</a>
                <a href="tel:+34612345678" class="cta-secondary">
                    <i class="fas fa-phone"></i>
                    Llamar ahora
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    .cta-section {
        padding: 5rem 0;
        background: linear-gradient(135deg, rgba(73, 228, 176, 0.1), rgba(0, 191, 255, 0.1));
        position: relative;
        overflow: hidden;
    }

    .cta-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 30% 20%, rgba(73, 228, 176, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(0, 191, 255, 0.05) 0%, transparent 50%);
    }

    .cta-content {
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    .cta-title {
        font-size: clamp(2.5rem, 5vw, 3.5rem);
        font-weight: 900;
        color: var(--color-text-light);
        margin-bottom: 1.5rem;
        line-height: 1.1;
    }

    .cta-subtitle {
        font-size: 1.2rem;
        color: var(--color-text-muted);
        line-height: 1.6;
        margin-bottom: 3rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .cta-features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-bottom: 3rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    .feature-item {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem;
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.08);
        font-weight: 600;
        color: var(--color-text-light);
        transition: transform 0.3s ease;
    }

    .feature-item:hover {
        transform: translateY(-2px);
    }

    .feature-item i {
        color: var(--color-primary);
        font-size: 1.2rem;
    }

    .cta-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
    }

    .cta-primary,
    .cta-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border-radius: 12px;
        font-weight: 700;
        text-decoration: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        min-width: 200px;
    }

    .cta-primary {
        background: linear-gradient(90deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        box-shadow: 0 16px 40px rgba(73, 228, 176, 0.3);
    }

    .cta-secondary {
        background: rgba(255, 255, 255, 0.08);
        color: var(--color-text-light);
        border: 1px solid rgba(255,255,255,0.08);
        backdrop-filter: blur(12px);
    }

    .cta-primary:hover,
    .cta-secondary:hover {
        transform: translateY(-3px);
        box-shadow: 0 22px 48px rgba(73, 228, 176, 0.3);
    }

    @media (max-width: 768px) {
        .cta-features {
            grid-template-columns: 1fr;
        }

        .cta-buttons {
            flex-direction: column;
        }

        .cta-primary,
        .cta-secondary {
            width: 100%;
        }

        .cta-title {
            font-size: 2.2rem;
        }
    }
</style>