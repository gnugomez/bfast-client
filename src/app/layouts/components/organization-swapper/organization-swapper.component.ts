import { Component, OnInit } from '@angular/core';
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
  public organizations?: Organization[];

  public activeOrganization?: Organization;

  public isOpen: boolean = false;

  constructor(private organizationService: OrganizationService) {
    this.organizationService.getOrganizations().subscribe((organizations) => {
      this.organizations = organizations;
    });
    this.organizationService
      .getActiveOrganization()
      .subscribe((organization) => {
        this.activeOrganization = organization;
      });
  }

  ngOnInit(): void {}

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public closeDropdown() {
    this.isOpen = false;
  }

  // selects the organization and puts it the first in the list
  public selectOrganization(organization: Organization) {
    this.organizationService.setActiveOrganization(organization);
  }
}
