import { Routes } from '@angular/router';

// Aquí definimos todas las "páginas" o URLs de nuestra aplicación.
export const routes: Routes = [
  {
    // Cuando el usuario entra a localhost:4200/login
    path: 'login',
    // Cargamos el componente Login. Usamos 'loadComponent' en lugar de 'component' 
    // para que se cargue de forma "perezosa" (lazy loading), lo que hace la app más rápida.
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    // Cuando el usuario entra a localhost:4200/register
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    // Si la ruta está totalmente vacía (localhost:4200/)
    path: '',
    // Redirigimos automáticamente al login
    redirectTo: 'login',
    pathMatch: 'full' // Exige que la ruta esté exactamente vacía para aplicar esto
  },
  {
    // Si el usuario escribe cualquier ruta que no existe (ej: /asdfg)
    path: '**',
    // Lo mandamos al login por defecto (luego podemos enviarlo a una página de Error 404)
    redirectTo: 'login'
  }
];
