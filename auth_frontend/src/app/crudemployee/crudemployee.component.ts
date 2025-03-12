import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../Service/admin.service';
import { User } from '../User';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatPaginatorIntl } from '@angular/material/paginator';




@Component({
  selector: 'app-crudemployee',
  standalone: true,
  imports: [CommonModule,MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule ,
    MatPaginatorModule,
    ],
  templateUrl: './crudemployee.component.html',
  styleUrl: './crudemployee.component.css'
})
export class CrudemployeeComponent implements OnInit {
  displayedColumns: string[] = [ 'firstname', 'lastname', 'email', 'createdDate','actions'];
  employees: User[] = [];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private adminService: AdminService,private dialog: MatDialog) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.adminService.getAllEmployees().subscribe({
      next: (data) => {
        console.log("Données récupérées :", data); // Vérification ici
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator; 
      },      
      error: (err) => console.error('Erreur lors de la récupération des employés', err)
    });
  }
  
  // ✅ Ouvrir le formulaire dans un dialog
  openRegisterDialog() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '400px',
      // height:'600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getEmployees();
    });
  }
  onDisable(employeeId: number) {
    if (confirm('Êtes-vous sûr de vouloir désactiver cet employé ?')) {
      this.adminService.disableEmployee(employeeId).subscribe({
        next: () => {
          this.getEmployees(); 
        },
        error: (err) => console.error('Erreur lors de la désactivation de l\'employé', err)
      });
    }
  }
  openEditDialog(employee: User) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '400px',
      data: employee 
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getEmployees(); 
    });
  }
  
  

}