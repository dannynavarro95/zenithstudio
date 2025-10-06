<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';
    
    const observeSections = getContext<Action<HTMLElement>>('scrollObserverAction');
    
    const features = [
        {
            icon: 'fas fa-rocket',
            title: 'Rendimiento Inigualable',
            description: 'Sitios que cargan en milisegundos. Optimizamos cada línea de código para un Core Web Vitals perfecto.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Seguridad y Escalabilidad',
            description: 'Arquitecturas robustas diseñadas para manejar millones de usuarios sin fallos ni cuellos de botella.'
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Mobile-First by Design',
            description: 'Tu plataforma se verá y funcionará impecablemente en cualquier dispositivo, garantizando la mejor UX.'
        },
        {
            icon: 'fas fa-lightbulb',
            title: 'Innovación Tecnológica',
            description: 'Uso de las últimas tecnologías (SvelteKit, React, Gemini API) para soluciones a prueba de futuro.'
        }
    ];
</script>

<section class="section usp-section" id="usp">
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>¿Por Qué Elegir <span class="gradient-title">Zenith Studio</span>?</h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>Nuestra diferencia radica en la obsesión por la calidad, la velocidad y la construcción de activos digitales duraderos.</p>

        <div class="features-grid">
            {#each features as feature, i}
                <div class="feature-card animated-content-ratio" 
                     use:observeSections
                     style={`transition-delay: ${i * 0.15}s;`}>
                    
                    <div class="feature-icon">
                        <i class={feature.icon}></i>
                    </div>
                    
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .usp-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 4rem;
    }

    .feature-card {
        background-color: var(--color-surface);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(73, 228, 176, 0.1);
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 30px rgba(73, 228, 176, 0.2);
    }

    .feature-icon {
        width: 60px;
        height: 60px;
        background: var(--color-primary);
        color: var(--color-background);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        margin: 0 auto 1.5rem;
        box-shadow: 0 0 15px rgba(73, 228, 176, 0.5);
    }

    .feature-card h3 {
        font-size: 1.35rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
        color: var(--color-text-light);
    }

    .feature-card p {
        color: var(--color-text-muted);
        font-size: 1rem;
    }
</style>