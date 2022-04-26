import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
  animations: [
    trigger('fadeRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate(
          '400ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }),
        animate('200ms', style({ opacity: 0, transform: 'translateX(-30px)' })),
      ]),
    ]),
  ],
})
export class RegisterViewComponent implements OnInit {
  public currentStep = 1;
  public totalSteps = 4;

  public registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void { }

  public nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  public prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
