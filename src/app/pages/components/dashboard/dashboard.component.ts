import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userInfo: IuserInfo = {
    id: 0,
    name: "",
    lastName: "",
    email: ""
  };
  public projects: Array<Iproject> = []
  public totalPages: number = 0;
  public currentPage !: number;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getInfo().pipe(
      catchError(() => {
        this.router.navigate(['/login'])
        return EMPTY;
      })
    )
    .subscribe({
      next: respose => this.userInfo = respose
    })

    this.projectService.getAllProjects(0, 10).pipe(
      catchError(() => {
        this.router.navigate(['/login'])
        return EMPTY;
      })
    )
    .subscribe({
      next: response => {
        this.currentPage = response.pageable.pageNumber;
        this.totalPages = response.totalPages;
        this.projects = response.content;
      }
    })
  }

  handleChangePage(data: any): void {
    this.projects = data.projects
    this.currentPage = data.currentPage
    this.totalPages = data.totalPages
  }
}
