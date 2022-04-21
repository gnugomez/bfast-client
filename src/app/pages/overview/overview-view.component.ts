import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: ['./overview-view.component.scss']
})
export class OverviewViewComponent implements OnInit {
  public user?: User;
  public activeOrganization?: Organization;

  constructor(private userService: UserService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => this.user = user);
    this.organizationService.getActive().subscribe(organization => this.activeOrganization = organization);
  }

}
