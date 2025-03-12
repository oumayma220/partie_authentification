import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder, private authService: AuthenticationService,private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    
    
  }

  onRegister() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.authService.registerClient(this.registerForm.value).subscribe(
        (response) => {
          console.log('Client registered successfully', response);
            this.router.navigate(['/activate']);
          // Redirection ou message de succès
        },
        (error) => {
          console.error('Error registering client', error);
          // Gestion des erreurs
        }
      );
    }
  }
}
