import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
export const routes: Routes = [
    { path: 'employee/:employeeID', component: EmployeeDetailsComponent },
    {path: 'employee/add', component: AddEmployeeComponent},
];
