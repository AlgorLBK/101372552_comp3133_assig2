import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { REGISTER_USER } from '../graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: any[] = []

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private apollo: Apollo, private router: Router) { }
  
  ngOnInit(): void{ }
  
  addUser() {
    this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      }
    }).subscribe(({ data }: any) => {
      this.user = data.signup;
      this.userForm.reset()
    }, (error) => {
      alert("Username or email already used !")
      console.log("Error: " + error)
    })
  }

}
