import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Enviando datos al backend...', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('¡Registro Exitoso!', response);
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro', err);
          alert('Error al crear la cuenta. Intenta con otro email.');
        }
      });
    } else {
      alert('Por favor, completa los campos correctamente.');
    }
  }
}
