import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public firstNameErrorMessage = "";
  public lastNameErrorMessage = "";
  public emailErrorMessage = "";
  public passwordErrorMessage = "";

  public registerForm: FormGroup = this.formBulder.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern("^(?!.*\\s).+$")
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern("^(?!.*\\s).+$")
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern("^(?!.*\\s).+$")
      ]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern("^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).+$")
        ]
      ]
    }
  )

  constructor(private formBulder: FormBuilder) { }

  ngOnInit(): void {

    this.registerForm.get("firstName")?.valueChanges.subscribe((value) => {
      if(this.registerForm.controls["firstName"].getError('required')) {
        this.firstNameErrorMessage = "O nome é obrigatório!"
      } else if(this.registerForm.controls["firstName"].getError('pattern')) {
        this.firstNameErrorMessage = "Nome inválido"
      }
    })

    this.registerForm.get("lastName")?.valueChanges.subscribe((value) => {
      if(this.registerForm.controls["lastName"].getError('required')) {
        this.lastNameErrorMessage = "O sobrenome é obrigatório!"
      } else if(this.registerForm.controls["lastName"].getError('pattern')) {
        this.firstNameErrorMessage = "Sobrenome inválido"
      }
    })

    this.registerForm.get('email')?.valueChanges.subscribe((value) => {
      if(this.registerForm.controls['email'].getError('required')) {
        this.emailErrorMessage = "Email é obrigatório!"
      } else if(this.registerForm.controls['email'].getError('email')) {
        this.emailErrorMessage = "Email inválido"
      } else if(this.registerForm.controls["email"].getError('pattern')) {
        this.firstNameErrorMessage = "Email inválido"
      }
    })

    this.registerForm.get('password')?.valueChanges.subscribe((value) => {

      if(this.registerForm.controls['password'].getError('required')) {
        this.passwordErrorMessage = "Senha é obrigatória!"
      } else if(this.registerForm.controls['password'].getError('minlength')) {
        this.passwordErrorMessage = "A senha deve ter no mínimo 6 caracteres"
      } else if(this.registerForm.controls['password'].getError('maxlength')) {
        this.passwordErrorMessage = "A senha deve ter no máximo 16 caracteres"
      } else if(this.registerForm.controls['password'].getError('pattern')) {
        this.passwordErrorMessage = "A senha deve conter um número, uma letra maiúscula e um caracter especial"
      }
    })

  }


  public formHandler(): void {
    if(this.registerForm.valid) {

    }
  }

}
