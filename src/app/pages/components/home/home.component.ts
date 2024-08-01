import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AlertTypes } from 'src/app/core/enums/alertType';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public route: String = "";

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
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route = this.router.url
  }

  public formhandler() {
    if (this.route == "/login") {
      if(this.loginForm.valid) {
        this.login();
      }
    }
  }


  private login(): void {
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

  public redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
