import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IprojectRegister } from 'src/app/core/interfaces/IprojectRegister';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { AwsS3Service } from 'src/app/core/services/aws/aws-s3.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { awsBucketUrl } from 'src/environments/environment.dev';
import { ModalSuccessMessageComponent } from '../modal-success-message/modal-success-message.component';
import { catchError, EMPTY } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AlertTypes } from 'src/app/core/enums/alertType';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss'],
})
export class ModalRegisterProjectComponent implements OnInit {

  @Input() userInfo: IuserInfo | undefined;

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
        Validators.required
      ]
    ],
    link: ['',
      [
        Validators.required
      ]
    ]
  });
  public previewProjectInfo: IprojectRegister = {
    title: "",
    link: "",
    description: "",
    imageUrl: "",
    userId: 0
  };
  private uploadSuccessful: Boolean = false;
  private preSignedUrl = "";

  @ViewChild('previewProject') previewProject!: ElementRef<HTMLImageElement>;

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private awsS3Service: AwsS3Service,
    private projectService: ProjectService,
    private alertService: AlertService
  ) { }

  dropdownList = [{}];
  selectedItems = [{}];
  dropdownSettings!: IDropdownSettings;

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: undefined,
      unSelectAllText: undefined,
      enableCheckAll: false,
      itemsShowLimit: 2,
      allowSearchFilter: false,
      limitSelection: 2
    };
  }

  public onItemSelect(event: ListItem): void {
    this.registerProjectForm.get("tags")?.value.push(event)
  }

  public onIntemDeSelect(event: ListItem): void {
    const index = this.registerProjectForm.get("tags")?.value.indexOf(event)
    this.registerProjectForm.get("tags")?.value.pop(index)
  }

  public onTitleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.previewProjectInfo.title = inputElement.value;
  }

  public onLinkChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.previewProjectInfo.link = inputElement.value;
  }

  public onDescriptionChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.previewProjectInfo.description = inputElement.value;
  }

  public onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;
    this.registerProjectForm.patchValue({ image: file});
    this.readFile();
    this.objectKey = `${Date.now()}_${file?.name}`
  }

  public registerProject(): void {

    console.log(this.registerProjectForm.controls["tags"].value)

    // if(this.registerProjectForm.valid) {
    //   const file: File = this.registerProjectForm.get("image")?.value;

    //   this.getPresignedUrl(file, this.objectKey);
    //   this.uploadFile(this.preSignedUrl, file);

    //   if(this.uploadSuccessful) {
    //     const data: IprojectRegister = {
    //       title: this.previewProjectInfo.title,
    //       link: this.previewProjectInfo.link,
    //       description: this.previewProjectInfo.description,
    //       imageUrl: awsBucketUrl + this.objectKey,
    //       userId: this.userInfo!.id
    //     }

    //     this.projectService.registerProject(data).subscribe({
    //       next: response => {
    //         this.bsModalRef.hide()
    //         this.bsModalService.show(ModalSuccessMessageComponent)
    //       }
    //     })
    //   }
    // }
  }

  private readFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.registerProjectForm.controls["image"].value)
    reader.onload = event => this.previewProject.nativeElement.src = reader.result as string
  }

  private getPresignedUrl(file: File, objectKey: string): void {
    this.awsS3Service.getPresignedUrl(file, this.objectKey)
      .pipe(
        catchError(err => {
          this.alertService.showAlert("Não foi possível fazer o upload da imagem", AlertTypes.DANGER);
          this.uploadSuccessful = false;
          return EMPTY;
        })
      )
      .subscribe({
        next: (respose) => this.preSignedUrl = respose.url
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
        next: () => this.uploadSuccessful = true
      })
  }
}
