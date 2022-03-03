import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-active-organization-dialog',
  templateUrl: './active-organization-dialog.component.html',
  styleUrls: ['./active-organization-dialog.component.scss'],
})
export class ActiveOrganizationDialogComponent implements OnInit {
  public activeOrganization?: Organization;
  public members?: User[];

  constructor(private organizationService: OrganizationService) {
    this.organizationService
      .getActiveOrganization()
      .subscribe((organization) => {
        this.activeOrganization = organization;

        this.organizationService
          .getMembersFromOrganization(this.activeOrganization)
          .subscribe((members) => {
            this.members = members;
          });
      });
  }

  ngOnInit(): void {}
}
