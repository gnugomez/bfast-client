import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  query,
  transition,
  group,
  // ...
} from '@angular/animations';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalEnter', [
      transition(':enter', [
        group([
          query('.modal .content', [
            style({
              filter: 'blur(10px)',
            }),
            animate('1s ease', style({ filter: 'blur(0px)' })),
          ]),
          query('.modal', [
            style({
              transform: 'scale(0.95) translateY(-10px)',
              opacity: 0,
            }),
            animate('0.7s ease', style({ transform: 'none', opacity: 1 })),
          ]),
          style({ backdropFilter: 'blur(0px)' }),
          animate('1s ease', style({ backdropFilter: 'blur(8px)' })),
        ]),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  public closeEvent(event: Event) {
    const closestOpenModal = (event.target as HTMLInputElement).closest(
      '[open-modal]'
    );

    if (!closestOpenModal) {
      this.modalService.close();
    }
  }

  public closeModal() {
    this.modalService.close();
  }
}
