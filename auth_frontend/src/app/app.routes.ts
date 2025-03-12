import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { RequestResetCodeComponent } from './request-reset-code/request-reset-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ActivateComponent } from './activate/activate.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { adminGuard } from './Guard/admin.guard';
import { notLoggedInGuard } from './Guard/not-logged-in.guard';
import { ClienthomeComponent } from './clienthome/clienthome.component';
import { employeeGuard } from './Guard/employee.guard';
import { CrudemployeeComponent } from './crudemployee/crudemployee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

export const routes: Routes = [
{
    path:'home',
    title: 'Home',
    component: HomeComponent,
},
{
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
},
{
    path:'login',
    title:'Login',
    component: LoginComponent,
    canActivate: [notLoggedInGuard],  

},
{
    path:'success',
    title:'Success',
    component: SuccessComponent,
    canActivate: [employeeGuard],  

},
{
    path:'requestresetcode',
    title:'requestresetcode',
    component: RequestResetCodeComponent,
    canActivate: [notLoggedInGuard],  

},
{
    path:'resetpassword',
    title:'Resetpassword',
    component:ResetPasswordComponent,
    canActivate: [notLoggedInGuard],  

},
{
    path:'registeruser',
    title:'Registeruser',
    component:RegisterUserComponent,
    canActivate: [notLoggedInGuard],  

},
{
    path:'activate',
    title:'Activate',
    component:ActivateComponent,
    canActivate: [notLoggedInGuard],  

},
{
    path:'addemployee',
    title:'AddEmployee',
    component:AddEmployeeComponent,
    canActivate: [adminGuard],  

},
{
    path:'adminhome',
    title:'AdminHome',
    component:AdminhomeComponent,
    canActivate: [adminGuard],
    children: [
        { path: 'crudemployee', component: CrudemployeeComponent },
        { path:'addemployee', component:AddEmployeeComponent},
        { path:'editemployee', component:EditEmployeeComponent}

      ] 
},
{
    path:'clienthome',
    title:'ClientHome',
    component:ClienthomeComponent,
},
// {
//     path:'crudemployee',
//     title:'Crudemployee',
//     component:CrudemployeeComponent,
// },


];
