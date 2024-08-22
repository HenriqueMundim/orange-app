import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-register-project',
  templateUrl: './modal-register-project.component.html',
  styleUrls: ['./modal-register-project.component.scss']
})
export class ModalRegisterProjectComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
