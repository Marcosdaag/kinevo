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
  // Pedimos nuestras herramientas mágicas a Angular (Inyección de Dependencias)
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Definimos las reglas para crear una cuenta
  registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required], // El nombre no puede estar vacío
    lastName: ['', Validators.required],  // El apellido tampoco
    // El email debe estar lleno y además tener formato de correo (@)
    email: ['', [Validators.required, Validators.email]],
    // La contraseña debe estar llena y tener AL MENOS 6 caracteres
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onRegister() {
    // Si el usuario cumplió todas las reglas anteriores...
    if (this.registerForm.valid) {
      console.log('Enviando datos al backend...', this.registerForm.value);
      
      // Llamamos a la función register() de nuestro cartero y le pasamos los datos
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('¡Registro Exitoso!', response);
          alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
          // Si todo salió bien, lo mandamos automáticamente a la pantalla de Login
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro', err);
          // Esto puede fallar si el email ya existe en la base de datos, por ejemplo
          alert('Error al crear la cuenta. Intenta con otro email.');
        }
      });
    } else {
      // Si falta rellenar algo o la contraseña es muy corta
      alert('Por favor, completa los campos correctamente.');
    }
  }
}
