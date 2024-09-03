import { Component, Input, OnInit } from '@angular/core';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input("projectInfo") projectInfo!: Iproject;
  @Input("userInfo") userInfo!: IuserInfo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.projectInfo)
  }

}
