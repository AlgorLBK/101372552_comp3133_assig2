import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { LOGIN } from '../graphql/graphql.queries';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userDetails: any = {}
  userForm = new FormGroup({
    usernameOrEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {
    // this.route.params.subscribe((params) => {
    //   const id = params['employeeID'];
    //   // this.searchEmployeeById(id);
    // })
  }

  ngOnInit(): void {}

  login() {
    this.apollo.query({
      query: LOGIN,
      variables: {
        usernameOrEmail: this.userForm.value.usernameOrEmail,
        password: this.userForm.value.password
      }
    }).subscribe(({ data }: any) => {
      alert('Login Successful');
      this.userDetails = data.login;
      this.userForm.reset()
      this.router.navigate(['/list'])
    }, (error) => {
      alert("User name or password incorrect !")
      console.log("Error: " + error)
    })
  }
}