import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from './project-card/project-card.component';

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ProjectCardComponent,
    RouterModule
  ]
})
export class SharedModule { }
