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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Enviando datos al backend...', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('¡Login Exitoso!', response);
          alert('¡Inicio de sesión exitoso!');
          // this.router.navigate(['/']); // Redirigir al perfil luego
        },
        error: (err) => {
          console.error('Error en el login', err);
          alert('Error al iniciar sesión. Revisa tus credenciales.');
        }
      });
    } else {
      alert('Por favor, completa los campos correctamente.');
    }
  }
}
