import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-add-new-member-dialog',
  templateUrl: './add-new-member-dialog.component.html',
  styleUrls: ['./add-new-member-dialog.component.scss'],
})
export class AddNewMemberDialogComponent implements OnInit {
  public newMemberForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  public loading: boolean = false;

  constructor(
    private modalService: ModalService,
    public organizationService: OrganizationService,
    @Inject(DATA) private data: any
  ) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {

    if (this.newMemberForm.valid) {
      this.loading = true;
      this.organizationService
        .addMemberToOrganization(
          this.organizationService.getActive().value,
          this.newMemberForm.value.email
        )
        .subscribe({
          next: (res) => {
            this.organizationService.getMembersFromOrganization(this.data.org).subscribe({
              next: (members) => {
                this.data.members.next(members);
                this.modalService.close();
                this.loading = false;
              },
            });
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
