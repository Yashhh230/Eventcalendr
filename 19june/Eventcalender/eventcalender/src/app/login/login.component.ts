import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
 * this is the formGroup
 */
  loginForm!: any
  forPass = true
  pass='password'
  submitted = false;
  subscribe:any
  
  constructor(public route : Router , public main : LoginService) {
    
  }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl('',Validators.required)
    })
  }
  /**
  * this will for password show and hid
  */
  myFunction() {
    this.forPass = !this.forPass
    if (this.forPass == true) {
      this.pass = "password"
    }
    else {
      this.pass = "text"
    }
  }
  
  /**
   * if the form is valid then it can submit it and send data to login api 
   * and redirect to another page 
   */
  forSubmit() {
  
    this.submitted = true
    if (this.loginForm.valid) {
      this.main.onLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.main.setLocalStorage(res)
          this.route.navigate(['/dashboard']);
        },
        error: (err: any) => {
          alert(err.error.message)
        },
        complete: () => {
  
        }
      })
    }
  
    }
}
