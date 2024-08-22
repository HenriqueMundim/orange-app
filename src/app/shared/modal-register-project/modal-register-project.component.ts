import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss']
})
export class ModalRegisterProjectComponent implements OnInit {

  public registerProjectForm: FormGroup = this.formBuilder.group({
    image: [''],
    title: [''],
    tags: [''],
    link: ['']
  })

  constructor(
    public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
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
  }

}
