import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },
    { path: 'list', component: EmployeeListComponent },
    { path: 'employee/:employeeID', component: EmployeeDetailsComponent },    
    { path: 'add', component: AddEmployeeComponent },
    { path: 'update/:employeeID', component: UpdateEmployeeComponent}
];
