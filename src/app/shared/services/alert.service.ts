import { Injectable } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AlertTypes } from "src/app/core/enums/alertType";
import { AlertComponent } from "../alert/alert.component";

@Injectable({
    providedIn: 'root'
})
export class AlertService {


    constructor(private modalService: BsModalService) {}

    public showAlert(message: string, type: AlertTypes) {
        const bsModalRef: BsModalRef = this.modalService.show(AlertComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.message = message;

        setTimeout(() => bsModalRef.hide(), 2000);
    }
}