import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ModalRegisterProjectComponent } from './modal-register-project/modal-register-project.component';
import { ModalSuccessMessageComponent } from './modal-success-message/modal-success-message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    ProjectCardComponent,
    ModalRegisterProjectComponent,
    ModalSuccessMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    HeaderComponent,
    ProjectCardComponent,
    ModalRegisterProjectComponent,
    RouterModule
  ]
})
export class SharedModule { }
