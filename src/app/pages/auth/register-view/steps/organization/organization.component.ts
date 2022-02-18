import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

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

  constructor(
    private auth: AuthService,
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.organizationForm.valueChanges.subscribe(() => {
      this.registerForm?.patchValue(this.organizationForm.value);
    });
    this.organizationForm.patchValue(this.registerForm?.value);
  }

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public skip(): void {
    this.nextStep.emit();
  }

  public submitForm(): void {
    if (this.organizationForm.valid) {
      this.loading = true;

      this.organizationService
        .createOrganization(this.organizationForm.value)
        .subscribe({
          next: (res) => {
            this.organizationService
              .getOrganizations({ forceFetch: true })
              .subscribe((res) => {
                this.loading = false;
                this.router.navigate(['/overview']);
              });
          },
        });
    }
  }
}
