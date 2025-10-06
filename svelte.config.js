import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Preprocesadores: Esencial para que SvelteKit entienda TypeScript en archivos .svelte
    preprocess: vitePreprocess(),

    kit: {
        // Adaptador: Define cómo se construye y se aloja la aplicación
        adapter: adapter(),
        
        // Alias: Define alias para importaciones, asegurando que TypeScript y SvelteKit
        // puedan resolver rutas como "$lib", lo que indirectamente ayuda a resolver "$app/*".
        alias: {
            '$components': 'src/lib/components',
            '$lib': 'src/lib',
            '$routes': 'src/routes'
        },
        
        // Prerender: Asegura que SvelteKit maneje correctamente la estructura de archivos
        prerender: {
            entries: ['*']
        }
    }
};

export default config;
