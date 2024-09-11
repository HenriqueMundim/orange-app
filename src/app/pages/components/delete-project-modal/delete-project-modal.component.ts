import { AwsS3Service } from 'src/app/core/services/aws/aws-s3.service';
import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, mergeMap } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { Iproject } from 'src/app/core/interfaces/Iproject';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss']
})
export class DeleteProjectModalComponent implements OnInit {

  @Input() projectInfo!: Iproject

  constructor(
    private bsModalService: BsModalService,
    private projectService: ProjectService,
    private awsS3Service: AwsS3Service
  ) { }

  ngOnInit(): void {
  }

  public deleteProject(): void {
    const objectKey = this.projectInfo.imageUrl.slice(46)
    this.awsS3Service.deleteFile(objectKey).pipe(
      catchError(() => EMPTY),
      mergeMap(() => {
        return this.projectService.deleteProject(this.projectInfo.id)
      }),
      catchError(() => EMPTY)
    ).subscribe({
      next: () => {
        this.closeModal();
        location.reload();
      }
    })
  }

  public closeModal(): void {
    this.bsModalService.hide();
  }
}
