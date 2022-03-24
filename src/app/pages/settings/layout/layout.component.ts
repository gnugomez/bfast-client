import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isPriviledged?: boolean;
  public isSettingsPage?: boolean;

  constructor(private organizationService: OrganizationService, private router: Router) {
    this.organizationService.isPrivileged().subscribe((isPriviledged) => {
      this.isPriviledged = isPriviledged;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSettingsPage = event.url === '/settings';
      }
    });
  }

  ngOnInit(): void {
  }

}
