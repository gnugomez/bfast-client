import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import toggleAnimation from '../../animations/toggleAnimation';
import { ActiveOrganizationDialogComponent } from '../active-organization-dialog/active-organization-dialog.component';

@Component({
  selector: 'layout-organization-swapper',
  templateUrl: './organization-swapper.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./organization-swapper.component.scss'],
})
export class OrganizationSwapperComponent implements OnInit {
  public organizations?: Organization[] | null;

  public activeOrganization?: Organization;

  public isOpen: boolean = false;

  constructor(
    private organizationService: OrganizationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((organizations) => {
      this.organizations = organizations;
    });
    this.organizationService
      .getActiveOrganization()
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

  public openActiveOrganizationDialog() {
    this.modalService.open(ActiveOrganizationDialogComponent);
  }

  // selects the organization and puts it the first in the list
  public selectOrganization(organization: Organization) {
    if (this.activeOrganization?.id !== organization.id) {
      console.log('selectOrganization', organization);

      this.organizationService.setActiveOrganization(organization);
    }
  }
}
