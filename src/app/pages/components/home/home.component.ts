import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error, log } from 'console';
import { Observable } from 'rxjs';
import { IloginResponse } from 'src/app/core/interfaces/Ilogin-response.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public isLogin = true;
  
  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.min(1), Validators.max(100), Validators.email]],
    password: ['', [Validators.required, Validators.min(6), Validators.max(16)]]
  })
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public formhandler() {
    if (this.isLogin) {
      this.login()
    }
  }


  private login() {
    this.authService.login({
      username: this.loginForm.controls["email"].value,
      password: this.loginForm.controls["password"].value
    }).subscribe({
      next: response => {
        console.log(response) 
        localStorage.setItem("token", response.token)
      }
    })      

    if (!localStorage.getItem("token")) {
      
    } else {
      console.log("DEU ERRO");
      
    }
  }
}
