import { Component } from '@angular/core';
import { ModalOutletInstance, ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
})
export class ModalOutletComponent {
  public modal: ModalOutletInstance | null = null;

  constructor(private modalService: ModalService) {
    this.modalService.subscribe((modal) => {
      this.modal = modal;
    });
  }
}
