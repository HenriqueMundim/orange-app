import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project/project.service';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss']
})
export class DeleteProjectModalComponent implements OnInit {

  @Input() projectId!: number

  constructor(
    private bsModalService: BsModalService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  public deleteProject(): void {
    this.projectService.deleteProject(this.projectId)
      .pipe(
        catchError(() => EMPTY)
      )
      .subscribe({
        next: () => {
          this.bsModalService.hide();
          location.reload();
        }
      })
  }

  public closeModal(): void {
    this.bsModalService.hide();
  }
}
