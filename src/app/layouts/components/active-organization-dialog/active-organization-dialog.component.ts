import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-active-organization-dialog',
  templateUrl: './active-organization-dialog.component.html',
  styleUrls: ['./active-organization-dialog.component.scss'],
})
export class ActiveOrganizationDialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public activeOrganization?: Organization;
  public members?: User[];
  public loading = { delete: false };

  constructor(
    private organizationService: OrganizationService,
    private modalService: ModalService
  ) {
    this.activeOrganization =
      this.organizationService.getActiveOrganization().value;
    this.organizationService
      .getMembersFromOrganization(this.activeOrganization)
      .subscribe({
        next: (members) => (this.members = members),
      });
  }

  public deleteOrganization() {
    if (this.activeOrganization) {
      this.loading.delete = true;
      this.organizationService
        .deleteOrganization(this.activeOrganization)
        .subscribe({
          next: () => {
            this.modalService.close();
          },
        });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
