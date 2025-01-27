import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  errorMessage!: string;
  isLoading:boolean=false

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),
    });
  }

  handleLogin() {
    this.isLoading=true
    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    this.auth.login(username,password,()=>{
      this.isLoading=false
      
      this.router.navigateByUrl('/admin')

    })
  }
   
}
