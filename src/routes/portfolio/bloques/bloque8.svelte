<script lang="ts">
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';
    import type { Action } from 'svelte/action';

    const scrollObserverAction = getContext<Action<HTMLElement>>('scrollObserverAction');

    export let featuredCases: any[];

    let selectedFilter = 'todos';
    let filteredCases = featuredCases;

    const filters = [
        { id: 'todos', label: 'Todos los Proyectos', icon: 'fas fa-th-large' },
        { id: 'corporativo', label: 'Webs Corporativas', icon: 'fas fa-building' },
        { id: 'ecommerce', label: 'E-commerce', icon: 'fas fa-shopping-cart' },
        { id: 'landing', label: 'Landing Pages', icon: 'fas fa-bullseye' },
        { id: 'restaurante', label: 'Restaurantes', icon: 'fas fa-utensils' },
        { id: 'blog', label: 'Blogs', icon: 'fas fa-blog' },
        { id: 'creativo', label: 'Creativos', icon: 'fas fa-palette' }
    ];

    function filterCases(filterId: string) {
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

    onMount(() => {
        filterCases('todos');
    });
</script>

<section class="section portfolio-filter-section">
    <div class="content-wrapper" use:scrollObserverAction>
        <div class="filter-header">
            <h2 class="section-title">Nuestros Casos de Éxito</h2>
            <p class="section-subtitle">Explora nuestros proyectos más destacados por categoría</p>
        </div>

        <!-- Filter Buttons -->
        <div class="filter-buttons animate-on-scroll">
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
        <div class="portfolio-grid animate-on-scroll">
            {#each filteredCases as caseItem, index}
                <div class="portfolio-card" style="animation-delay: {index * 0.1}s">
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

<style>
    .portfolio-filter-section {
        padding: 5rem 0;
        background: rgba(255,255,255,0.02);
    }

    .filter-header {
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
        font-size: 0.9rem;
    }

    .filter-btn:hover {
        background: rgba(73, 228, 176, 0.1);
        border-color: rgba(73, 228, 176, 0.3);
        transform: translateY(-2px);
    }

    .filter-btn.active {
        background: linear-gradient(135deg, rgba(73,228,176,1) 0%, rgba(20,184,166,1) 100%);
        border-color: var(--color-primary);
        color: var(--color-background);
        box-shadow: 0 10px 30px rgba(73, 228, 176, 0.3);
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

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .portfolio-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 20px;
        overflow: hidden;
        transition: all 0.3s ease;
        opacity: 0;
        animation: fadeInUp 0.6s ease forwards;
    }

    .portfolio-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 60px rgba(73, 228, 176, 0.15);
        border-color: rgba(73, 228, 176, 0.3);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
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

    .portfolio-card:hover .card-image img {
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

    .portfolio-card:hover .card-overlay {
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

    @media (max-width: 768px) {
        .filter-buttons {
            justify-content: center;
        }

        .filter-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
        }

        .portfolio-grid {
            grid-template-columns: 1fr;
        }

        .card-header {
            flex-direction: column;
            gap: 1rem;
        }

        .card-tag {
            align-self: flex-start;
            margin-left: 0;
        }

        .section-title {
            font-size: 2rem;
        }
    }
</style>