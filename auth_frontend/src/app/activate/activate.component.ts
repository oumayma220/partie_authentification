import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.css'
})
export class ActivateComponent {
  token: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthenticationService,private router: Router) {}

  activateAccount() {
    if (!this.token.trim()) {
      this.message = "Le token ne peut pas être vide.";
      this.isSuccess = false;
      return;
    }

    this.authService.activateAccount(this.token).subscribe(
      response => {
        this.message = "Votre compte a été activé avec succès ! 🎉";
        this.isSuccess = true;
        this.router.navigate(['/login']);

      },
      error => {
        this.message = "Token invalide ou expiré. Veuillez réessayer.";
        this.isSuccess = false;
      }
    );
  }
}