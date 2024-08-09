import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { catchError, EMPTY } from 'rxjs';
import { AlertTypes } from 'src/app/core/enums/alertType';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public emailErrorMessage = "";
  public passwordErrorMessage = "";

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]
    ]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {

    this.loginForm.get('email')?.valueChanges.subscribe((value) => {
      if(this.loginForm.controls['email'].getError('required')) {
        this.emailErrorMessage = "Email é obrigatório! *"
      } else if(this.loginForm.controls['email'].getError('email')) {
        this.emailErrorMessage = "Email inválido *"
      }
    })

    this.loginForm.get('password')?.valueChanges.subscribe((value) => {
      if(this.loginForm.controls['password'].getError('required')) {
        this.passwordErrorMessage = "Senha é obrigatória! *"
      } else if(this.loginForm.controls['password'].getError('minlength')) {
        this.passwordErrorMessage = "A senha deve ter no mínimo 6 caracteres *"
      } else if(this.loginForm.controls['password'].getError('maxlength')) {
        this.passwordErrorMessage = "A senha deve ter no máximo 6 caracteres *"
      }
    })
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.authService.login({
        username: this.loginForm.controls["email"].value,
        password: this.loginForm.controls["password"].value
      })
      .pipe(
        catchError(err => {
            this.alertService.showAlert("Usuário ou senha incorretos!", AlertTypes.DANGER);
            return EMPTY;
        })
      )
      .subscribe({
        next: (response) => {
          if(response && response.token) {
            this.alertService.showAlert("Login efetuado com sucesso!", AlertTypes.SUCCESS);
            localStorage.setItem("token", response.token);
          }
        }
      })
    }
  }

  public loginGoogle() {
    window.location.href = `${environment.url}/oauth2/authorization/google`
  }

  public redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
