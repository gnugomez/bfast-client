import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  @Output() public nextStep: EventEmitter<void> = new EventEmitter();
  @Input() public registerForm?: FormGroup;

  public showPass = false;
  public organizationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.organizationForm.valueChanges.subscribe(() => {
      this.registerForm?.patchValue(this.organizationForm.value);
    });
    this.organizationForm.patchValue(this.registerForm?.value);
  }

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public skip() {
    this.nextStep.emit();
  }

  public submitForm(): void {
    if (this.organizationForm.valid) {
      this.loading = true;

      this.nextStep.emit();
    }
  }
}
