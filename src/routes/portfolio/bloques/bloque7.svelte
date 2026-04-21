<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    let currentState = 0;
    let interval: ReturnType<typeof setInterval>;

    const states = [
        { title: 'Home', content: 'hero' },
        { title: 'Servicios', content: 'services' },
        { title: 'Portfolio', content: 'portfolio' },
        { title: 'Contacto', content: 'contact' }
    ];

    onMount(() => {
        interval = setInterval(() => {
            currentState = (currentState + 1) % states.length;
        }, 3000);

        return () => clearInterval(interval);
    });
</script>

<section class="section interactive-demo">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="demo-header">
            <h2 class="section-title">Experiencia Interactiva</h2>
            <p class="section-subtitle">Navega por una web profesional en tiempo real</p>
        </div>

        <div class="demo-container animate-on-scroll">
            <!-- Browser Frame -->
            <div class="browser-frame">
                <div class="browser-header">
                    <div class="browser-buttons">
                        <span class="browser-button red"></span>
                        <span class="browser-button yellow"></span>
                        <span class="browser-button green"></span>
                    </div>
                    <div class="browser-address">
                        <span class="url-text">https://ejemplo-profesional.com/{states[currentState].content}</span>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="browser-content">
                    {#if states[currentState].content === 'hero'}
                        <div class="page-hero">
                            <h1 class="hero-title">Bienvenido a tu Web Profesional</h1>
                            <p class="hero-subtitle">Creamos experiencias digitales excepcionales</p>
                            <div class="hero-cta">
                                <button class="cta-button">Empezar Ahora</button>
                                <button class="secondary-button">Ver Demo</button>
                            </div>
                        </div>
                    {:else if states[currentState].content === 'services'}
                        <div class="page-services">
                            <h2>Nuestros Servicios</h2>
                            <div class="services-grid">
                                <div class="service-card">
                                    <div class="service-icon">🎨</div>
                                    <h3>Diseño Web</h3>
                                    <p>Diseños modernos y atractivos</p>
                                </div>
                                <div class="service-card">
                                    <div class="service-icon">💻</div>
                                    <h3>Desarrollo</h3>
                                    <p>Código limpio y optimizado</p>
                                </div>
                                <div class="service-card">
                                    <div class="service-icon">🚀</div>
                                    <h3>SEO</h3>
                                    <p>Posicionamiento en buscadores</p>
                                </div>
                            </div>
                        </div>
                    {:else if states[currentState].content === 'portfolio'}
                        <div class="page-portfolio">
                            <h2>Portfolio Destacado</h2>
                            <div class="portfolio-grid">
                                <div class="portfolio-item">
                                    <div class="project-image"></div>
                                    <h4>Proyecto E-commerce</h4>
                                    <p>Tienda online con +300% conversiones</p>
                                </div>
                                <div class="portfolio-item">
                                    <div class="project-image"></div>
                                    <h4>Landing Corporativa</h4>
                                    <p>Web institucional premium</p>
                                </div>
                            </div>
                        </div>
                    {:else if states[currentState].content === 'contact'}
                        <div class="page-contact">
                            <h2>Contacto</h2>
                            <form class="contact-form">
                                <input type="text" placeholder="Nombre" class="form-input">
                                <input type="email" placeholder="Email" class="form-input">
                                <textarea placeholder="Mensaje" class="form-textarea"></textarea>
                                <button type="submit" class="submit-button">Enviar Mensaje</button>
                            </form>
                        </div>
                    {/if}
                </div>
            </div>

            <!-- Navigation Indicator -->
            <div class="navigation-indicator">
                <div class="nav-steps">
                    {#each states as state, i}
                        <div class="nav-step {i === currentState ? 'active' : ''}">
                            <span class="step-dot"></span>
                            <span class="step-label">{state.title}</span>
                        </div>
                    {/each}
                </div>
                <p class="nav-description">
                    Navegación automática • Cambia cada 3 segundos
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    .interactive-demo {
        padding: 5rem 0;
        background: linear-gradient(135deg, rgba(73, 228, 176, 0.05), rgba(0, 191, 255, 0.05));
    }

    .demo-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .section-title {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--color-text-light);
        margin-bottom: 1rem;
    }

    .section-subtitle {
        font-size: 1.1rem;
        color: var(--color-text-muted);
        max-width: 600px;
        margin: 0 auto;
    }

    .demo-container {
        max-width: 1000px;
        margin: 0 auto;
    }

    .browser-frame {
        background: #2d3748;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        margin-bottom: 2rem;
    }

    .browser-header {
        background: #1a202c;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .browser-buttons {
        display: flex;
        gap: 8px;
    }

    .browser-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .browser-button.red { background: #e53e3e; }
    .browser-button.yellow { background: #d69e2e; }
    .browser-button.green { background: #38a169; }

    .browser-address {
        flex: 1;
        background: #4a5568;
        border-radius: 20px;
        padding: 6px 16px;
    }

    .url-text {
        color: #a0aec0;
        font-size: 12px;
        font-family: 'Courier New', monospace;
    }

    .browser-content {
        height: 500px;
        background: #ffffff;
        position: relative;
        overflow: hidden;
    }

    /* Page States */
    .page-hero, .page-services, .page-portfolio, .page-contact {
        padding: 3rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .hero-title {
        font-size: 2.5rem;
        font-weight: 900;
        color: #2d3748;
        margin-bottom: 1rem;
        line-height: 1.1;
    }

    .hero-subtitle {
        font-size: 1.2rem;
        color: #718096;
        margin-bottom: 2rem;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .cta-button, .secondary-button {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .cta-button {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
    }

    .cta-button:hover {
        transform: translateY(-2px);
    }

    .secondary-button {
        background: #f7fafc;
        color: #4a5568;
        border: 1px solid #e2e8f0;
    }

    .page-services h2, .page-portfolio h2, .page-contact h2 {
        font-size: 2rem;
        font-weight: 800;
        color: #2d3748;
        margin-bottom: 2rem;
        text-align: center;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
    }

    .service-card {
        background: #f8f9fa;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        border: 1px solid #e2e8f0;
        transition: transform 0.3s ease;
    }

    .service-card:hover {
        transform: translateY(-5px);
    }

    .service-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .service-card h3 {
        font-size: 1.2rem;
        font-weight: 700;
        color: #2d3748;
        margin-bottom: 0.5rem;
    }

    .service-card p {
        color: #718096;
        font-size: 0.9rem;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
    }

    .portfolio-item {
        background: #f8f9fa;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e2e8f0;
    }

    .project-image {
        height: 150px;
        background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .portfolio-item h4 {
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 700;
        color: #2d3748;
        margin: 0;
    }

    .portfolio-item p {
        padding: 0 1rem 1rem;
        color: #718096;
        font-size: 0.9rem;
        margin: 0;
    }

    .contact-form {
        max-width: 400px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-input, .form-textarea {
        padding: 12px 16px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 1rem;
    }

    .form-textarea {
        min-height: 120px;
        resize: vertical;
    }

    .submit-button {
        padding: 12px 24px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .submit-button:hover {
        transform: translateY(-2px);
    }

    .navigation-indicator {
        text-align: center;
    }

    .nav-steps {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-bottom: 1rem;
    }

    .nav-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }

    .nav-step.active {
        opacity: 1;
    }

    .step-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--color-primary);
        transition: transform 0.3s ease;
    }

    .nav-step.active .step-dot {
        transform: scale(1.5);
    }

    .step-label {
        font-size: 0.9rem;
        color: var(--color-text-light);
        font-weight: 600;
    }

    .nav-description {
        font-size: 0.9rem;
        color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
        .browser-content {
            height: 400px;
        }

        .hero-title {
            font-size: 2rem;
        }

        .services-grid {
            grid-template-columns: 1fr;
        }

        .portfolio-grid {
            grid-template-columns: 1fr;
        }

        .nav-steps {
            gap: 1rem;
        }
    }
</style>