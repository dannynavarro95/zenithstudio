# Instrucciones para Agentes de IA en el Proyecto Zenith Studio

## Arquitectura del Proyecto
Zenith Studio es un proyecto basado en SvelteKit, diseñado para crear aplicaciones web modernas y de alto rendimiento. La estructura principal incluye:

- **`src/routes`**: Contiene las páginas y bloques organizados por rutas.
  - Ejemplo: `inicio`, `servicios`, `contacto`.
- **`src/lib`**: Componentes reutilizables y utilidades.
  - Ejemplo: `TypewriterText.svelte`.
- **`static`**: Archivos estáticos como imágenes y configuraciones.
- **Configuraciones**: Archivos como `vite.config.ts`, `eslint.config.js`, y `tsconfig.json`.

## Flujos de Trabajo Clave

### Desarrollo
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Formatear y verificar el código:
   ```bash
   npm run format
   npm run lint
   ```

### Construcción y Despliegue
1. Construir la aplicación para producción:
   ```bash
   npm run build
   ```
2. Previsualizar la construcción:
   ```bash
   npm run preview
   ```

## Convenciones del Proyecto

### Estilo de Código
- **Prettier** y **ESLint** están configurados para mantener un estilo de código consistente.
- Los archivos `.svelte` tienen configuraciones específicas en `.prettierrc`.

### Componentes
- Los componentes reutilizables están en `src/lib`.
- Los bloques específicos de página están en subdirectorios bajo `src/routes`.

### Animaciones y Efectos
- Se utilizan `IntersectionObserver` y clases CSS para animaciones de entrada.
- Ejemplo: `scrollObserverAction` en `+layout.svelte`.

## Puntos de Integración
- **Dependencias externas**:
  - `svelte-typewriter`: Para efectos de texto animado.
  - `font-awesome`: Para íconos.
- **Contexto compartido**:
  - `scrollObserverAction` se pasa a través de `setContext` para animaciones de scroll.

## Ejemplos de Patrones

### Uso de `scrollObserverAction`
```svelte
<script>
  import { getContext } from 'svelte';
  const scrollObserverAction = getContext('scrollObserverAction');
</script>

<div use:scrollObserverAction>
  <!-- Contenido animado -->
</div>
```

### Configuración de un Hero con Fondo
```svelte
<section class="hero-section">
  <div class="hero-background">
    <img src="/images/hero-background.jpg" alt="Background Image">
  </div>
  <div class="container">
    <h1 class="hero-title">Título</h1>
    <p class="hero-subtitle">Subtítulo</p>
  </div>
</section>
```

## Notas Adicionales
- **Rutas dinámicas**: Usa `+page.svelte` para definir páginas específicas.
- **Estilos globales**: Configurados en `src/app.css`.

Si tienes dudas o necesitas más contexto, revisa los archivos relevantes o pregunta directamente.