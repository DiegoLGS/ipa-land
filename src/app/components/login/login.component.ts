import { Component, inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiRequestService } from '../../services/api-request.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router: Router = inject(Router);
  apiRequestService: ApiRequestService = inject(ApiRequestService);
  authService: AuthService = inject(AuthService);
  fb = inject(FormBuilder)

  formGroup: FormGroup;
    errorMessage: string = "";

  constructor() {
    this.formGroup = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn(): void {
    if (this.formGroup.invalid) {
      this.errorMessage = this.getErrorMessage();
      return;
    }

    const { username, password } = this.formGroup.value;
    this.errorMessage = '';

    this.apiRequestService.login(username, password).subscribe((response: { success: boolean; message?: string }) => {
      if(response.success) {
        this.authService.logUser();

        this.router.navigate(['/panel']); 
          
      } else {
        this.errorMessage = response.message || 'Error de autenticación';
      }
    })
  }

  getErrorMessage(): string {
    const usernameControl = this.formGroup.get('username');
    const passwordControl = this.formGroup.get('password');

    if (usernameControl?.hasError('required')) {
      return 'El campo "Usuario" es obligatorio.';
    }

    if (passwordControl?.hasError('required')) {
      return 'El campo "Contraseña" es obligatorio.';
    }

    if (passwordControl?.hasError('minlength')) {
      const minLength = passwordControl.getError('minlength').requiredLength;
      return `La contraseña debe tener al menos ${minLength} caracteres.`;
    }

    return 'Por favor, verifica los campos del formulario.';
  }
}