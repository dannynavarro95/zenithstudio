<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    export let projectTypes: { label: string; description: string; accent: string; icon: string }[] = [];
    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');
</script>

<section class="section portfolio-types-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="section-heading">
            <h2>Tipos de soluciones web que entregamos</h2>
            <p class="section-subtitle">
                Desde webs en producción hasta landing pages y ecommerce, cada proyecto se construye con enfoque comercial y visual profesional.
            </p>
        </div>

        <div class="types-grid">
            {#each projectTypes as type}
                <article class="type-card animate-on-scroll">
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

<style>
    .portfolio-types-section {
        padding-top: 5rem;
        padding-bottom: 5rem;
        background: var(--color-background);
    }

    .types-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(220px, 1fr));
        gap: 1.5rem;
    }

    .type-card {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 2rem;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        transition: transform 0.25s ease, border-color 0.25s ease;
    }

    .type-card:hover {
        transform: translateY(-5px);
        border-color: rgba(73,228,176,0.25);
    }

    .type-icon {
        width: 58px;
        height: 58px;
        border-radius: 18px;
        display: grid;
        place-items: center;
        font-size: 1.3rem;
        color: #0B0E14;
    }

    .type-icon.green { background: #49E4B0; }
    .type-icon.yellow { background: #F5C343; }
    .type-icon.blue { background: #33B7FF; }

    .type-card h3 {
        margin: 0;
        font-size: 1.45rem;
    }

    .type-card p {
        color: var(--color-text-muted);
        line-height: 1.9;
        margin: 0;
    }

    @media (max-width: 980px) {
        .types-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
