import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IprojectRegister } from 'src/app/core/interfaces/IprojectRegister';
import { IuserInfo } from 'src/app/core/interfaces/IuserInfo.interface';
import { AwsS3Service } from 'src/app/core/services/aws/aws-s3.service';
import { ProjectService } from 'src/app/core/services/project/project.service';
import { awsBucketUrl, environment } from 'src/environments/environment.dev';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss']
})
export class ModalRegisterProjectComponent implements OnInit {

  @Input() userInfo: IuserInfo | undefined;

  private objectKey = "";

  public registerProjectForm: FormGroup = this.formBuilder.group({
    image: [null],
    title: [''],
    tags: [''],
    link: ['']
  });

  public previewProjectInfo: IprojectRegister = {
    title: "",
    link: "",
    description: "",
    imageUrl: "",
    userId: 0
  };

  @ViewChild('previewProject') previewProject!: ElementRef<HTMLImageElement>;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private awsS3Service: AwsS3Service,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
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
    this.awsS3Service.uploadFile(this.registerProjectForm.get("image")?.value, this.objectKey)
    const data: IprojectRegister = {
      title: this.previewProjectInfo.title,
      link: this.previewProjectInfo.link,
      description: this.previewProjectInfo.description,
      imageUrl: awsBucketUrl + this.objectKey,
      userId: this.userInfo!.id
    }

    this.projectService.registerProject(data).subscribe({
      next: response => {
        this.bsModalRef.hide()
      }
    })
  }

  private readFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.registerProjectForm.controls["image"].value)
    reader.onload = event => this.previewProject.nativeElement.src = reader.result as string
  }
}
