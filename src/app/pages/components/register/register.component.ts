import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.formBulder.group([
    {
      firstName: ['', Validators.required]
    },
    {
      lastName: ['', Validators.required]
    },
    {
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    },
    {
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ]
      ]
    }
  ])

  constructor(private formBulder: FormBuilder) { }

  ngOnInit(): void {
  }

}
