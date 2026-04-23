<script lang="ts">
    import { setContext, onMount } from 'svelte';
    import { browser } from '$app/environment';
    import type { Action } from 'svelte/action';
    
    import '../app.css'; 

    // --- ESTADO Y LÓGICA DEL NAVBAR ---
    let isMenuOpen = false;
    let isScrolled = false;
    
    const navLinks = [
        { label: "Inicio", href: "/inicio" },
        { label: "Servicios", href: "/servicios" },
        { label: "Portfolio", href: "/portfolio" },
        { label: "Contáctenos", href: "/contacto" }, 
    ];
    
    function handleScroll() {
        if (browser) {
            isScrolled = window.scrollY > 50;
        }
    }
    
    function handleNavigation(event: MouseEvent, href: string) {
        isMenuOpen = false;
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop - 70, 
                    behavior: 'smooth'
                });
                event.preventDefault(); 
            }
        }
    }

    // ----------------------------------------------------
    // 🔥 ACCIÓN DE SVELTE PARA OBSERVER DE SCROLL
    // ----------------------------------------------------
    const scrollObserverAction: Action<HTMLElement> = (node) => {
        if (!browser || !('IntersectionObserver' in window)) { 
            node.classList.add('visible'); 
            return {}; 
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    if (!entry.target.classList.contains('timeline-progress')) {
                         observer.unobserve(entry.target); 
                    }
                } 
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -15% 0px', 
        });
        
        observer.observe(node);

        return {
            destroy() {
                observer.unobserve(node);
            }
        };
    };
    
    // Hacemos la acción disponible a otros componentes via context
    setContext('scrollObserverAction', scrollObserverAction);

    onMount(() => {
        if (browser) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        
        return () => {
            if (browser) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    });
</script>

<div class="app-layout">
    
    <header class="navbar" class:scrolled={isScrolled}>
        <div class="content-wrapper nav-container">
            <div class="left-items">
                <a href="/inicio" class="logo-link">
                    <img 
                        src="/zenithstudio-logo-blanco.png" 
                        alt="Zenith Studio Logo" 
                        class="logo-img"
                    >
                </a>
                <div class="separator"></div> <!-- Barra separadora -->
                
                <nav class="desktop-nav">
                    {#each navLinks as link}
                        <a href={link.href} on:click={(e) => handleNavigation(e, link.href)} class="nav-link">
                            {link.label}
                        </a>
                    {/each}
                </nav>
            </div>
            
            <div class="right-items">
                <div class="social-buttons">
                    <a href="https://www.instagram.com/zenithstudio.es" target="_blank" class="instagram-icon">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a href="https://wa.me/613003673" target="_blank" class="whatsapp-button">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
                
                <a href="/contacto" class="cta-nav-button desktop-only" on:click={(e) => handleNavigation(e, '/contacto')}>
                    Contáctenos
                </a>
            </div>
            
            <button 
                class="menu-toggle" 
                on:click={() => isMenuOpen = !isMenuOpen}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
                <i class="fas" class:fa-bars={!isMenuOpen} class:fa-times={isMenuOpen}></i>
            </button>
        </div>
        
        <div class="mobile-nav-menu" class:open={isMenuOpen}>
            {#each navLinks as link}
                <a href={link.href} on:click={(e) => handleNavigation(e, link.href)}>
                    {link.label}
                </a>
            {/each}
            <a href="/contacto" class="mobile-cta" on:click={(e) => handleNavigation(e, '/contacto')}>Contáctenos</a>
        </div>
    </header>
    
    <main>
        <slot />
    </main>
    
    <footer class="main-footer">
        <div class="content-wrapper footer-content">
            <div class="footer-brand">
                <a href="/inicio" class="logo-link">
                    <img src="/zenithstudio-logo-blanco.png" alt="Zenith Studio Logo" class="logo-img-footer">
                </a>
                <p>
                    Diseñamos y desarrollamos webs premium con foco en conversión, velocidad y crecimiento
                    sostenible.
                </p>
                <div class="footer-badges">
                    <span><i class="fa-solid fa-gauge-high"></i> Alto rendimiento</span>
                    <span><i class="fa-solid fa-mobile-screen"></i> Mobile first</span>
                    <span><i class="fa-solid fa-chart-line"></i> Orientado a resultados</span>
                </div>
            </div>
            
            <div class="footer-links">
                <h4>Navegación</h4>
                <a href="/inicio">Inicio</a>
                <a href="/servicios">Servicios</a>
                <a href="/portfolio">Portfolio</a>
                <a href="/contacto">Contacto</a>
            </div>
            
            <div class="footer-links">
                <h4>Contacto</h4>
                <a href="mailto:contacto@zenithstudio.com">contacto@zenithstudio.com</a>
                <a href="https://wa.me/613003673" target="_blank" rel="noreferrer">WhatsApp</a>
                <a href="https://www.instagram.com/zenithstudio.es" target="_blank" rel="noreferrer">Instagram</a>
            </div>

            <div class="footer-links">
                <h4>Legal</h4>
                <a href="/politica-privacidad">Política de Privacidad</a>
                <a href="/terminos-uso">Términos de Uso</a>
            </div>
        </div>
        <div class="footer-bottom content-wrapper">
            <p>&copy; {new Date().getFullYear()} Zenith Studio. Webs premium para negocios ambiciosos.</p>
            <p>Hecho con estrategia, diseño y rendimiento.</p>
        </div>
    </footer>
</div>

<style>
    /* Estilos del navbar y footer... */
    .app-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex-grow: 1;
        padding-top: 80px; 
    }

    .navbar {
        position: fixed; 
        top: 0;
        left: 0; 
        width: 100%;
        z-index: 1000; 
        height: 80px; 
        background-color: rgba(11, 14, 20, 0.75); 
        backdrop-filter: blur(8px); 
        -webkit-backdrop-filter: blur(8px);
        box-shadow: none;
        border-radius: 0; 
        transition: all 0.4s ease-in-out, top 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
    }

    .navbar.scrolled {
        height: 70px;
        background-color: rgba(11, 14, 20, 0.9); 
        box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.5), 
            0 0 15px rgba(73, 228, 176, 0.3); 
        width: 85%; 
        left: 7.5%; 
        top: 15px; 
        border-radius: 15px; 
    }

    .nav-container {
        display: flex;
        justify-content: space-between; /* Alinear a la izquierda y derecha */
        align-items: center;
        height: 100%;
    }

    .nav-container .left-items {
        display: flex;
        align-items: center;
    }

    .nav-container .right-items {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .logo-img {
        height: 40px; 
        transition: height 0.4s ease-in-out;
    }

    .navbar.scrolled .logo-img {
        height: 35px; 
    }
    
    .separator {
        width: 1px;
        height: 40px; /* Altura de la barra separadora */
        background-color: var(--color-text-muted);
        margin: 0 20px; /* Espaciado alrededor de la barra */
    }

    .desktop-nav {
        display: flex; 
        gap: 2rem;
        align-items: center; /* Alinear verticalmente */
    }
    
    .desktop-nav a {
        font-weight: 500;
        color: var(--color-text-muted);
        position: relative; /* Para el efecto de subrayado */
        text-decoration: none; /* Sin subrayado por defecto */
    }
    
    .desktop-nav a:hover {
        color: var(--color-primary);
    }
    
    .nav-link {
        color: var(--color-text-muted);
        transition: color 0.3s ease;
    }

    .nav-link:hover {
        color: #38c89b; /* Color aguamarina al pasar el ratón */
        text-decoration: none; /* Sin subrayado al pasar el ratón */
    }

    .nav-link::after {
        content: '';
        display: block;
        height: 2px;
        background: #38c89b; /* Color del subrayado */
        transition: width 0.3s ease;
        width: 0; /* Sin subrayado por defecto */
        position: absolute;
        left: 0;
        bottom: -5px; /* Espaciado del subrayado */
    }

    .nav-link:hover::after {
        width: 100%; /* Subrayado completo al pasar el ratón */
    }
    
    .social-buttons {
        display: flex;
        gap: 15px; /* Espaciado entre los botones */
        align-items: center; /* Alinear verticalmente */
    }

    .instagram-icon, .whatsapp-button {
        color: var(--color-text-muted);
        transition: transform 0.3s ease, color 0.3s ease;
        font-size: 1.5rem; /* Tamaño de los íconos */
    }

    .instagram-icon:hover {
        color: #E1306C; /* Color corporativo de Instagram */
        transform: scale(1.1); /* Efecto de aumento */
    }

    .whatsapp-button:hover {
        color: #25D366; /* Color corporativo de WhatsApp */
        transform: scale(1.1); /* Efecto de aumento */
    }

    /* Reglas mejoradas para el botón "Contáctenos" (efecto premium más visible) */
    .cta-nav-button {
        background: linear-gradient(90deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        color: var(--color-background);
        padding: 10px 22px;
        border-radius: 10px;
        font-weight: 700;
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.06);
        transition: transform 0.25s cubic-bezier(.2,.8,.2,1), box-shadow 0.25s ease, filter 0.25s ease;
        box-shadow: 0 6px 18px rgba(14,20,25,0.25);
        backdrop-filter: blur(4px);
    }

    /* Contenido encima de los efectos */
    .cta-nav-button > * { position: relative; z-index: 2; }

    /* Halo más visible */
    .cta-nav-button::before {
        content: "";
        position: absolute;
        inset: -6px;
        background: radial-gradient(800px 120px at 10% 0%, rgba(73,228,176,0.20), transparent 35%);
        z-index: 0;
        filter: blur(12px);
        opacity: 0;
        transition: opacity 0.28s ease, transform 0.28s ease;
        transform: scale(0.97);
    }

    /* Shine más grande y definido (animado por keyframes) */
    .cta-nav-button::after {
        content: "";
        position: absolute;
        top: -80%;
        left: -50%;
        width: 40%;
        height: 260%;
        background: linear-gradient(120deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.18) 40%,
            rgba(255,255,255,0.02) 70%,
            transparent 100%);
        transform: rotate(25deg) translateX(0);
        transition: opacity 0.35s ease, transform 0.6s ease;
        opacity: 0;
        z-index: 3;
        will-change: transform, opacity;
    }

    /* Hover / focus: elevación, mayor brillo y animación */
    .cta-nav-button:hover,
    .cta-nav-button:focus {
        transform: translateY(-5px) scale(1.03);
        box-shadow: 0 18px 44px rgba(73,228,176,0.18), 0 8px 24px rgba(0,0,0,0.35);
        filter: saturate(1.12) brightness(1.03);
    }

    /* activar halo y lanzar la animación shine */
    .cta-nav-button:hover::before,
    .cta-nav-button:focus::before {
        opacity: 1;
        transform: scale(1);
    }

    .cta-nav-button:hover::after {
        opacity: 1;
        animation: cta-shine 0.9s cubic-bezier(.2,.9,.2,1);
    }

    /* Keyframes del brillo que atraviesa el botón */
    @keyframes cta-shine {
        0% {
            transform: translateX(-140%) rotate(25deg);
            opacity: 0;
        }
        30% {
            opacity: 0.95;
        }
        100% {
            transform: translateX(280%) rotate(25deg);
            opacity: 0;
        }
    }

    /* Foco accesible */
    .cta-nav-button:focus-visible {
        outline: 2px solid rgba(73,228,176,0.30);
        outline-offset: 4px;
    }

    .menu-toggle {
        display: block; 
        background: none;
        border: none;
        color: var(--color-primary);
        font-size: 1.5rem;
        cursor: pointer; 
        z-index: 1010;
        padding: 5px;
    }
    
    .mobile-nav-menu {
        position: absolute; 
        top: 80px; 
        right: 0;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        background-color: var(--color-surface);
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        transition: max-height 0.4s ease-in-out, padding 0.4s ease-in-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .navbar.scrolled .mobile-nav-menu {
        top: 70px; 
        border-radius: 0 0 15px 15px; 
    }
    
    .mobile-nav-menu.open {
        max-height: calc(100vh - 70px);
        padding: 20px 0;
        width: 100%;
        overflow-y: auto;
    }

    .mobile-nav-menu a {
        width: 90%;
        padding: 12px 0;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        color: var(--color-text-light);
        transition: background-color 0.3s ease;
    }
    
    .mobile-nav-menu a:hover {
        background-color: rgba(73, 228, 176, 0.1);
    }
    
    .mobile-cta {
        margin-top: 15px;
        border-bottom: none !important;
        background-color: var(--color-primary);
        color: var(--color-background) !important;
        border-radius: 6px;
        font-weight: 700;
    }
    
    .main-footer {
        background-color: var(--color-surface);
        padding-top: 2.2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        position: relative;
        overflow: hidden;
    }

    .main-footer::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at 10% 0%, rgba(73, 228, 176, 0.12), transparent 30%),
            radial-gradient(circle at 90% 0%, rgba(0, 191, 255, 0.1), transparent 30%);
    }
    
    .footer-content {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1.5fr repeat(3, minmax(0, 1fr));
        gap: 2rem;
        margin-bottom: 2.2rem;
    }
    
    .footer-brand {
        max-width: 470px;
    }
    
    .logo-img-footer {
        height: 45px;
        margin-bottom: 0.9rem;
        display: inline-block;
    }
    
    .footer-brand p {
        color: var(--color-text-muted);
        font-size: 0.93rem;
        line-height: 1.6;
        margin: 0;
    }

    .footer-badges {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .footer-badges span {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        font-size: 0.78rem;
        color: var(--color-text-muted);
        padding: 0.35rem 0.6rem;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.03);
    }

    .footer-badges i {
        color: var(--color-primary);
    }
    
    .footer-links h4 {
        color: var(--color-text-light);
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.07em;
        margin: 0 0 0.8rem;
    }
    
    .footer-links a {
        display: block;
        color: var(--color-text-muted);
        margin-bottom: 0.55rem;
        font-size: 0.88rem;
        overflow-wrap: anywhere;
    }
    
    .footer-links a:hover {
        color: var(--color-primary);
    }
    
    .footer-bottom {
        position: relative;
        z-index: 1;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        padding: 1rem 1.5rem 1.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }
    
    .footer-bottom p {
        margin: 0;
        color: var(--color-text-muted);
        font-size: 0.85rem;
        overflow-wrap: anywhere;
    }

    @media (min-width: 900px) {
        .desktop-nav {
            display: flex; 
        }
        .menu-toggle, .mobile-nav-menu {
            display: none; 
        }
        main {
            padding-top: 100px; 
        }
    }
    
    @media (max-width: 899px) {
        .navbar.scrolled {
            width: 100%;
            left: 0;
            top: 0;
            border-radius: 0;
        }
        .desktop-nav,
        .separator {
            display: none;
        }
        .nav-container .right-items {
            display: none;
        }
        .logo-img {
            height: 36px;
        }
        .desktop-only {
            display: none;
        }
        .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .footer-bottom {
            justify-content: center;
            text-align: center;
        }
    }

    @media (max-width: 600px) {
        .cta-nav-button {
            padding: 9px 16px;
            border-radius: 8px;
        }
        .cta-nav-button::before { filter: blur(8px); opacity: 0.8; }
        .cta-nav-button::after {
            width: 28%;
            height: 200%;
            top: -60%;
            left: -40%;
        }
        .cta-nav-button:hover::after {
            animation-duration: 0.7s;
        }
    }
</style>