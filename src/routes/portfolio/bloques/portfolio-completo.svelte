<script lang="ts">
    import { onMount } from 'svelte';

    let selectedFilter = 'todos';
    let filteredCases = [];
    let currentDemoState = 0;
    let isDemoPlaying = false;
    let demoInterval;

    const projectTypes = [
        {
            label: 'Webs en producción',
            description: 'Sitios activos que ya trabajan para negocios reales, con soporte profesional y performance constante.',
            accent: 'green',
            icon: 'fas fa-globe'
        },
        {
            label: 'Landing de conversión',
            description: 'Páginas estratégicas para captar clientes, leads y reservas desde el primer scroll.',
            accent: 'yellow',
            icon: 'fas fa-rocket'
        },
        {
            label: 'Ecommerce premium',
            description: 'Tiendas online optimizadas para ventas, catálogo atractivo y una experiencia de compra fluida.',
            accent: 'blue',
            icon: 'fas fa-shopping-cart'
        }
    ];

    const featuredCases = [
        {
            title: 'Ribapizza.es',
            category: 'Sitio web real',
            highlight: 'Un escaparate digital para un restaurante local con carta, pedidos y presencia de marca.',
            tag: 'Restaurante & Delivery',
            image: '/images/portfolio/ribapizza.webp',
            website: 'https://ribapizza.es',
            details: [
                'Jerarquía de contenidos enfocada en la carta',
                'CTA a reserva y pedido rápido',
                'SEO local y posicionamiento de barrio'
            ]
        },
        {
            title: 'TechFlow Solutions',
            category: 'Web Corporativa',
            highlight: 'Sitio institucional que comunica expertise técnico y genera confianza en clientes B2B.',
            tag: 'Empresa tecnológica',
            image: '/images/portfolio/cases/corporate-professional.svg',
            details: [
                'Arquitectura de información clara',
                'Sección de servicios destacados',
                'CTA a contacto y consulta'
            ]
        },
        {
            title: 'Atlas Commerce',
            category: 'Ecommerce Premium',
            highlight: 'Plataforma de venta con catálogo selecto, navegación ágil y checkout sin fricciones.',
            tag: 'Tienda online escalable',
            image: '/images/portfolio/cases/ecommerce-premium.svg',
            details: [
                'Navegación centrada en producto',
                'Checkout simplificado y seguro',
                'Optimización para rendimiento y conversiones'
            ]
        },
        {
            title: 'Bella Ristorante',
            category: 'Web de Restaurante',
            highlight: 'Página completa para restaurante con menú digital, reservas online y galería de platos.',
            tag: 'Hostelería moderna',
            image: '/images/portfolio/cases/restaurant-landing.svg',
            details: [
                'Sistema de reservas integrado',
                'Menú digital con fotos apetecibles',
                'Optimización para pedidos móviles'
            ]
        },
        {
            title: 'Nova Launch',
            category: 'Landing de Conversión',
            highlight: 'Página rápida y directa para comunicar valor y captar clientes desde el primer vistazo.',
            tag: 'Lanzamiento digital',
            image: '/images/portfolio/cases/saas-landing.svg',
            details: [
                'Mensaje claro para captar atención',
                'Formulario optimizado para leads',
                'Diseño mobile-first y persuasivo'
            ]
        },
        {
            title: 'Digital Insights',
            category: 'Blog Profesional',
            highlight: 'Plataforma de contenidos con artículos especializados, categorías y newsletter integrada.',
            tag: 'Contenidos digitales',
            image: '/images/portfolio/cases/blog-platform.svg',
            details: [
                'Sistema de categorías inteligente',
                'Newsletter integrada',
                'Optimización SEO para contenidos'
            ]
        },
        {
            title: 'Creative Studio',
            category: 'Portfolio Creativo',
            highlight: 'Showcase profesional para agencia creativa con trabajos destacados y servicios.',
            tag: 'Agencia digital',
            image: '/images/portfolio/cases/creative-agency.svg',
            details: [
                'Galería de proyectos interactiva',
                'Presentación de servicios clara',
                'Diseño que refleja creatividad'
            ]
        }
    ];

    const filters = [
        { id: 'todos', label: 'Todos los Proyectos', icon: 'fas fa-th-large' },
        { id: 'corporativo', label: 'Webs Corporativas', icon: 'fas fa-building' },
        { id: 'ecommerce', label: 'E-commerce', icon: 'fas fa-shopping-cart' },
        { id: 'landing', label: 'Landing Pages', icon: 'fas fa-bullseye' },
        { id: 'restaurante', label: 'Restaurantes', icon: 'fas fa-utensils' },
        { id: 'blog', label: 'Blogs', icon: 'fas fa-blog' },
        { id: 'creativo', label: 'Creativos', icon: 'fas fa-palette' }
    ];

    const demoStates = [
        { name: 'hero', title: 'Página Principal', description: 'Hero section con navegación clara' },
        { name: 'services', title: 'Servicios', description: 'Presentación de servicios destacados' },
        { name: 'portfolio', title: 'Portfolio', description: 'Galería de trabajos realizados' },
        { name: 'contact', title: 'Contacto', description: 'Formulario y datos de contacto' }
    ];

    function filterCases(filterId) {
        selectedFilter = filterId;
        if (filterId === 'todos') {
            filteredCases = featuredCases;
        } else {
            filteredCases = featuredCases.filter(caseItem => {
                const category = caseItem.category.toLowerCase();
                switch (filterId) {
                    case 'corporativo':
                        return category.includes('corporativa') || category.includes('empresa');
                    case 'ecommerce':
                        return category.includes('ecommerce') || category.includes('tienda');
                    case 'landing':
                        return category.includes('landing') || category.includes('conversión');
                    case 'restaurante':
                        return category.includes('restaurante');
                    case 'blog':
                        return category.includes('blog');
                    case 'creativo':
                        return category.includes('creativo') || category.includes('portfolio');
                    default:
                        return true;
                }
            });
        }
    }

    function playDemo() {
        if (isDemoPlaying) return;
        isDemoPlaying = true;
        demoInterval = setInterval(() => {
            currentDemoState = (currentDemoState + 1) % demoStates.length;
        }, 3000);
    }

    function pauseDemo() {
        isDemoPlaying = false;
        if (demoInterval) {
            clearInterval(demoInterval);
        }
    }

    function resetDemo() {
        pauseDemo();
        currentDemoState = 0;
    }

    onMount(() => {
        filterCases('todos');
    });
</script>

<!-- Estrategia Section -->
<section class="section strategy-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>🔥 Portfolio de webs profesionales</h2>
            <p class="section-subtitle">
                Mostramos el tipo de proyectos digitales que desarrollamos: sitios web con identidad, claridad comercial y rendimiento superior.
            </p>
        </div>

        <div class="strategy-grid">
            <article class="strategy-card">
                <span class="strategy-dot green">01</span>
                <h3>Webs en vivo</h3>
                <p>Proyectos en producción que ya están generando resultados, con diseño, contenidos y navegación profesional.</p>
            </article>

            <article class="strategy-card">
                <span class="strategy-dot yellow">02</span>
                <h3>Landing de conversión</h3>
                <p>Páginas estratégicas para campañas y servicios, creadas para captar clientes con mensajes claros y formularios optimizados.</p>
            </article>

            <article class="strategy-card">
                <span class="strategy-dot blue">03</span>
                <h3>Ecommerce premium</h3>
                <p>Tiendas online con experiencia de compra cuidada, catálogo atractivo y rendimiento web que impulsa ventas.</p>
            </article>
        </div>
    </div>
</section>

<!-- Tipos de Soluciones Section -->
<section class="section types-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Tipos de soluciones web que entregamos</h2>
            <p class="section-subtitle">
                Desde webs en producción hasta landing pages y ecommerce, cada proyecto se construye con enfoque comercial y visual profesional.
            </p>
        </div>

        <div class="types-grid">
            {#each projectTypes as type}
                <article class="type-card">
                    <div class="type-icon {type.accent}">
                        <i class={type.icon}></i>
                    </div>
                    <h3>{type.label}</h3>
                    <p>{type.description}</p>
                </article>
            {/each}
        </div>
    </div>
</section>

<!-- Estadísticas Section -->
<section class="section stats-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Nuestras métricas de éxito</h2>
            <p class="section-subtitle">
                Resultados concretos que respaldan nuestro trabajo profesional
            </p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">50+</div>
                <div class="stat-label">Proyectos completados</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">98%</div>
                <div class="stat-label">Clientes satisfechos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">24h</div>
                <div class="stat-label">Tiempo de entrega promedio</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">100%</div>
                <div class="stat-label">Proyectos en producción</div>
            </div>
        </div>
    </div>
</section>

<!-- Casos de Éxito con Filtros -->
<section class="section cases-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Nuestros Casos de Éxito</h2>
            <p class="section-subtitle">Explora nuestros proyectos más destacados por categoría</p>
        </div>

        <!-- Filter Buttons -->
        <div class="filter-buttons">
            {#each filters as filter}
                <button
                    class="filter-btn {selectedFilter === filter.id ? 'active' : ''}"
                    on:click={() => filterCases(filter.id)}
                >
                    <i class={filter.icon}></i>
                    <span>{filter.label}</span>
                </button>
            {/each}
        </div>

        <!-- Results Counter -->
        <div class="results-counter">
            <span class="counter-text">
                Mostrando <strong>{filteredCases.length}</strong> de <strong>{featuredCases.length}</strong> proyectos
            </span>
        </div>

        <!-- Filtered Cases Grid -->
        <div class="cases-grid">
            {#each filteredCases as caseItem, index}
                <div class="case-card">
                    <div class="card-image">
                        <img src={caseItem.image} alt={caseItem.title} loading="lazy" />
                        <div class="card-overlay">
                            <div class="card-category">{caseItem.category}</div>
                            {#if caseItem.website}
                                <a href={caseItem.website} target="_blank" class="card-link">
                                    <i class="fas fa-external-link-alt"></i>
                                    Ver Sitio Web
                                </a>
                            {/if}
                        </div>
                    </div>

                    <div class="card-content">
                        <div class="card-header">
                            <h3 class="card-title">{caseItem.title}</h3>
                            <span class="card-tag">{caseItem.tag}</span>
                        </div>

                        <p class="card-description">{caseItem.highlight}</p>

                        <ul class="card-features">
                            {#each caseItem.details as detail}
                                <li><i class="fas fa-check"></i> {detail}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}
        </div>

        {#if filteredCases.length === 0}
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron proyectos</h3>
                <p>Prueba con otro filtro o <a href="/contacto">contáctanos</a> para un proyecto personalizado.</p>
            </div>
        {/if}
    </div>
</section>

<!-- Demo Interactiva Section -->
<section class="section demo-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Demo Interactiva en Vivo</h2>
            <p class="section-subtitle">Ve cómo funciona una web profesional en tiempo real</p>
        </div>

        <div class="demo-container">
            <!-- Video/Mockup Container -->
            <div class="mockup-container">
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
                        {#if currentDemoState === 0}
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
                        {:else if currentDemoState === 1}
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
                        {:else if currentDemoState === 2}
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
                        {:else if currentDemoState === 3}
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
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Controls -->
            <div class="demo-controls">
                <div class="control-buttons">
                    <button class="control-btn {isDemoPlaying ? 'pause' : 'play'}" on:click={isDemoPlaying ? pauseDemo : playDemo}>
                        <i class="fas fa-{isDemoPlaying ? 'pause' : 'play'}"></i>
                    </button>
                    <button class="control-btn reset" on:click={resetDemo}>
                        <i class="fas fa-redo"></i>
                    </button>
                </div>

                <!-- Current Action -->
                <div class="current-action">
                    <div class="action-indicator {isDemoPlaying ? 'active' : ''}"></div>
                    <span class="action-text">
                        {#if isDemoPlaying}
                            Navegando: {demoStates[currentDemoState]?.title || 'Cargando...'}
                        {:else}
                            Demo pausada - Haz clic en play para continuar
                        {/if}
                    </span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Experiencia Interactiva Section -->
<section class="section interactive-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Experiencia Interactiva</h2>
            <p class="section-subtitle">Descubre cómo se siente navegar por una web profesional</p>
        </div>

        <div class="interactive-demo">
            <div class="demo-navigation">
                <button class="nav-btn {currentDemoState === 0 ? 'active' : ''}" on:click={() => currentDemoState = 0}>
                    <i class="fas fa-home"></i>
                    <span>Inicio</span>
                </button>
                <button class="nav-btn {currentDemoState === 1 ? 'active' : ''}" on:click={() => currentDemoState = 1}>
                    <i class="fas fa-concierge-bell"></i>
                    <span>Servicios</span>
                </button>
                <button class="nav-btn {currentDemoState === 2 ? 'active' : ''}" on:click={() => currentDemoState = 2}>
                    <i class="fas fa-images"></i>
                    <span>Portfolio</span>
                </button>
                <button class="nav-btn {currentDemoState === 3 ? 'active' : ''}" on:click={() => currentDemoState = 3}>
                    <i class="fas fa-envelope"></i>
                    <span>Contacto</span>
                </button>
            </div>

            <div class="demo-content">
                <div class="content-card">
                    <h3>{demoStates[currentDemoState]?.title}</h3>
                    <p>{demoStates[currentDemoState]?.description}</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: {((currentDemoState + 1) / demoStates.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">{currentDemoState + 1} de {demoStates.length}</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="section testimonials-section">
    <div class="content-wrapper">
        <div class="section-heading">
            <h2>Lo que dicen nuestros clientes</h2>
            <p class="section-subtitle">Testimonios reales de proyectos exitosos</p>
        </div>

        <div class="testimonials-grid">
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Excelente trabajo. La web de mi restaurante se ve profesional y ha aumentado las reservas significativamente."</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="author-info">
                        <div class="author-name">Carlos Rodríguez</div>
                        <div class="author-company">Propietario, RibaPizza</div>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Muy satisfecho con el resultado. La tienda online funciona perfectamente y las ventas han subido un 40%."</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="author-info">
                        <div class="author-name">María González</div>
                        <div class="author-company">CEO, Atlas Commerce</div>
                    </div>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>"Profesionalismo y calidad excepcional. El sitio web refleja perfectamente la imagen de nuestra empresa."</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="author-info">
                        <div class="author-name">Juan Martínez</div>
                        <div class="author-company">Director, TechFlow Solutions</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="section cta-section">
    <div class="content-wrapper">
        <div class="cta-content">
            <h2>¿Listo para tener una web profesional?</h2>
            <p>Hablemos de tu proyecto y creemos algo increíble juntos</p>
            <div class="cta-buttons">
                <a href="/contacto" class="cta-btn primary">
                    <i class="fas fa-paper-plane"></i>
                    Solicitar Presupuesto
                </a>
                <a href="https://wa.me/613003673" target="_blank" class="cta-btn secondary">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp Directo
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    /* Global Section Styles */
    .section {
        padding: 5rem 0;
    }

    .content-wrapper {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .section-heading {
        text-align: center;
        margin-bottom: 4rem;
    }

    .section-heading h2 {
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

    /* Strategy Section */
    .strategy-section {
        background: linear-gradient(180deg, rgba(11, 14, 20, 0.98) 0%, rgba(27, 30, 41, 0.98) 100%);
    }

    .strategy-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .strategy-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2rem;
        position: relative;
        transition: all 0.3s ease;
    }

    .strategy-card:hover {
        transform: translateY(-5px);
        border-color: rgba(73, 228, 176, 0.3);
    }

    .strategy-dot {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.9rem;
    }

    .strategy-dot.green { background: #28a745; color: white; }
    .strategy-dot.yellow { background: #ffc107; color: black; }
    .strategy-dot.blue { background: #007bff; color: white; }

    .strategy-card h3 {
        color: var(--color-text-light);
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .strategy-card p {
        color: var(--color-text-muted);
        line-height: 1.6;
    }

    /* Types Section */
    .types-section {
        background: var(--color-background);
    }

    .types-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .type-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
    }

    .type-card:hover {
        transform: translateY(-5px);
        border-color: rgba(73, 228, 176, 0.3);
    }

    .type-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1.5rem;
        font-size: 2rem;
    }

    .type-icon.green { background: rgba(40, 167, 69, 0.1); color: #28a745; }
    .type-icon.yellow { background: rgba(255, 193, 7, 0.1); color: #ffc107; }
    .type-icon.blue { background: rgba(0, 123, 255, 0.1); color: #007bff; }

    .type-card h3 {
        color: var(--color-text-light);
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    .type-card p {
        color: var(--color-text-muted);
        line-height: 1.6;
    }

    /* Stats Section */
    .stats-section {
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .stat-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2rem;
        text-align: center;
    }

    .stat-number {
        font-size: 3rem;
        font-weight: 900;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
    }

    .stat-label {
        color: var(--color-text-light);
        font-size: 1.1rem;
        font-weight: 600;
    }

    /* Cases Section */
    .cases-section {
        background: rgba(255,255,255,0.02);
    }

    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 3rem;
    }

    .filter-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 50px;
        color: var(--color-text-light);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn:hover, .filter-btn.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-background);
    }

    .results-counter {
        text-align: center;
        margin-bottom: 2rem;
    }

    .counter-text {
        color: var(--color-text-muted);
        font-size: 0.95rem;
    }

    .counter-text strong {
        color: var(--color-primary);
        font-weight: 700;
    }

    .cases-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
    }

    .case-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .case-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 60px rgba(73, 228, 176, 0.15);
        border-color: rgba(73, 228, 176, 0.3);
    }

    .card-image {
        position: relative;
        height: 250px;
        overflow: hidden;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .case-card:hover .card-image img {
        transform: scale(1.05);
    }

    .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .case-card:hover .card-overlay {
        opacity: 1;
    }

    .card-category {
        background: var(--color-primary);
        color: var(--color-background);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        align-self: flex-start;
    }

    .card-link {
        background: rgba(255,255,255,0.2);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        align-self: flex-end;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    }

    .card-link:hover {
        background: rgba(255,255,255,0.3);
        transform: translateY(-2px);
    }

    .card-content {
        padding: 2rem;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
    }

    .card-title {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-text-light);
        margin: 0;
        flex: 1;
    }

    .card-tag {
        background: rgba(73, 228, 176, 0.1);
        color: var(--color-primary);
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        white-space: nowrap;
        margin-left: 1rem;
    }

    .card-description {
        color: var(--color-text-muted);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }

    .card-features {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .card-features li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--color-text-light);
        font-size: 0.9rem;
        margin-bottom: 0.75rem;
    }

    .card-features li i {
        color: var(--color-primary);
        font-size: 0.8rem;
    }

    .no-results {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--color-text-muted);
    }

    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        opacity: 0.5;
    }

    .no-results h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--color-text-light);
    }

    .no-results p {
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .no-results a {
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 600;
    }

    .no-results a:hover {
        text-decoration: underline;
    }

    /* Demo Section */
    .demo-section {
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%);
    }

    .demo-container {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 3rem;
        align-items: start;
    }

    .mockup-container {
        flex: 1;
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

    .browser-button:nth-child(1) { background: #ff5f57; }
    .browser-button:nth-child(2) { background: #ffbd2e; }
    .browser-button:nth-child(3) { background: #28ca42; }

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
        height: 500px;
        background: white;
        position: relative;
        overflow: hidden;
    }

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
        font-size: 2.5rem;
        font-weight: 900;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        position: relative;
        z-index: 1;
    }

    .hero-content p {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        opacity: 0.9;
        position: relative;
        z-index: 1;
    }

    .hero-cta {
        display: flex;
        gap: 1rem;
        justify-content: center;
        position: relative;
        z-index: 1;
    }

    .cta-btn {
        padding: 0.75rem 1.5rem;
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

    .demo-services {
        padding: 2rem;
        height: 100%;
        background: #f8f9fa;
        overflow-y: auto;
    }

    .demo-services h2 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
        font-size: 1.8rem;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
    }

    .service-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .service-card i {
        font-size: 2rem;
        color: #ff6b35;
        margin-bottom: 0.5rem;
    }

    .service-card h3 {
        color: #333;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }

    .service-card p {
        color: #666;
        font-size: 0.9rem;
    }

    .demo-portfolio {
        padding: 2rem;
        height: 100%;
        background: white;
        overflow-y: auto;
    }

    .demo-portfolio h2 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
        font-size: 1.8rem;
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .portfolio-item {
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        height: 150px;
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
        padding: 1rem;
        color: white;
    }

    .item-overlay h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    .item-overlay p {
        margin: 0;
        opacity: 0.9;
        font-size: 0.9rem;
    }

    .demo-contact {
        padding: 2rem;
        height: 100%;
        background: #f8f9fa;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .demo-contact h2 {
        text-align: center;
        color: #333;
        margin-bottom: 2rem;
        font-size: 1.8rem;
    }

    .contact-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .form-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .contact-form input,
    .contact-form textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 0.9rem;
    }

    .contact-form textarea {
        height: 80px;
        resize: vertical;
        margin-bottom: 1rem;
    }

    .submit-btn {
        width: 100%;
        padding: 0.75rem;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .submit-btn:hover {
        background: #e55a2b;
    }

    .demo-controls {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        min-width: 250px;
    }

    .control-buttons {
        display: flex;
        gap: 1rem;
    }

    .control-btn {
        flex: 1;
        padding: 1rem;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }

    .control-btn.play {
        background: rgba(40, 167, 69, 0.1);
        color: #28a745;
    }

    .control-btn.play:hover {
        background: #28a745;
        color: white;
        transform: scale(1.1);
    }

    .control-btn.pause {
        background: rgba(255, 193, 7, 0.1);
        color: #ffc107;
    }

    .control-btn.pause:hover {
        background: #ffc107;
        color: black;
        transform: scale(1.1);
    }

    .control-btn.reset {
        background: rgba(220, 53, 69, 0.1);
        color: #dc3545;
    }

    .control-btn.reset:hover {
        background: #dc3545;
        color: white;
        transform: scale(1.1);
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
        font-size: 0.9rem;
        flex: 1;
    }

    /* Interactive Section */
    .interactive-section {
        background: var(--color-background);
    }

    .interactive-demo {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 3rem;
        align-items: start;
    }

    .demo-navigation {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .nav-btn {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 15px;
        color: var(--color-text-light);
        text-decoration: none;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .nav-btn:hover, .nav-btn.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: var(--color-background);
    }

    .nav-btn i {
        font-size: 1.2rem;
        width: 20px;
    }

    .nav-btn span {
        font-weight: 600;
    }

    .demo-content {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2rem;
    }

    .content-card h3 {
        color: var(--color-text-light);
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    .content-card p {
        color: var(--color-text-muted);
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }

    .progress-bar {
        height: 8px;
        background: rgba(255,255,255,0.1);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 1rem;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-primary) 0%, rgba(20,184,166,1) 100%);
        border-radius: 4px;
        transition: width 0.3s ease;
    }

    .progress-text {
        color: var(--color-text-muted);
        font-size: 0.9rem;
        text-align: center;
    }

    /* Testimonials Section */
    .testimonials-section {
        background: linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%);
    }

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .testimonial-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2rem;
    }

    .testimonial-content {
        margin-bottom: 2rem;
    }

    .testimonial-content p {
        color: var(--color-text-light);
        font-size: 1.1rem;
        line-height: 1.6;
        font-style: italic;
    }

    .testimonial-author {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-background);
        font-size: 1.2rem;
    }

    .author-info {
        flex: 1;
    }

    .author-name {
        color: var(--color-text-light);
        font-weight: 700;
        margin-bottom: 0.25rem;
    }

    .author-company {
        color: var(--color-text-muted);
        font-size: 0.9rem;
    }

    /* CTA Section */
    .cta-section {
        background: linear-gradient(135deg, var(--color-primary) 0%, rgba(20,184,166,1) 100%);
        text-align: center;
    }

    .cta-content {
        max-width: 600px;
        margin: 0 auto;
    }

    .cta-content h2 {
        color: var(--color-background);
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .cta-content p {
        color: rgba(255,255,255,0.9);
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }

    .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .cta-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1rem;
    }

    .cta-btn.primary {
        background: var(--color-background);
        color: var(--color-primary);
    }

    .cta-btn.primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .cta-btn.secondary {
        background: rgba(255,255,255,0.1);
        color: var(--color-background);
        border: 2px solid rgba(255,255,255,0.3);
    }

    .cta-btn.secondary:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
        transform: translateY(-3px);
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
        .section {
            padding: 3rem 0;
        }

        .content-wrapper {
            padding: 0 1rem;
        }

        .section-heading h2 {
            font-size: 2rem;
        }

        .strategy-grid,
        .types-grid,
        .stats-grid {
            grid-template-columns: 1fr;
        }

        .cases-grid {
            grid-template-columns: 1fr;
        }

        .demo-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .interactive-demo {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .demo-navigation {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 1rem;
        }

        .nav-btn {
            flex-shrink: 0;
            min-width: 120px;
        }

        .cta-buttons {
            flex-direction: column;
            align-items: center;
        }

        .cta-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }

        .hero-cta {
            flex-direction: column;
            align-items: center;
        }

        .filter-buttons {
            justify-content: center;
        }

        .filter-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
        }

        .card-header {
            flex-direction: column;
            gap: 1rem;
        }

        .card-tag {
            align-self: flex-start;
            margin-left: 0;
        }

        .testimonials-grid {
            grid-template-columns: 1fr;
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
    }
</style>