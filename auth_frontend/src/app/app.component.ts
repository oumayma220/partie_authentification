import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './Service/user.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './Service/authentication.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,CommonModule, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auth_frontend';
  isAuthenticated = false;
  constructor( private userService: UserService, private router: Router) {}
 
  

    logout(): void {
      this.userService.logout();
    }
}
