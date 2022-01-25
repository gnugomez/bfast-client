import { Component, OnInit } from '@angular/core';
import toggleAnimation from '../../animations/toggleAnimation';

@Component({
  selector: 'layout-organization-swapper',
  templateUrl: './organization-swapper.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./organization-swapper.component.scss'],
})
export class OrganizationSwapperComponent implements OnInit {
  public organizations = [
    {
      id: 1,
      name: 'Organization 1 dsad sadsdadasdad sd dasdasdas asd a',
    },
    {
      id: 2,
      name: 'Organization 2',
    },
    {
      id: 3,
      name: 'Organization 3',
    },
  ];

  public activeOrganization: { id: number; name: string } =
    this.organizations[0];

  public isOpen: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  public closeDropdown() {
    this.isOpen = false;
  }

  // selects the organization and puts it the first in the list
  public selectOrganization(organization: { id: number; name: string }) {
    this.activeOrganization = organization;
    this.organizations.unshift(
      this.organizations.splice(this.organizations.indexOf(organization), 1)[0]
    );
  }
}
