<script lang="ts">
    import { getScrollObserverAction } from '$lib/scrollObserverContext';

    const observeSections = getScrollObserverAction();
    
    let name = '';
    let email = '';
    let projectDetails = '';
    let message = '';
    let isSubmitting = false;

    // Función mock para manejar el envío del formulario
    function handleSubmit() {
        if (!name || !email || !projectDetails) {
            message = 'Por favor, complete todos los campos requeridos.';
            return;
        }
        
        isSubmitting = true;
        message = 'Enviando...';

        // Simular envío a un backend
        setTimeout(() => {
            isSubmitting = false;
            // Aquí iría la lógica de fetch real
            console.log("Datos enviados:", { name, email, projectDetails });
            message = '¡Gracias! Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto pronto.';
            
            // Limpiar formulario
            name = '';
            email = '';
            projectDetails = '';

        }, 2000);
    }
</script>

<section class="section contact-section" id="contact">
    <div class="content-wrapper">
        <h2 class="section-title animated-content-ratio" use:observeSections>Hablemos de tu <span class="gradient-title">Próximo Gran Proyecto</span></h2>
        <p class="section-subtitle animated-content-ratio" use:observeSections>Estamos listos para transformar tu visión en una realidad digital de alto rendimiento. Cuéntanos más.</p>

        <div class="contact-grid">
            
            <div class="contact-info animated-content-ratio" use:observeSections>
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <h4>Email</h4>
                    <p>contacto@zenithstudio.com</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-phone-alt"></i>
                    <h4>Teléfono</h4>
                    <p>+34 555 123 456</p>
                </div>
                <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <h4>Ubicación</h4>
                    <p>Madrid, España (Atendemos proyectos globales)</p>
                </div>
            </div>

            <form on:submit|preventDefault={handleSubmit} class="contact-form animated-content-ratio" use:observeSections>
                <div class="form-group">
                    <label for="name">Nombre Completo *</label>
                    <input type="text" id="name" required bind:value={name} placeholder="Tu nombre o el de tu empresa">
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required bind:value={email} placeholder="ejemplo@dominio.com">
                </div>

                <div class="form-group full-width">
                    <label for="projectDetails">Detalles del Proyecto *</label>
                    <textarea id="projectDetails" required bind:value={projectDetails} rows="5" placeholder="¿Qué necesitas? (Web, App, API, Consultoría, etc.)"></textarea>
                </div>

                <button type="submit" class="submit-button" disabled={isSubmitting}>
                    {#if isSubmitting}
                        Enviando...
                    {:else}
                        Enviar Solicitud
                    {/if}
                </button>
                
                {#if message}
                    <p class="form-message" class:success={message.includes('éxito')}>{message}</p>
                {/if}
            </form>
        </div>
    </div>
</section>

<style>
    .contact-section {
        background-color: var(--color-surface);
        padding-top: 8rem;
        padding-bottom: 8rem;
    }
    
    .contact-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4rem;
    }
    
    @media (min-width: 900px) {
        .contact-grid {
            grid-template-columns: 1fr 1.5fr;
        }
    }

    /* --- INFO --- */
    .contact-info {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 1.5rem;
        border-right: 1px solid rgba(73, 228, 176, 0.1);
        border-radius: 8px;
    }

    @media (max-width: 899px) {
         .contact-info {
             border-right: none;
             border-bottom: 1px solid rgba(73, 228, 176, 0.1);
         }
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .info-item i {
        font-size: 1.8rem;
        color: var(--color-primary);
        margin-bottom: 0.5rem;
    }
    
    .info-item h4 {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--color-text-light);
    }
    
    .info-item p {
        color: var(--color-text-muted);
    }

    /* --- FORM --- */
    .contact-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }
    
    .form-group.full-width {
        grid-column: 1 / -1;
    }

    .contact-form label {
        font-size: 0.9rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: var(--color-text-light);
    }

    .contact-form input,
    .contact-form textarea {
        background-color: #0F121A; 
        border: 1px solid #282C3A;
        padding: 12px;
        border-radius: 6px;
        color: var(--color-text-light);
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .contact-form input:focus,
    .contact-form textarea:focus {
        border-color: var(--color-primary);
        outline: none;
    }
    
    .submit-button {
        grid-column: 1 / -1;
        background: linear-gradient(90deg, var(--color-primary) 0%, #00BFFF 100%);
        color: var(--color-background);
        padding: 15px 25px;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.3s ease, transform 0.3s ease;
        margin-top: 1rem;
    }
    
    .submit-button:hover:not([disabled]) {
        opacity: 0.9;
        transform: translateY(-2px);
    }
    
    .submit-button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .form-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 10px;
        border-radius: 6px;
        margin-top: 0.5rem;
        font-size: 1rem;
        color: var(--color-error);
    }
    
    .form-message.success {
        color: var(--color-primary);
        background-color: rgba(73, 228, 176, 0.1);
    }
    
    @media (max-width: 600px) {
        .contact-form {
            grid-template-columns: 1fr;
        }
    }
</style>