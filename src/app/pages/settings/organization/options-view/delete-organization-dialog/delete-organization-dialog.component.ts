import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-delete-organization-dialogg',
  templateUrl: './delete-organization-dialog.component.html',
  styleUrls: ['./delete-organization-dialog.component.scss'],
})
export class DeleteOrganizationDialog implements OnInit {
  public deleteOrganizationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public loading: boolean = false;

  public organization: Organization

  constructor(
    private modalService: ModalService,
    private organizationService: OrganizationService,
    @Inject(DATA) private data: any
  ) {
    this.organization = this.data.org;
  }

  ngOnInit(): void {
  }

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {

    if (this.deleteOrganizationForm.valid) {

      if (this.deleteOrganizationForm.value.name === this.organization.name) {
        this.loading = true;
        this.organizationService
          .delete(this.organization)
          .subscribe({
            next: (res) => {
              this.modalService.close();
              this.loading = false;
            },
            error: (err) => {
              this.loading = false;
              this.deleteOrganizationForm.get("name")?.setErrors({
                somethingWrong: true,
              });
            },
          });
      } else {
        this.deleteOrganizationForm.get("name")?.setErrors({
          wrongName: true,
        });
      }
    }
  }
}
