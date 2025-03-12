import { Component } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationRequest } from '../RegistrationRequest';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,  
    MatInputModule,      
    MatButtonModule,
       MatCardModule,
      MatButtonModule ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
 

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.adminService.registerEmployee(this.employeeForm.value).subscribe({
        next: () => {
          this.dialogRef.close(); 
        },
        error: (err) => console.error('Erreur lors de l\'ajout', err)
      });
    }
  }

  onCancel() {
    this.dialogRef.close(); 
  }
}
