import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

// El decorador @Component es la "etiqueta" que define a este archivo como un componente de Angular.
@Component({
  selector: 'app-login', // Nombre que usaríamos si quisiéramos meter esto dentro de otro HTML
  imports: [RouterLink, ReactiveFormsModule], // Módulos que necesita este componente para funcionar
  templateUrl: './login.html', // Dónde está su cuerpo visual
  styleUrl: './login.css', // Dónde está su ropa (estilos)
})
export class Login {
  // Inyección de dependencias (pedimos herramientas a Angular)
  private fb = inject(FormBuilder); // Constructor de formularios mágicos (reactivos)
  private authService = inject(AuthService); // Nuestro cartero para hablar con NestJS
  private router = inject(Router); // El volante para navegar entre pantallas (cambiar la URL)

  // Definimos la estructura y reglas de nuestro formulario de Login
  loginForm: FormGroup = this.fb.group({
    // El campo email empieza vacío (''). 
    // Tiene dos reglas (Validators): Es obligatorio, y debe tener formato de email real.
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // Función que se ejecuta cuando el usuario le da al botón "Entrar" o presiona Enter
  onLogin() {
    // Primero, le preguntamos a Angular: ¿El usuario cumplió todas las reglas (Validators)?
    if (this.loginForm.valid) {
      console.log('Enviando datos al backend...', this.loginForm.value);
      
      // Si todo está bien, le pasamos los datos del formulario al cartero (authService)
      // .subscribe() es como decir "me quedo esperando aquí hasta que el backend responda"
      this.authService.login(this.loginForm.value).subscribe({
        // Si el backend responde con un OK (código 200)
        next: (response) => {
          console.log('¡Login Exitoso!', response);
          alert('¡Inicio de sesión exitoso!');
          // this.router.navigate(['/perfil']); // Más adelante habilitaremos esto para llevarlo a su perfil
        },
        // Si el backend nos rechaza (ej: contraseña incorrecta, código 401)
        error: (err) => {
          console.error('Error en el login', err);
          alert('Error al iniciar sesión. Revisa tus credenciales.');
        }
      });
    } else {
      // Si intentó engañarnos y el formulario no es válido
      alert('Por favor, completa los campos correctamente.');
    }
  }
}
