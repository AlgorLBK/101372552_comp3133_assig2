import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GET_EMPLOYEES, DEL_EMPLOYEE } from './graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '101372552_comp3133_assig2';

  employees: any[] = [];
  error: any;
  
  constructor(private apollo : Apollo, private router:Router){
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  navigateToAddEmployee() {
    this.router.navigate(['/employee/add']);
  }


  getEmployees() {
    this.apollo.watchQuery({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.employees = data.getAllEmployees;
      this.error = error;
    });
  }

  deleteEmployee(id: string) {
    alert(id)
    this.apollo.mutate({
      mutation: DEL_EMPLOYEE,
      variables: {
        employeeId: id
      },
      refetchQueries: [{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({ data }: any) => {
      this.router.navigate(['']);
      this.employees = data.getAllEmployees;
    }, (error) => {
      console.log("Error: " + error);
      this.error = error;
    })
  }
}
