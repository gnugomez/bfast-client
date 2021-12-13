import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  animations: [
    trigger('fadeRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '600ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-20px)' })),
      ]),
    ]),
  ],
})
export class RegisterViewComponent implements OnInit {
  public currentStep = 1;
  public totalSteps = 4;

  constructor() {}

  ngOnInit(): void {}

  public nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  public prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
