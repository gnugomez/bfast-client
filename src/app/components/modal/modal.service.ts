import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface ModalOutletInstance {
  component: any;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService extends ReplaySubject<ModalOutletInstance | null> {
  constructor() {
    super();
  }

  open(component: any, data?: any) {
    this.next({ component, data });
  }

  close() {
    this.next(null);
  }
}
