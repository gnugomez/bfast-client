import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-not-found-view',
  templateUrl: './not-found-view.component.html',
  styleUrls: ['./not-found-view.component.scss'],
})
export class NotFoundViewComponent implements OnInit {
  public organizationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  public loading = false;

  constructor(
    private organizationServie: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public submitForm(): void {
    if (this.organizationForm.valid) {
      this.loading = true;

      this.organizationServie
        .createOrganization(this.organizationForm.value)
        .subscribe({
          next: (res) => {
            this.organizationServie
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
