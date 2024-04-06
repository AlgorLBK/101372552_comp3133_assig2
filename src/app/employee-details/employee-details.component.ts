import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';

import { SEARCH_EMPLOYEE } from '../graphql/graphql.queries';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  employeeDetails: any = {}

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    this.route.params.subscribe((params) => {
      const id = params['employeeID'];
      console.log("Employee Details for ID : " + id);
      this.searchEmployeeById(id);
    })
  }
    
    ngOnInit(): void {
      console.log("Employee Details")
    }
  
  searchEmployeeById(id: string) {
    this.apollo.query({
      query: SEARCH_EMPLOYEE,
      variables: {
        searchKey: id
      }
    }).subscribe(({ data }: any) => {
      console.log(data.searchEmployeeById);
      this.employeeDetails = data.searchEmployeeById;
    })
    }
}
