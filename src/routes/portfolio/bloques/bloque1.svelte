<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');
</script>

<section class="section strategy-section" id="tipos">
    <div class="content-wrapper" use:scrollObserverAction>
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

<style>
    .strategy-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background: linear-gradient(180deg, rgba(11, 14, 20, 0.98) 0%, rgba(27, 30, 41, 0.98) 100%);
    }

    .section-heading {
        max-width: 860px;
        margin: 0 auto 3rem;
        text-align: center;
    }

    .strategy-grid {
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(3, minmax(240px, 1fr));
    }

    .strategy-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 2.2rem;
        min-height: 320px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .strategy-card:hover {
        transform: translateY(-6px);
        border-color: rgba(73,228,176,0.3);
        box-shadow: 0 26px 80px rgba(0, 0, 0, 0.22);
    }

    .strategy-dot {
        width: 52px;
        height: 52px;
        border-radius: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        color: var(--color-background);
        font-size: 1rem;
    }

    .strategy-dot.green { background: #49E4B0; }
    .strategy-dot.yellow { background: #F5C343; color: #111; }
    .strategy-dot.blue { background: #33B7FF; }

    .strategy-card h3 {
        font-size: 1.45rem;
        margin: 0;
    }

    .strategy-card p {
        color: var(--color-text-muted);
        line-height: 1.9;
        margin: 0;
        flex-grow: 1;
    }

    @media (max-width: 980px) {
        .strategy-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
