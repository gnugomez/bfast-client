import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isPriviledged?: boolean;

  constructor(private organizationService: OrganizationService) {
    this.organizationService.isPrivileged().subscribe((isPriviledged) => {
      this.isPriviledged = isPriviledged;
    });
  }

  ngOnInit(): void {
  }

}
