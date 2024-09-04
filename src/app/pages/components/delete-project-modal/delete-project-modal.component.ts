import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.scss']
})
export class DeleteProjectModalComponent implements OnInit {

  constructor(
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  public deleteProject(): void {

  }

  public closeModal(): void {
    this.bsModalService.hide();
  }
}
