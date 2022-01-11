import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class RegisterEmailComponent implements OnInit {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();
  @Input() public registerForm?: FormGroup;

  public showPass = false;
  public emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.emailForm.valueChanges.subscribe(() => {
      this.registerForm?.patchValue(this.emailForm.value);
    });
    this.emailForm.patchValue(this.registerForm?.value);
  }

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public goBack(): void {
    history.back();
  }

  public submitForm(): void {
    if (this.emailForm.valid) {
      this.loading = true;

      this.auth.register(this.registerForm?.value).subscribe(
        (res) => {
          this.loading = false;
          this.nextStep.emit();
        },
        (err) => {
          if (err.error.errors.email) {
            this.emailForm.get('email')?.setErrors({ emailTaken: true });

            setTimeout(() => {
              this.loading = false;
            }, 500);
          } else {
            this.nextStep.emit();
          }
        }
      );
    }
  }
}
