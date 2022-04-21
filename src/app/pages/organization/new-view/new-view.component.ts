import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Organization } from 'src/app/shared/domain/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'new-found-view',
  templateUrl: './new-view.component.html',
  styleUrls: ['./new-view.component.scss'],
})
export class NewViewComponent implements OnInit {
  public organizationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  public loading = false;

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public goBack(): void {
    history.back();
  }

  public submitForm(): void {
    if (this.organizationForm.valid) {
      this.loading = true;

      this.organizationService
        .create(this.organizationForm.value)
        .subscribe({
          next: (res) => {
            this.organizationService.setActive(
              res.data as Organization
            );

            this.organizationService
              .getAll({ forceFetch: true })
              .subscribe((res) => {
                this.loading = false;
                this.router.navigate(['/overview']);
              });
          },
        });
    }
  }
}
