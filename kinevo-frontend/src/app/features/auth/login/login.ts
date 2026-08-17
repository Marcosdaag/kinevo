import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Inyección de dependencias (pedimos herramientas a Angular)
  private fb = inject(FormBuilder); // Constructor de formularios mágicos (reactivos)
  private authService = inject(AuthService); // Nuestro cartero para hablar con NestJS
  private router = inject(Router); // El volante para navegar entre pantallas (cambiar la URL)

  // Definimos la estructura y reglas de nuestro formulario de Login
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Enviando datos al backend...', this.loginForm.value);

      // .subscribe() es como decir "me quedo esperando aquí hasta que el backend responda"
      this.authService.login(this.loginForm.value).subscribe({
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
