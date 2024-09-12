import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipage } from 'src/app/core/interfaces/Ipage';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.scss']
})
export class PageControlComponent implements OnInit {

  @Input() userId!: number;
  @Input() currentPage!: number;
  @Input() totalPages!: number;

  public numberPagesArray = [];
  public projects: Array<Iproject> = [];

  @Output() changePageInfo: EventEmitter<Ipage> = new EventEmitter<Ipage>();

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.numberPagesArray = Array.from({length: this.totalPages});
  }

  public changePage(page: number): void {
    if (this.userId) {
      this.projectService.getAllUserProjects(this.userId, page)
      .subscribe({
        next: response => {
          this.projects = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages
          this.changePageInfo.emit({
            projects: this.projects,
            currentPage: this.currentPage,
            totalPages: this.totalPages
          })
        }
      })
    } else {
      this.projectService.getAllProjects(page)
      .subscribe({
        next: response => {
          this.projects = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.changePageInfo.emit({
            projects: this.projects,
            currentPage: this.currentPage,
            totalPages: this.totalPages
          })
        }
      })
    }
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
