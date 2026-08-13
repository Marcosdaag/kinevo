import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

// Este es el "Panel de Control Global" de toda la aplicación Angular.
// Reemplaza al antiguo app.module.ts de versiones anteriores.
export const appConfig: ApplicationConfig = {
  // 'providers' es la lista de herramientas o servicios que estarán disponibles globalmente.
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Mejora el rendimiento agrupando eventos para no sobrecargar el navegador
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Le decimos a Angular que use las rutas que definimos en app.routes.ts
    provideRouter(routes),
    // Habilitamos HttpClient para que cualquier componente pueda hacer peticiones a internet (ej: a NestJS)
    // 'withFetch' hace que use la API nativa de JavaScript, haciéndolo más moderno y rápido.
    provideHttpClient(withFetch())
  ]
};
