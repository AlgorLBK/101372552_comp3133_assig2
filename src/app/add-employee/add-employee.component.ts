import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ADD_EMPLOYEE, GET_EMPLOYEES } from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { error } from 'console';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  employees: any[] = [];

  employeeForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
  });

  constructor(private apollo: Apollo, private router: Router) { }
  
  ngOnInit(): void{}

  addEmployee() {
    this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        first_name: this.employeeForm.value.first_name,
        last_name: this.employeeForm.value.last_name,
        email: this.employeeForm.value.email,
        gender: this.employeeForm.value.gender,
        salary: parseFloat(this.employeeForm.value.salary || '')
      },
      refetchQueries: [{
        query: GET_EMPLOYEES
      }]
    }).subscribe(({ data }: any) => {
      this.employees = data.addEmployee;
      this.router.navigate(['/list'])
      this.employeeForm.reset()
    }, (error) => {
      console.log("Error: " + error)
    })
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
