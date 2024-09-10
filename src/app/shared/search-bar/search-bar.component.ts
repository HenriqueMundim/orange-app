import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, mergeMap } from 'rxjs';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Input() userId: number = 0;
  @Output() changePageInfo: EventEmitter<{ projects: Array<Iproject>, currentPage: number, totalPages: number}> = new EventEmitter<{ projects: Array<Iproject>, currentPage: number, totalPages: number}>();

  public searchFilter: FormGroup = this.formBuilder.group({
    tag: ['']
  })

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
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
        this.changePageInfo.emit({
          projects: response.content,
          currentPage: response.pageable.pageNumber,
          totalPages: response.totalPages
        })
      }
    })
  }

}
