import { CookieService } from 'ngx-cookie-service';
import { catchError, EMPTY } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalRegisterProjectComponent } from 'src/app/shared/modal-register-project/modal-register-project.component';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Iproject } from 'src/app/core/interfaces/Iproject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private token: string | null = "";
  private bsModalRef?: BsModalRef
  public projects: Array<Iproject> = []
  public totalPages: number = 0;
  public numberPagesArray = []
  public currentPage !: number;

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
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  private getUserInfo() {
    this.userService.getInfo().pipe(
      catchError(err => {
          this.router.navigate(["/login"])
          return EMPTY;
      })
    )
    .subscribe({
      next: respose => this.userInfo = respose,
      complete: () => this.getUsersProjects()
    })
  }

  private getUsersProjects(): void {
    this.projectService.getAllUserProjects(this.userInfo.id)
      .pipe(
        catchError(error => {
          return EMPTY;
        })
      )
      .subscribe({
        next: respose => {
          if (respose) {
            this.currentPage = respose.pageable.pageNumber;
            this.totalPages = respose.totalPages;
            this.numberPagesArray = Array.from({length: respose.totalPages});
            this.projects = respose.content;
          }
        },
      })
  }

  public registerProject(): void {
    const initialState = {
      userInfo: this.userInfo
    }
    this.bsModalRef = this.modalService.show(ModalRegisterProjectComponent, {initialState});
  }

  public changePage(page: number): void {
    this.projectService.getAllUserProjects(this.userInfo.id, page)
      .subscribe({
        next: response => {
          this.projects = response.content;
          this.currentPage = response.pageable.pageNumber;
        }
    })
  }

  public nextPage(): void {
    if (this.currentPage !== this.totalPages) {
      if (this.currentPage + 5 < this.totalPages) {
        document.getElementById(`${this.currentPage}`)!.style.display="none";
        document.getElementById(`${this.currentPage + 5}`)!.style.display="block";
      }

      this.changePage(this.currentPage + 1)
    }
  }

  public previousPage(): void {
    if (this.currentPage !== 0) {
      if (this.totalPages - this.currentPage >= 5) {
        document.getElementById(`${this.currentPage + 4}`)!.style.display="none";
        document.getElementById(`${this.currentPage - 1}`)!.style.display="block";
      }

      this.changePage(this.currentPage - 1)
    }
  }
}
