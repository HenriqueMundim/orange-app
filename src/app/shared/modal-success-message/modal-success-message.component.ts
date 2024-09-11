import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-success-message',
  templateUrl: './modal-success-message.component.html',
  styleUrls: ['./modal-success-message.component.scss']
})
export class ModalSuccessMessageComponent implements OnInit {

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.bsModalRef.onHide?.subscribe({
      next: () => location.reload()
    })
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

}
