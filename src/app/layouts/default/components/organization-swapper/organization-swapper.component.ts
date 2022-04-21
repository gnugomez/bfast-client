import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import toggleAnimation from '../../animations/toggleAnimation';

@Component({
  selector: 'layout-organization-swapper',
  templateUrl: './organization-swapper.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./organization-swapper.component.scss'],
})
export class OrganizationSwapperComponent implements OnInit {
  public organizations?: Organization[] | null;
  public isPrivileged?: boolean;

  public activeOrganization?: Organization;

  public isOpen: boolean = false;

  constructor(
    private organizationService: OrganizationService,
  ) {
    this.organizationService.isPrivileged().subscribe((isPrivileged) => {
      this.isPrivileged = isPrivileged;
    });
  }

  ngOnInit(): void {
    this.organizationService.getAll().subscribe((organizations) => {
      this.organizations = organizations;
    });
    this.organizationService
      .getActive()
      .subscribe((organization) => {
        this.activeOrganization = organization;
      });
  }

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public closeDropdown() {
    this.isOpen = false;
  }

  // selects the organization and puts it the first in the list
  public selectOrganization(organization: Organization) {
    if (this.activeOrganization?.id !== organization.id) {
      this.organizationService.setActive(organization);
    }
  }
}
