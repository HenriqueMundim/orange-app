import { BsModalService } from 'ngx-bootstrap/modal';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IprojectRegister } from 'src/app/core/interfaces/IprojectRegister';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { AwsS3Service } from 'src/app/core/services/aws/aws-s3.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { awsBucketUrl } from 'src/environments/environment.dev';
import { ModalSuccessMessageComponent } from '../modal-success-message/modal-success-message.component';
import { catchError, EMPTY, mergeMap } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AlertTypes } from 'src/app/core/enums/alertType';
import { IDropdownSettings, MultiSelectComponent } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { CategoryService } from 'src/app/core/services/project/category.service';
import { IProjectCategory } from 'src/app/core/interfaces/Iproject-category';
import { Iproject } from 'src/app/core/interfaces/Iproject';
import { PostedProjectModalComponent } from '../posted-project-modal/posted-project-modal.component';
import { IpreviewProject } from 'src/app/core/interfaces/IpreviewProject';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss'],
})
export class ModalRegisterProjectComponent implements OnInit, AfterViewInit {

  @Input() userInfo!: IuserInfo;
  @Input() projectInfo!: Iproject;

  private objectKey = "";
  public registerProjectForm: FormGroup = this.formBuilder.group({
    image: [null,
      [
        Validators.required
      ]
    ],
    title: ['',
      [
        Validators.required,
      ]
    ],
    tags: [[],
      [
        Validators.minLength(1)
      ]
    ],
    link: ['',
      [
        Validators.required
      ]
    ],
    description: ['',
      [
        Validators.required
      ]
    ]
  });
  public previewProjectInfo: IpreviewProject = {
    title: "",
    link: "",
    description: "",
    imageUrl: "",
    author: {
      id: 0,
      name: "",
      lastName: "",
      email: ""
    },
    categories: []
  };
  private uploadSuccessful: Boolean = false;

  @ViewChild('previewProject') previewProject: ElementRef<HTMLImageElement> | undefined;
  @ViewChild('categorySelect') categorySelect!: MultiSelectComponent;

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private awsS3Service: AwsS3Service,
    private projectService: ProjectService,
    private alertService: AlertService,
    private categoryService: CategoryService
  ) { }

  dropdownList: Array<IProjectCategory> = [];
  dropdownSettings!: IDropdownSettings;

  ngOnInit() {
    if (this.projectInfo) {
      this.registerProjectForm.patchValue({
        title: this.projectInfo.title,
        tags: this.projectInfo.categories,
        link: this.projectInfo.link,
        description: this.projectInfo.description
      });

      this.previewProjectInfo = {
        title: this.projectInfo.title,
        link: this.projectInfo.link,
        description: this.projectInfo.description,
        imageUrl: this.projectInfo.imageUrl,
        author: {
          id: this.projectInfo.author.id,
          name: this.projectInfo.author.name,
          lastName: this.projectInfo.author.lastName,
          email: this.projectInfo.author.email
        },
        categories: this.projectInfo.categories
      }
    }

    this.categoryService.getAll().pipe(
      catchError((err) => {
        console.log(err)
        return EMPTY;
      })
    )
    .subscribe({
      next: response => this.dropdownList = response
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: undefined,
      unSelectAllText: undefined,
      enableCheckAll: false,
      itemsShowLimit: 2,
      allowSearchFilter: false,
      limitSelection: 2
    };
  }

  ngAfterViewInit(): void {
    if (this.projectInfo && this.previewProject) {
      this.previewProject!.nativeElement.src=this.projectInfo.imageUrl
      this.categorySelect.writeValue(this.projectInfo.categories)
    }
  }

  public onItemSelect(event: ListItem): void {
    this.registerProjectForm.get("tags")?.value.push(event)
    this.previewProjectInfo.categories.push({id: Number(event.id), name: String(event.text)});
  }

  public onIntemDeSelect(event: ListItem): void {
    const index = this.registerProjectForm.get("tags")?.value.indexOf(event);
    this.registerProjectForm.get("tags")?.value.pop(index);
    this.previewProjectInfo.categories = this.registerProjectForm.get("tags")?.value;
  }

  public onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.previewProjectInfo.title = inputElement.value;

    if(this.projectInfo) {
      this.projectInfo.title = inputElement.value;
    }
  }

  public onLinkChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.previewProjectInfo.link = inputElement.value;

    if(this.projectInfo) {
      this.projectInfo.link = inputElement.value;
    }
  }

  public onDescriptionChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.previewProjectInfo.description = inputElement.value;

    if(this.projectInfo) {
      this.projectInfo.description = inputElement.value;
    }
  }

  public onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;
    this.registerProjectForm.patchValue({ image: file});
    this.readFile();
    this.objectKey = `${Date.now()}_${file?.name}`
  }

  public registerProject(): void {
    if(this.registerProjectForm.valid) {
      const file: File = this.registerProjectForm.get("image")?.value;

      this.getPresignedUrl(file, this.objectKey);
    }
  }

  public editProject(): void {
    if(this.objectKey) {
      const file: File = this.registerProjectForm.get("image")?.value;

      this.awsS3Service.getPresignedUrl(file, this.objectKey, "upload")
        .pipe(
          catchError(() => EMPTY),
          mergeMap((response) => this.awsS3Service.uploadFile(response.url, file)),
          catchError(() => {
            return EMPTY;
          }),
          mergeMap(() => {
            this.projectInfo.imageUrl = awsBucketUrl + this.objectKey;
            return this.projectService.editProject(this.projectInfo)
          }),
          catchError(() => EMPTY)
        )
        .subscribe({
          next: project => {
            console.log(project)
            this.bsModalRef.hide();
            location.reload();
          }
        })
    }
  }

  private readFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.registerProjectForm.controls["image"].value)
    reader.onload = event => {
      this.previewProject!.nativeElement.src = reader.result as string
      this.previewProjectInfo.imageUrl = this.previewProject!.nativeElement.src;
    }
  }

  private getPresignedUrl(file: File, objectKey: string): void {
    this.awsS3Service.getPresignedUrl(file, this.objectKey, "upload")
      .pipe(
        catchError(err => {
          this.alertService.showAlert("Não foi possível fazer o upload da imagem", AlertTypes.DANGER);
          this.uploadSuccessful = false;
          return EMPTY;
        })
      )
      .subscribe({
        next: (respose) => this.uploadFile(respose.url, file)
      })
  }

  private uploadFile(url: string, file: File): void {
    this.awsS3Service.uploadFile(url, file)
      .pipe(
        catchError(err => {
          this.alertService.showAlert("Não foi possível fazer o upload da imagem", AlertTypes.DANGER);
          this.uploadSuccessful = false;
          return EMPTY;
        })
      )
      .subscribe({
        next: () => this.uploadProject()
      })
  }

  private uploadProject() {
      const data: IprojectRegister = {
        title: this.previewProjectInfo.title,
        link: this.previewProjectInfo.link,
        description: this.previewProjectInfo.description,
        imageUrl: awsBucketUrl + this.objectKey,
        userId: this.userInfo!.id,
        categories: this.registerProjectForm.controls["tags"].value
      }

      this.projectService.registerProject(data).subscribe({
        next: response => {
          console.log(response)
          this.bsModalRef.hide()
          this.bsModalService.show(ModalSuccessMessageComponent)
        }
      })
  }

  public previewProjectShow(): void {
    let initialState: { projectInfo: IpreviewProject, modalId: any};

    if (this.projectInfo) {
      initialState = {
        projectInfo: this.previewProjectInfo,
        modalId: this.bsModalRef
      }
      this.bsModalRef.setClass("hide")
      this.bsModalService.show(PostedProjectModalComponent, { initialState })
    } else {
      if (this.registerProjectForm.valid) {
        this.previewProjectInfo.author = this.userInfo;
        initialState = {
          projectInfo: this.previewProjectInfo,
          modalId: this.bsModalRef
        }
        this.bsModalService.show(PostedProjectModalComponent, { initialState })
      }
    }
  }
}
