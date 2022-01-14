import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-swapper',
  templateUrl: './organization-swapper.component.html',
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

  public selectOrganization(organization: { id: number; name: string }) {
    this.activeOrganization = organization;
  }
}
