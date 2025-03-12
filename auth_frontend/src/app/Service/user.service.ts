import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../User';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private service: AuthenticationService, private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.getCurrentUser();  
  }
  public getCurrentUser() {
    this.service.getPrincipal().subscribe({
      next: (data) => {
        if (data) {
          this.service.getById(data.id).subscribe({
            next: (user: User) => {
              this.currentUserSubject.next(user);
              console.log("Current User: ", user);
              localStorage.setItem('currentUser', JSON.stringify(user));

              if (user.roles && user.roles.includes('ADMIN')) {
                this._router.navigate(['/adminhome']);
              } 
              else if (user.roles && user.roles.includes('EMPLOYEE')) {
                this._router.navigate(['/success']);
              }
              
              else {
                this._router.navigate(['/clienthome']);
              }
            },
            error: (err) => {
              console.error('Error fetching user by ID', err);
            }
          });
        } else {
          localStorage.clear();
          this.currentUserSubject.next(null);
        }
      },
      error: (err) => {
        console.error('Error fetching principal', err);
      }
    });
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser'); // Supprimer l'utilisateur du localStorage
    this.currentUserSubject.next(null); // Réinitialiser le BehaviorSubject
    this._router.navigate(['/login']);
  }
  
}