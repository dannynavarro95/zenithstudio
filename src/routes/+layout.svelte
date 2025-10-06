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
        { label: "Contacto", href: "#contact" }, 
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
            <a href="/inicio" class="logo-link">
                <img 
                    src="/zenithstudio-logo-blanco.png" 
                    alt="Zenith Studio Logo" 
                    class="logo-img"
                >
            </a>
            
            <nav class="desktop-nav">
                {#each navLinks as link}
                    <a href={link.href} on:click={(e) => handleNavigation(e, link.href)}>
                        {link.label}
                    </a>
                {/each}
            </nav>
            
            <a href="#contact" class="cta-nav-button desktop-only" on:click={(e) => handleNavigation(e, '#contact')}>
                Iniciar Proyecto
            </a>
            
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
            <a href="#contact" class="mobile-cta" on:click={(e) => handleNavigation(e, '#contact')}>Iniciar Proyecto</a>
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
                <p>Maestría en desarrollo web, enfocada en rendimiento y escalabilidad.</p>
            </div>
            
            <div class="footer-links">
                <h4>Servicios</h4>
                <a href="/servicios">Estrategia</a>
                <a href="/servicios">Desarrollo</a>
                <a href="/servicios">UX/UI</a>
            </div>
            
            <div class="footer-links">
                <h4>Legal</h4>
                <a href="/politica-privacidad">Política de Privacidad</a>
                <a href="/terminos-uso">Términos de Uso</a>
            </div>
        </div>
        <div class="footer-bottom content-wrapper">
            <p>&copy; {new Date().getFullYear()} Zenith Studio. Todos los derechos reservados.</p>
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
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
    
    .logo-img {
        height: 40px; 
        transition: height 0.4s ease-in-out;
    }

    .navbar.scrolled .logo-img {
        height: 35px; 
    }
    
    .desktop-nav {
        display: none; 
        gap: 2rem;
    }
    
    .desktop-nav a {
        font-weight: 500;
        color: var(--color-text-muted);
    }
    
    .desktop-nav a:hover {
        color: var(--color-primary);
    }
    
    .cta-nav-button {
        background-color: var(--color-primary);
        color: var(--color-background);
        padding: 8px 20px;
        border-radius: 4px;
        font-weight: 600;
        transition: opacity 0.3s ease, background-color 0.3s ease;
    }
    
    .cta-nav-button:hover {
        opacity: 0.9;
        background-color: #38c89b;
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
        height: 0;
        overflow: hidden;
        background-color: var(--color-surface);
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: height 0.4s ease-in-out, padding 0.4s ease-in-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .navbar.scrolled .mobile-nav-menu {
        top: 70px; 
        border-radius: 0 0 15px 15px; 
    }
    
    .mobile-nav-menu.open {
        height: 250px; 
        padding: 20px 0;
        width: 100%;
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
        padding-top: 4rem;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .footer-content {
        display: flex;
        justify-content: space-between;
        gap: 3rem;
        margin-bottom: 3rem;
    }
    
    .footer-brand {
        max-width: 400px;
    }
    
    .logo-img-footer {
        height: 45px;
        margin-bottom: 1rem;
        display: inline-block;
    }
    
    .footer-brand p {
        color: var(--color-text-muted);
        font-size: 0.95rem;
    }
    
    .footer-links h4 {
        color: var(--color-text-light);
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }
    
    .footer-links a {
        display: block;
        color: var(--color-text-muted);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .footer-links a:hover {
        color: var(--color-primary);
    }
    
    .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        text-align: center;
        padding: 1.5rem 1.5rem;
    }
    
    .footer-bottom p {
        color: var(--color-text-muted);
        font-size: 0.85rem;
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
        .desktop-only {
            display: none;
        }
        .footer-content {
            flex-direction: column;
            gap: 2rem;
        }
    }
</style>