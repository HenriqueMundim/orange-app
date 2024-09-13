import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, mergeMap } from 'rxjs';
import { Ipage } from 'src/app/core/interfaces/Ipage';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() userId: number = 0;
  @Output() changePageInfo: EventEmitter<Ipage> = new EventEmitter<Ipage>();

  public searchFilter: FormGroup = this.formBuilder.group({
    tag: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      this.searchFilter.get("tag")?.valueChanges.pipe(
        debounceTime(700),
        mergeMap(value => {
          if (!value) {
            return this.projectService.getAllUserProjects(this.userId)
          }
          return this.projectService.getAllUserProjectsByCategory(this.userId, value)
        })
      )
      .subscribe({
        next: response => {
          if(response) {
            this.changePageInfo.emit({
              projects: response.content,
              currentPage: response.pageable.pageNumber,
              totalPages: response.totalPages
            })
          }
        }
      })
    } else {
      this.searchFilter.get("tag")?.valueChanges.pipe(
        debounceTime(700),
        mergeMap(value => {
          if (!value) {
            return this.projectService.getAllProjects(this.userId)
          }
          return this.projectService.getAllProjectsByCategory(value)
        })
      )
      .subscribe({
        next: response => {
          if(response) {
            this.changePageInfo.emit({
              projects: response.content,
              currentPage: response.pageable.pageNumber,
              totalPages: response.totalPages
            })
          }
        }
      })
    }
  }

}
