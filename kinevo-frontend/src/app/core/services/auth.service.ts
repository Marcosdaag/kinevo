import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable significa que esta clase es un "Servicio" que se puede inyectar
// en cualquier componente que lo necesite (como el Login o el Register).
// 'providedIn: root' significa que hay una única instancia de este cartero en toda la app (Singleton).
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // inject() es la forma moderna de pedirle a Angular que nos traiga una herramienta.
  // Aquí traemos el HttpClient, que es nuestro "cartero" para hacer peticiones por internet.
  private http = inject(HttpClient);
  
  // La URL base de nuestra API en NestJS
  private apiUrl = 'http://localhost:3000/auth';

  // Función para iniciar sesión. Recibe el email y contraseña.
  // Devuelve un 'Observable', que es la versión avanzada de las Promesas en Angular.
  login(credentials: any): Observable<any> {
    // Hace una petición POST a http://localhost:3000/auth/login enviando las credenciales
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Función para crear una cuenta.
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
