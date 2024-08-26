import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AwsS3Service } from 'src/app/core/services/aws/aws-s3.service';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss']
})
export class ModalRegisterProjectComponent implements OnInit {

  public registerProjectForm: FormGroup = this.formBuilder.group({
    image: [null],
    title: [''],
    tags: [''],
    link: ['']
  });

  @ViewChild('previewProject') previewProject!: ElementRef<HTMLImageElement>;

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private awsS3Service: AwsS3Service
  ) { }

  ngOnInit(): void {
    this.registerProjectForm.get("image")?.valueChanges.subscribe({
      next: value => console.log(value)
    })
  }

  public onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;
    this.registerProjectForm.patchValue({ image: file});
    this.readFile();
  }

  public registerProject(): void {
    this.awsS3Service.uploadFile(this.registerProjectForm.get("image")?.value, "")
  }

  private readFile(): void {
    const reader = new FileReader();
    reader.readAsDataURL(this.registerProjectForm.controls["image"].value)
    reader.onload = event => this.previewProject.nativeElement.src = reader.result as string
  }
}
