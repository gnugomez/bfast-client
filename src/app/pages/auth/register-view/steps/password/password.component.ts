import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();
  @Output() public prevStep: EventEmitter<void> = new EventEmitter();
  @Input() public registerForm?: FormGroup;

  public showPass = false;
  public passwordForm = new FormGroup({
    /* Password must contain one capital letter one number and one special character */
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
      ),
    ]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.passwordForm.valueChanges.subscribe(() => {
      this.registerForm?.patchValue(this.passwordForm.value);
    });
    this.passwordForm.patchValue(this.registerForm?.value);
  }

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public goBack(): void {
    this.prevStep.emit();
  }

  public submitForm(): void {
    if (this.passwordForm.valid) {
      this.auth.register(this.registerForm?.value).subscribe({
        next: (res) => {
          this.auth
            .login({
              username: this.registerForm?.value.email,
              password: this.registerForm?.value.password,
            })
            .subscribe({
              next: (res) => {
                this.nextStep.emit();
                this.loading = false;
              },
            });
        },
        error: (err) => {
          this.loading = false;
        },
      });

      this.loading = true;
    }
  }
}
