import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
export const routes: Routes = [
    { path: '', redirectTo: 'emp', pathMatch: 'full' },
    // { path: '', component: AppComponent },
    { path: 'employee/:employeeID', component: EmployeeDetailsComponent },    
    { path: 'add', component: AddEmployeeComponent },
    { path: 'update/:employeeID', component: UpdateEmployeeComponent}
];
