import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,
     ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    const { code, newPassword } = this.resetPasswordForm.value;
    
    this.authenticationService.resetPassword(code, newPassword).subscribe({
      next: () => {
        alert("Mot de passe réinitialisé avec succès !");
        this.router.navigate(['/login']); // Rediriger vers la page de connexion après réinitialisation
      },
      error: () => {
        alert("Erreur lors de la réinitialisation du mot de passe.");
      }
    });
  }
}