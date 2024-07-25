import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public isLogin = true;
  
  public loginForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.min(1), Validators.max(25)]]
  })
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public formhandler() {
    if (this.isLogin) {
      
    }
  }

}
