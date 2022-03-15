import { Component, InjectionToken, Injector } from '@angular/core';
import { ModalOutletInstance, ModalService } from '../modal.service';
export const DATA = new InjectionToken<any>("DATA");

@Component({
  selector: 'app-modal-outlet',
  templateUrl: './modal-outlet.component.html',
})
export class ModalOutletComponent {
  public modal: ModalOutletInstance | null = null;
  data?: Injector;


  constructor(private modalService: ModalService, injector: Injector) {
    this.modalService.subscribe((modal) => {
      this.modal = modal;
      this.data = Injector.create({
        providers: [
          {
            provide: DATA,
            useValue: modal?.data,
          },
        ],
        parent: injector,
      });
    });

  }
}
