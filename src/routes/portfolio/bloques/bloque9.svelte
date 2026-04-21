<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    let videoContainer: HTMLElement;
    let isPlaying = false;
    let currentTime = 0;
    let duration = 15; // 15 segundos de demo

    const navigationSteps = [
        { time: 0, action: 'Navegando a la página principal', section: 'hero' },
        { time: 3, action: 'Explorando servicios', section: 'services' },
        { time: 6, action: 'Viendo portfolio', section: 'portfolio' },
        { time: 9, action: 'Formulario de contacto', section: 'contact' },
        { time: 12, action: 'Navegación completa', section: 'complete' }
    ];

    let currentStep = 0;

    function playDemo() {
        if (isPlaying) return;

        isPlaying = true;
        currentTime = 0;
        currentStep = 0;

        const interval = setInterval(() => {
            currentTime += 0.1;

            // Update current step based on time
            const newStep = navigationSteps.findIndex(step => currentTime >= step.time);
            if (newStep !== -1 && newStep !== currentStep) {
                currentStep = newStep;
            }

            if (currentTime >= duration) {
                isPlaying = false;
                currentTime = 0;
                currentStep = 0;
                clearInterval(interval);
            }
        }, 100);
    }

    function pauseDemo() {
        isPlaying = false;
    }

    function resetDemo() {
        isPlaying = false;
        currentTime = 0;
        currentStep = 0;
    }

    onDestroy(() => {
        isPlaying = false;
    });
</script>

<section class="section demo-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="demo-header">
            <h2 class="section-title">Demo Interactiva en Vivo</h2>
            <p class="section-subtitle">Ve cómo funciona una web profesional en tiempo real</p>
        </div>

        <div class="demo-container animate-on-scroll">
            <!-- Video/Mockup Container -->
            <div class="mockup-container" bind:this={videoContainer}>
                <div class="mockup-frame">
                    <!-- Browser Header -->
                    <div class="browser-header">
                        <div class="browser-buttons">
                            <span class="browser-button close"></span>
                            <span class="browser-button minimize"></span>
                            <span class="browser-button maximize"></span>
                        </div>
                        <div class="browser-address">
                            <span class="url">https://ribapizza.es</span>
                        </div>
                    </div>

                    <!-- Content Area -->
                    <div class="mockup-content">
                        {#if currentStep === 0}
                            <!-- Hero Section -->
                            <div class="demo-hero">
                                <div class="hero-bg">
                                    <div class="pizza-pattern"></div>
                                </div>
                                <div class="hero-content">
                                    <h1>RibaPizza</h1>
                                    <p>Las mejores pizzas artesanales de la ciudad</p>
                                    <div class="hero-cta">
                                        <button class="cta-btn">Ver Menú</button>
                                        <button class="cta-btn secondary">Reservar Mesa</button>
                                    </div>
                                </div>
                            </div>
                        {:else if currentStep === 1}
                            <!-- Services Section -->
                            <div class="demo-services">
                                <h2>Nuestros Servicios</h2>
                                <div class="services-grid">
                                    <div class="service-card">
                                        <i class="fas fa-pizza-slice"></i>
                                        <h3>Pizzas Artesanales</h3>
                                        <p>Masa madre, ingredientes frescos</p>
                                    </div>
                                    <div class="service-card">
                                        <i class="fas fa-truck"></i>
                                        <h3>Delivery 24/7</h3>
                                        <p>Entrega rápida y segura</p>
                                    </div>
                                    <div class="service-card">
                                        <i class="fas fa-calendar-check"></i>
                                        <h3>Reservas Online</h3>
                                        <p>Sistema de reservas integrado</p>
                                    </div>
                                </div>
                            </div>
                        {:else if currentStep === 2}
                            <!-- Portfolio Section -->
                            <div class="demo-portfolio">
                                <h2>Galería de Platos</h2>
                                <div class="portfolio-grid">
                                    <div class="portfolio-item">
                                        <img src="/images/portfolio/cases/restaurant-landing.svg" alt="Pizza Margherita" />
                                        <div class="item-overlay">
                                            <h4>Pizza Margherita</h4>
                                            <p>Tomate, mozzarella, albahaca</p>
                                        </div>
                                    </div>
                                    <div class="portfolio-item">
                                        <img src="/images/portfolio/cases/restaurant-landing.svg" alt="Pizza Pepperoni" />
                                        <div class="item-overlay">
                                            <h4>Pizza Pepperoni</h4>
                                            <p>Pepperoni italiano premium</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {:else if currentStep === 3}
                            <!-- Contact Section -->
                            <div class="demo-contact">
                                <h2>Contáctanos</h2>
                                <form class="contact-form">
                                    <div class="form-group">
                                        <input type="text" placeholder="Nombre" />
                                        <input type="email" placeholder="Email" />
                                    </div>
                                    <textarea placeholder="Mensaje"></textarea>
                                    <button type="submit" class="submit-btn">Enviar Mensaje</button>
                                </form>
                            </div>
                        {:else}
                            <!-- Complete State -->
                            <div class="demo-complete">
                                <div class="complete-icon">
                                    <i class="fas fa-check-circle"></i>
                                </div>
                                <h2>¡Demo Completada!</h2>
                                <p>Has visto una navegación completa por la web</p>
                                <button class="restart-btn" on:click={resetDemo}>Reiniciar Demo</button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Controls -->
            <div class="demo-controls">
                <div class="control-buttons">
                    <button class="control-btn {isPlaying ? 'pause' : 'play'}" on:click={isPlaying ? pauseDemo : playDemo}>
                        <i class="fas fa-{isPlaying ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="control-btn reset" on:click={resetDemo}>
                        <i class="fas fa-redo"></i>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
                    </div>
                    <div class="progress-time">
                        <span>{Math.floor(currentTime)}s</span>
                        <span>{duration}s</span>
                    </div>
                </div>

                <!-- Current Action -->
                <div class="current-action">
                    <div class="action-indicator {isPlaying ? 'active' : ''}"></div>
                    <span class="action-text">
                        {#if isPlaying}
                            {navigationSteps[currentStep]?.action || 'Navegando...'}
                        {:else}
                            Demo pausada - Haz clic en play para continuar
                        {/if}
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .demo-section {
        padding: 5rem 0;
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%);
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
        max-width: 1200px;
        margin: 0 auto;
    }

    .mockup-container {
        margin-bottom: 3rem;
    }

    .mockup-frame {
        background: #1a1a1a;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        border: 2px solid rgba(255,255,255,0.1);
    }

    .browser-header {
        background: #2d2d2d;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .browser-buttons {
        display: flex;
        gap: 0.5rem;
    }

    .browser-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: block;
    }

    .browser-button.close { background: #ff5f57; }
    .browser-button.minimize { background: #ffbd2e; }
    .browser-button.maximize { background: #28ca42; }

    .browser-address {
        flex: 1;
        background: #1a1a1a;
        border-radius: 20px;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .url {
        color: var(--color-text-light);
        font-size: 0.9rem;
        font-family: 'Monaco', 'Menlo', monospace;
    }

    .mockup-content {
        height: 600px;
        background: white;
        position: relative;
        overflow: hidden;
    }

    /* Hero Demo */
    .demo-hero {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
    }

    .hero-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    }

    .pizza-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2%, transparent 2%),
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2%, transparent 2%);
        background-size: 50px 50px;
    }

    .hero-content h1 {
        font-size: 3rem;
        font-weight: 900;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-content p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .cta-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 50px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .cta-btn:first-child {
        background: white;
        color: #ff6b35;
    }

    .cta-btn.secondary {
        background: rgba(255,255,255,0.2);
        color: white;
        border: 2px solid white;
    }

    /* Services Demo */
    .demo-services {
        padding: 3rem;
        height: 100%;
        background: #f8f9fa;
    }

    .demo-services h2 {
        text-align: center;
        color: #333;
        margin-bottom: 3rem;
        font-size: 2rem;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
    }

    .service-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: transform 0.3s ease;
    }

    .service-card:hover {
        transform: translateY(-5px);
    }

    .service-card i {
        font-size: 2.5rem;
        color: #ff6b35;
        margin-bottom: 1rem;
    }

    .service-card h3 {
        color: #333;
        margin-bottom: 0.5rem;
    }

    .service-card p {
        color: #666;
    }

    /* Portfolio Demo */
    .demo-portfolio {
        padding: 3rem;
        height: 100%;
        background: white;
    }

    .demo-portfolio h2 {
        text-align: center;
        color: #333;
        margin-bottom: 3rem;
        font-size: 2rem;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .portfolio-item {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        height: 200px;
    }

    .portfolio-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        padding: 2rem 1.5rem 1.5rem;
        color: white;
    }

    .item-overlay h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
    }

    .item-overlay p {
        margin: 0;
        opacity: 0.9;
    }

    /* Contact Demo */
    .demo-contact {
        padding: 3rem;
        height: 100%;
        background: #f8f9fa;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .demo-contact h2 {
        text-align: center;
        color: #333;
        margin-bottom: 3rem;
        font-size: 2rem;
    }

    .contact-form {
        max-width: 500px;
        margin: 0 auto;
    }

    .form-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .contact-form input,
    .contact-form textarea {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 1rem;
    }

    .contact-form textarea {
        height: 120px;
        resize: vertical;
        margin-bottom: 1rem;
    }

    .submit-btn {
        width: 100%;
        padding: 1rem;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 10px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .submit-btn:hover {
        background: #e55a2b;
    }

    /* Complete Demo */
    .demo-complete {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
    }

    .complete-icon {
        font-size: 4rem;
        margin-bottom: 2rem;
        color: white;
    }

    .demo-complete h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .demo-complete p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .restart-btn {
        padding: 1rem 2rem;
        background: rgba(255,255,255,0.2);
        color: white;
        border: 2px solid white;
        border-radius: 50px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .restart-btn:hover {
        background: white;
        color: #28a745;
    }

    /* Controls */
    .demo-controls {
        background: rgba(255,255,255,0.05);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .control-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .control-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: rgba(73, 228, 176, 0.1);
        color: var(--color-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .control-btn:hover {
        background: var(--color-primary);
        color: var(--color-background);
        transform: scale(1.1);
    }

    .control-btn.pause {
        background: rgba(255, 193, 7, 0.1);
        color: #ffc107;
    }

    .control-btn.pause:hover {
        background: #ffc107;
        color: var(--color-background);
    }

    .control-btn.reset {
        background: rgba(220, 53, 69, 0.1);
        color: #dc3545;
    }

    .control-btn.reset:hover {
        background: #dc3545;
        color: white;
    }

    .progress-container {
        margin-bottom: 2rem;
    }

    .progress-bar {
        height: 8px;
        background: rgba(255,255,255,0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-primary) 0%, rgba(20,184,166,1) 100%);
        border-radius: 4px;
        transition: width 0.1s ease;
    }

    .progress-time {
        display: flex;
        justify-content: space-between;
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }

    .current-action {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(255,255,255,0.05);
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
    }

    .action-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transition: all 0.3s ease;
    }

    .action-indicator.active {
        background: var(--color-primary);
        box-shadow: 0 0 10px rgba(73, 228, 176, 0.5);
        animation: pulse 1s infinite;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    .action-text {
        color: var(--color-text-light);
        font-size: 1rem;
        flex: 1;
    }

    @media (max-width: 768px) {
        .mockup-content {
            height: 400px;
        }

        .services-grid {
            grid-template-columns: 1fr;
        }

        .portfolio-grid {
            grid-template-columns: 1fr;
        }

        .form-group {
            grid-template-columns: 1fr;
        }

        .hero-cta {
            flex-direction: column;
            align-items: center;
        }

        .section-title {
            font-size: 2rem;
        }
    }
</style>