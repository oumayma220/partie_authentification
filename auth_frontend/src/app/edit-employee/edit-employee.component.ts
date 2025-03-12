import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationRequest } from '../RegistrationRequest';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UpdateEmployeeRequest } from '../UpdateEmployeeRequest';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,  
    MatInputModule,      
    MatButtonModule,
    MatCardModule,
    MatButtonModule ,
    MatIconModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.employeeForm = this.fb.group({
      firstname: [this.data.firstname, Validators.required],
      lastname: [this.data.lastname, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployee: UpdateEmployeeRequest = this.employeeForm.value;
      this.adminService.updateEmployee(this.data.id, updatedEmployee).subscribe({
        next: () => {
          this.dialogRef.close(); 
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    }
  }

  onCancel() {
    this.dialogRef.close(); 
  }
}