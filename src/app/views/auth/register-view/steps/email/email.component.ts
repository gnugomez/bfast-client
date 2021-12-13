import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();

  public showPass = false;
  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public submitForm(): void {
    if (this.emailForm.valid) {
      this.loading = true;

      this.nextStep.emit();
    }
  }
}
