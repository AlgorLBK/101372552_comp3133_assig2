import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { UPDATE_EMPLOYEE, GET_EMPLOYEES } from '../graphql/graphql.queries';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  employee: any[] = []
  id: string = ''

  employeeForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private apollo: Apollo, private router:Router) {
    this.route.params.subscribe((params) => {
      const id = params['employeeID'];
      this.id = id
    })
  }
  
  ngOnInit(): void{ }
  
  updateEmployee() {
    this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id: this.id,
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
      this.employee = data.addEmployee;
      this.employeeForm.reset()
      this.router.navigate([''])
    }, (error) => {
      console.log("Error: " + error)
    })
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
