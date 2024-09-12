import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DeleteProjectModalComponent } from './components/delete-project-modal/delete-project-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DeleteProjectModalComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
