import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/components/modal/modal.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-add-new-dialog',
  templateUrl: './add-new-dialog.component.html',
  styleUrls: ['./add-new-dialog.component.scss'],
})
export class AddNewDialogComponent implements OnInit {
  public newMemberForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public loading: boolean = false;

  constructor(
    private modalService: ModalService,
    public organizationService: OrganizationService
  ) { }

  ngOnInit(): void { }

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {
    if (this.newMemberForm.valid) {
      this.loading = true;
      this.organizationService
        .addMemberToOrganization(
          this.organizationService.getActiveOrganization().value,
          this.newMemberForm.value.email
        )
        .subscribe({
          next: (res) => {
            this.modalService.close();
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            if (err.status === 409) {
              this.newMemberForm.setErrors({
                duplicate: true,
              });
            }
            if (err.status === 404) {
              this.newMemberForm.setErrors({
                notFound: true,
              });
            }
          },
        });
    }
  }
}
