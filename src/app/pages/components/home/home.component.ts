import { CookieService } from 'ngx-cookie-service';
import { catchError, EMPTY } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterProjectComponent } from 'src/app/shared/modal-register-project/modal-register-project.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private token: string | null = "";
  private bsModalRef?: BsModalRef

  public userInfo: IuserInfo = {
    id: 0,
    name: "",
    lastName: "",
    email: ""
  };

  public searchFilter: FormGroup = this.formBuilder.group({
    tag: ['']
  })

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null) {
      this.token = localStorage.getItem("token");
      this.getUserInfo()
    } else if(this.cookieService.get("token") !== null) {
      this.getGoogleUserInfo(this.cookieService.get("token"));
    }
  }


  private getUserInfo() {
    this.userService.getInfo(this.token).pipe(
      catchError(err => {
          this.router.navigate(["/login"])
          return EMPTY;
      })
    )
    .subscribe({
      next: respose => this.userInfo = respose
    })
  }

  private getGoogleUserInfo(token: String) {
    this.userService.getInfo(token).pipe(
      catchError(err => {
          this.router.navigate(["/login"])
          return EMPTY;
      })
    )
    .subscribe({
      next: (respose: IuserInfo) => this.userInfo = respose
    })
  }

  public registerProject(): void {
    this.bsModalRef = this.modalService.show(ModalRegisterProjectComponent);
  }

}
