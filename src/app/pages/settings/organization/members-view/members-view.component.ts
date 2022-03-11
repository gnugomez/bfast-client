import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss'],
})
export class MembersViewComponent implements OnInit {
  public activeOrganization?: Organization;
  public organizationMembers?: User[];

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.getActiveOrganization().subscribe({
      next: (val) => {
        this.activeOrganization = val;

        this.organizationService
          .getMembersFromOrganization(this.activeOrganization)
          .subscribe({
            next: (members) => {
              this.organizationMembers = members;
            },
          });
      },
    });
  }
}
