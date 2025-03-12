import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../Service/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // facultatif pour icônes
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // pour les notifications

@Component({
  selector: 'app-request-reset-code',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule],
  templateUrl: './request-reset-code.component.html',
  styleUrl: './request-reset-code.component.css'
})
export class RequestResetCodeComponent {
  resetCodeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetCodeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetCode() {
    if (this.resetCodeForm.invalid) {
      return;
    }

    const email = this.resetCodeForm.value.email;

    this.authenticationService.sendResetCode(email).subscribe({
      next: () => {
        localStorage.setItem('resetEmail', email);
        this.snackBar.open('Code envoyé avec succès !', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/resetpassword']);
      },
      error: () => {
        this.snackBar.open("Erreur lors de l'envoi du code.", 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}