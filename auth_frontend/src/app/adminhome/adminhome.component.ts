import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { importProvidersFrom } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  RouterLink,
  RouterOutlet],
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent {
  isExpanded = true; // Permet de gérer l'expansion du menu
  constructor(private userService: UserService, private router: Router) {}
  logout(): void {
    this.userService.logout();
  }



}
