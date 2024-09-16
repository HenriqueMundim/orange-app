import { CookieService } from 'ngx-cookie-service';
import { catchError, EMPTY, mergeMap, Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterProjectComponent } from 'src/app/shared/modal-register-project/modal-register-project.component';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { IPageResponse } from 'src/app/core/interfaces/IPageResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private bsModalRef?: BsModalRef
  public projects: Array<Iproject> = []
  public totalPages: number = 0;
  public currentPage !: number;
  public loading = true;

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
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private projectService: ProjectService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    console.log(this.cookieService.get("token"))
    this.getUserInfo();
  }

  private getUserInfo() {
    this.userService.getInfo().pipe(
      catchError(err => {
          // this.router.navigate(["/login"])
          return EMPTY;
      }),
      mergeMap(respose => {
        this.userInfo = respose;
        return this.getUsersProjects()
      }),
    )
    .subscribe({
      next: respose => {
          if (respose) {
            this.currentPage = respose.pageable.pageNumber;
            this.totalPages = respose.totalPages;
            this.projects = respose.content;
          }
      },
      error: () => {
        this.router.navigate(["/login"]);
        return EMPTY;
      }
    })
  }

  private getUsersProjects(): Observable<IPageResponse<Iproject>> {
    return this.projectService.getAllUserProjects(this.userInfo.id)
      .pipe(
        catchError(error => {
          return EMPTY;
        })
      )
  }

  public registerProject(): void {
    const initialState = {
      userInfo: this.userInfo
    }
    this.bsModalRef = this.modalService.show(ModalRegisterProjectComponent, {initialState});
  }

  handleChangePage(data: any): void {
    this.projects = data.projects
    this.currentPage = data.currentPage
    this.totalPages = data.totalPages
  }
}
