<script lang="ts">
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    const stats = [
        { number: '50+', label: 'Webs entregadas', icon: 'fas fa-globe' },
        { number: '98%', label: 'Clientes satisfechos', icon: 'fas fa-smile' },
        { number: '24h', label: 'Tiempo de entrega', icon: 'fas fa-clock' },
        { number: '100%', label: 'Proyectos en producción', icon: 'fas fa-rocket' }
    ];
</script>

<section class="section stats-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="stats-grid">
            {#each stats as stat}
                <div class="stat-card animate-on-scroll">
                    <div class="stat-icon">
                        <i class={stat.icon}></i>
                    </div>
                    <div class="stat-number">{stat.number}</div>
                    <div class="stat-label">{stat.label}</div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    .stats-section {
        padding: 4rem 0;
        background: linear-gradient(135deg, rgba(73, 228, 176, 0.05), rgba(0, 191, 255, 0.05));
        border-top: 1px solid rgba(255,255,255,0.08);
        border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .stat-card {
        text-align: center;
        padding: 2rem 1rem;
        background: rgba(255,255,255,0.03);
        border-radius: 20px;
        border: 1px solid rgba(255,255,255,0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(73, 228, 176, 0.1);
    }

    .stat-icon {
        width: 60px;
        height: 60px;
        margin: 0 auto 1rem;
        background: linear-gradient(135deg, rgba(73,228,176,0.2), rgba(0,191,255,0.2));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--color-primary);
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--color-primary), #00BFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .stat-label {
        font-size: 0.9rem;
        color: var(--color-text-muted);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
        }

        .stat-card {
            padding: 1.5rem 1rem;
        }

        .stat-number {
            font-size: 2rem;
        }
    }
</style>