import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class NameComponent {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();
  @Output() public prevStep: EventEmitter<void> = new EventEmitter();
  @Input() public registerForm?: FormGroup;

  public showPass = false;
  public nameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.nameForm.valueChanges.subscribe(() => {
      this.registerForm?.patchValue(this.nameForm.value);
    });
    this.nameForm.patchValue(this.registerForm?.value);
  }

  public goBack(): void  {
    this.prevStep.emit();
  }

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
