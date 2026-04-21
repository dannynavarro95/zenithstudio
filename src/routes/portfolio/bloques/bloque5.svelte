<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    const testimonials = [
        {
            name: 'María García',
            role: 'Propietaria, Ribapizza.es',
            company: 'Restaurante Ribapizza',
            content: 'El sitio web que nos crearon ha revolucionado nuestro negocio. Las reservas online han aumentado un 300% y nuestros clientes ahora pueden ver el menú y hacer pedidos desde casa.',
            avatar: '👩‍🍳',
            rating: 5
        },
        {
            name: 'Carlos Rodríguez',
            role: 'CEO',
            company: 'TechFlow Solutions',
            content: 'Profesionalismo excepcional. Entregaron el proyecto en tiempo récord y el resultado superó todas nuestras expectativas. Nuestra presencia online ahora refleja la calidad de nuestros servicios.',
            avatar: '👨‍💼',
            rating: 5
        },
        {
            name: 'Ana López',
            role: 'Marketing Manager',
            company: 'Nova Commerce',
            content: 'La landing page que diseñaron para nuestro lanzamiento generó más leads en la primera semana que en los 6 meses anteriores. El diseño es moderno y las conversiones son impresionantes.',
            avatar: '👩‍💻',
            rating: 5
        }
    ];
</script>

<section class="section testimonials-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="section-header">
            <h2 class="section-title">Lo que dicen nuestros clientes</h2>
            <p class="section-subtitle">Testimonios reales de proyectos exitosos</p>
        </div>

        <div class="testimonials-grid">
            {#each testimonials as testimonial}
                <div class="testimonial-card animate-on-scroll">
                    <div class="testimonial-rating">
                        {#each Array(testimonial.rating) as _}
                            <i class="fas fa-star"></i>
                        {/each}
                    </div>
                    <blockquote class="testimonial-content">
                        "{testimonial.content}"
                    </blockquote>
                    <div class="testimonial-author">
                        <div class="author-avatar">{testimonial.avatar}</div>
                        <div class="author-info">
                            <div class="author-name">{testimonial.name}</div>
                            <div class="author-role">{testimonial.role}</div>
                            <div class="author-company">{testimonial.company}</div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .testimonials-section {
        padding: 5rem 0;
        background: rgba(255,255,255,0.02);
    }

    .section-header {
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

    .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .testimonial-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        padding: 2rem;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .testimonial-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(73, 228, 176, 0.1);
    }

    .testimonial-rating {
        color: #ffd700;
        margin-bottom: 1rem;
    }

    .testimonial-content {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--color-text-light);
        margin-bottom: 1.5rem;
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
        background: linear-gradient(135deg, rgba(73,228,176,0.2), rgba(0,191,255,0.2));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
    }

    .author-info {
        flex: 1;
    }

    .author-name {
        font-weight: 700;
        color: var(--color-text-light);
        margin-bottom: 0.25rem;
    }

    .author-role {
        font-size: 0.9rem;
        color: var(--color-primary);
        font-weight: 600;
    }

    .author-company {
        font-size: 0.85rem;
        color: var(--color-text-muted);
    }

    @media (max-width: 768px) {
        .testimonials-grid {
            grid-template-columns: 1fr;
        }

        .section-title {
            font-size: 2rem;
        }
    }
</style>