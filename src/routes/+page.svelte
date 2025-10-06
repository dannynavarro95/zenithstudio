<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  
  // Usamos onMount para asegurar que la redirección solo ocurre en el navegador (cliente)
  onMount(() => {
    // Redirige automáticamente a /inicio. 
    // Usamos 'replaceState: true' para que el botón de 'atrás' del navegador no regrese a esta página vacía.
    goto('/inicio', { replaceState: true });
  });
</script>

<svelte:head>
    <title>Redirigiendo...</title>
</svelte:head>

<!-- El contenido de esta página es irrelevante ya que siempre redirige -->
<div class="flex justify-center items-center min-h-screen text-lg text-white">
    <!-- El texto se muestra brevemente antes de la redirección -->
    Redirigiendo a la página de inicio...
</div>

<style>
    /* Aseguramos que el div de carga ocupe toda la pantalla */
    .min-h-screen {
        min-height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-background);
    }
</style>
