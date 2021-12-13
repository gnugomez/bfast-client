import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();

  public showPass = false;
  public nameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public submitForm(): void {
    if (this.nameForm.valid) {
      this.loading = true;

      this.nextStep.emit();
    }
  }
}
