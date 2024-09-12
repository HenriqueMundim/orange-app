import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IpreviewProject } from 'src/app/core/interfaces/IpreviewProject';

@Component({
  selector: 'app-posted-project-modal',
  templateUrl: './posted-project-modal.component.html',
  styleUrls: ['./posted-project-modal.component.scss']
})
export class PostedProjectModalComponent implements OnInit {

  @Input('projectInfo') projectInfo!: IpreviewProject
  @Input('modalId') modalId!: any
  public viewSize: number = 0;

  constructor(
    private bsModalRef: BsModalRef,
    private bsModalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.viewSize = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: Event) {
    const windowtarget = event.target as Window

    this.viewSize = windowtarget.innerWidth;
  }

  public closePreview(): void {
    this.bsModalService.hide(this.bsModalRef.id);
    if (this.modalId) {
      this.modalId.setClass("show")
    }
  }
}
