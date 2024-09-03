import { Component, Input, OnInit } from '@angular/core';
import { Iproject } from 'src/app/core/interfaces/Iproject';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input("projectInfo") projectInfo!: Iproject;

  constructor() { }

  ngOnInit(): void {
    console.log(this.projectInfo)
  }

}
