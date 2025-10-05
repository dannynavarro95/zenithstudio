<script>
    import "../app.css";
    import { onMount } from 'svelte';
    
    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Servicios', path: '/servicios' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contacto', path: '/contacto' }
    ];

    const contactLinks = [
        { name: 'Instagram', type: 'svg', content: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>', color: '#E4405F', href: 'https://www.instagram.com/zenithstudio.es' },
        { name: 'WhatsApp', type: 'img', content: '/whatsapp-verde.png', color: '#25D366', href: 'https://wa.me/34613003673' }
    ];

    let scrolled = false;

    onMount(() => {
        const handleScroll = () => {
            scrolled = window.scrollY > 50;
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<div class="site-container">
    <header class="main-header" class:sticky-scrolled={scrolled}>
        
        <div class="left-section">
            <div class="logo-wrapper">
                <a href="/">
                    <img 
                        src="/ZenithStudio - Logo blanco sin fondo.png" 
                        alt="Zenith Studio Logo" 
                        class="logo-image"
                        style="stroke: none !important; fill: none !important;" 
                    />
                </a>
            </div>
            
            <div class="separator"></div>

            <nav class="main-nav">
                {#each navLinks as link}
                    <a href={link.path} class="nav-link">
                        {link.name}
                    </a>
                {/each}
            </nav>
        </div>

        <div class="right-section">
            {#each contactLinks as link}
                <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="contact-button"
                    style="--hover-color: {link.color};" 
                >
                    {#if link.type === 'svg'}
                        {@html link.content}
                    {:else if link.type === 'img'}
                        <img src={link.content} alt={link.name} class="icon-img"/>
                    {/if}
                </a>
            {/each}
            
            <a href="/contacto" class="cta-button">
                Contáctenos
            </a>
        </div>
    </header>

    <main class="page-content">
        <slot />
    </main>

</div>

<style lang="scss">
    /* ---------------------------------------------------- */
    /* 1. ESTRUCTURA BASE */
    /* ---------------------------------------------------- */
    .site-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding-top: 100px; 
    }

    .page-content {
        flex: 1;
    }
    
    /* ---------------------------------------------------- */
    /* 2. HEADER - DISEÑO FLOTANTE Y FIJO (TRASLÚCIDO) */
    /* ---------------------------------------------------- */
    .main-header {
        position: fixed;
        top: 20px; 
        left: 50%;
        transform: translateX(-50%);
        width: 75%; 
        max-width: 1200px; 
        height: 60px; 
        z-index: 1000;
        
        display: flex;
        justify-content: space-between;
        align-items: center;

        /* FONDO TRASLÚCIDO FINAL */
        background-color: rgba(30, 30, 30, 0.55); 
        
        /* EFECTO GLASSMORFISMO */
        backdrop-filter: blur(12px); 
        -webkit-backdrop-filter: blur(12px);
        
        border: 1px solid rgba(255, 255, 255, 0.15); 
        border-radius: 12px; 
        
        padding: 0 1.5rem; 
        transition: all 0.4s ease-out;

        /* SOMBRA PREMIUM */
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 
                    0 0 0 1px rgba(255, 255, 255, 0.05); 

        /* EFECTO SCROLL: Estrechar más */
        &.sticky-scrolled {
            top: 10px;
            width: 70%; 
            height: 55px; 
            padding: 0 1rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
        }

        /* Estilos del Header ANIDADOS */
        .left-section, .right-section {
            display: flex;
            align-items: center;
        }
        
        .logo-image {
            height: 40px; 
            width: auto;
            display: block;
        }

        .separator {
            width: 1px;
            height: 15px; 
            background-color: rgba(255, 255, 255, 0.2);
            margin: 0 1.5rem;
        }
        
        /* ENLACES DE NAVEGACIÓN */
        .main-nav {
            display: flex;
            gap: 1.5rem;
        }

        .nav-link {
            font-size: 1rem;
            font-weight: 500;
            color: var(--color-text-light);
            opacity: 0.8;
            padding: 0.5rem 0;
            position: relative;
            transition: opacity 0.3s ease;
            
            &:hover {
                opacity: 1;
                color: var(--color-primary);
            }

            /* Subrayado animado PREMIUM */
            &::after {
                content: '';
                position: absolute;
                bottom: -5px; 
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 2px;
                background-color: var(--color-primary);
                transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            &:hover::after {
                width: 80%; 
            }
        }

        /* BOTONES DE CONTACTO */
        .contact-button {
            color: white; 
            font-size: 0; 
            width: 35px; 
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 0.4rem; 
            border-radius: 50%; 
            background-color: transparent; 
            transition: background-color 0.3s ease; 
            
            &:hover {
                 box-shadow: 0 0 0 1px var(--hover-color), 0 0 5px var(--hover-color);
            }
            
            /* SVG (Instagram) */
            & :global(svg) {
                stroke: white; 
                fill: none; 
                width: 18px;
                height: 18px;
                transition: stroke 0.3s ease;
            }
            &:hover :global(svg) {
                stroke: var(--hover-color); 
            }

            /* IMAGEN (WhatsApp) */
            .icon-img {
                width: 20px;
                height: 20px;
                filter: grayscale(100%) brightness(200%); 
                transition: filter 0.3s ease;
            }
            &:hover .icon-img {
                filter: none; 
            }
        } 
    } 
    /* Cierre del .main-header principal */


    /* ---------------------------------------------------- */
    /* 3. CTA BUTTON - REDUCIDO Y CON EFECTO DE BRILLO */
    /* ---------------------------------------------------- */
    @keyframes shine {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }

    .cta-button {
        background-color: var(--color-primary); 
        color: var(--color-background); 
        font-size: 0.95rem; /* TAMAÑO DE FUENTE LIGERAMENTE MÁS PEQUEÑO */
        font-weight: 700; 
        padding: 0.55rem 1.2rem; /* PADDING REDUCIDO */
        border-radius: 8px; 
        transition: all 0.2s ease;
        
        box-shadow: 0 4px 10px rgba(73, 228, 176, 0.5), /* SOMBRA REDUCIDA */
                    0 0 0 1px rgba(73, 228, 176, 0.2); 

        /* Efecto de Brillo (Shiny) - Mantenido */
        position: relative;
        overflow: hidden;
        
        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                120deg, 
                transparent 30%, 
                rgba(255, 255, 255, 0.5), 
                transparent 70%
            );
            transition: background-position 0.8s ease-in-out;
            background-size: 200% 100%;
            background-position: -200% 0; 
        }

        &:hover {
            background-color: #3ec99b; 
            transform: translateY(-1px); /* Menos elevación */
            box-shadow: 0 6px 15px rgba(73, 228, 176, 0.8); /* Sombra de hover reducida */
            
            &::after {
                animation: shine 0.8s ease-in-out forwards;
            }
        }
    }

    /* ---------------------------------------------------- */
    /* 4. FOOTER */
    /* ---------------------------------------------------- */
    .main-footer {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
        font-size: 0.85rem;
        color: var(--color-text-muted);
    }
</style>