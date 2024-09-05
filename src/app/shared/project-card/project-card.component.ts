import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { ModalRegisterProjectComponent } from '../modal-register-project/modal-register-project.component';
import { RegisterComponent } from 'src/app/pages/components/register/register.component';
import { DeleteProjectModalComponent } from 'src/app/pages/components/delete-project-modal/delete-project-modal.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @ViewChild("dropdownMenuProject") dropdownMenuProject: ElementRef<HTMLElement> | undefined
  @ViewChild("openMenuEdit") openMenuEdit: ElementRef<HTMLImageElement> | undefined

  @Input("projectInfo") projectInfo!: Iproject;
  @Input("userInfo") userInfo!: IuserInfo;

  private clickListener: () => void;
  private isMenuOpen = false;

  constructor(
    private bsModalService: BsModalService,
    private render: Renderer2
  ) {
    this.clickListener = this.render.listen('document', 'click', (event: MouseEvent) => {
      this.closeMenu(event);
    });
  }

  ngOnInit(): void {
  }

  public showEditProjectMenu(): void {
    this.isMenuOpen = true;
    this.dropdownMenuProject!.nativeElement.style.display="block";
  }

  private closeMenu(event: Event) {
    if (this.isMenuOpen && event.target != this.openMenuEdit?.nativeElement && event.target != this.dropdownMenuProject?.nativeElement) {
      this.dropdownMenuProject!.nativeElement.style.display="none";
    }
  }

  public openEditModal(): void {
    const initialState = {
      userInfo: this.userInfo,
      projectInfo: this.projectInfo
    }

    this.bsModalService.show(ModalRegisterProjectComponent, { initialState: initialState })
  }

  public deleteProject(): void {
    const initialState = {
      projectInfo: this.projectInfo
    }
    this.bsModalService.show(DeleteProjectModalComponent, { initialState });
  }
}
