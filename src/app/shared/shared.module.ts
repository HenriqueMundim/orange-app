import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ModalRegisterProjectComponent } from './modal-register-project/modal-register-project.component';
import { ModalSuccessMessageComponent } from './modal-success-message/modal-success-message.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { PostedProjectModalComponent } from './posted-project-modal/posted-project-modal.component';
import { PageControlComponent } from './page-control/page-control.component';

@NgModule({
  declarations: [
    AlertComponent,
    HeaderComponent,
    ProjectCardComponent,
    ModalRegisterProjectComponent,
    ModalSuccessMessageComponent,
    PostedProjectModalComponent,
    PageControlComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    ProjectCardComponent,
    ModalRegisterProjectComponent,
    PageControlComponent,
    RouterModule
  ]
})
export class SharedModule { }
