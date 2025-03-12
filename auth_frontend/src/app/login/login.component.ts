import { Component } from '@angular/core';
import { AuthenticationService } from '../Service/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../AuthenticationRequest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SuccessComponent } from '../success/success.component';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private authService: AuthenticationService, private router: Router,private auth: UserService) {}

  login(event: Event) {
  
    const request: AuthenticationRequest = {
      email: this.email,
      password: this.password
    };
  
    this.authService.authenticate(request).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('accessToken', response.token);
          console.log('Connexion réussie!', response);
          this.auth.getCurrentUser();
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        alert('Email ou mot de passe incorrect !');
      }
    });
  }
  
}
