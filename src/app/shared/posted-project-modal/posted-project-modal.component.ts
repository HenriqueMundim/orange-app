import { Component, Input, OnInit } from '@angular/core';
import { IpreviewProject } from 'src/app/core/interfaces/IpreviewProject';

@Component({
  selector: 'app-posted-project-modal',
  templateUrl: './posted-project-modal.component.html',
  styleUrls: ['./posted-project-modal.component.scss']
})
export class PostedProjectModalComponent implements OnInit {

  @Input('projectInfo') projectInfo!: IpreviewProject

  constructor() { }

  ngOnInit(): void {
  }

}
