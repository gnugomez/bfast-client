import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import toggleAnimation from 'src/app/layouts/default/animations/toggleAnimation';
import { Organization } from 'src/app/shared/domain/Organization';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.scss'],
  animations: [
    toggleAnimation
  ]
})
export class UsersTabComponent implements OnInit {
  public workspace?: BehaviorSubject<Workspace | null | undefined>
  public activeOrganization?: Organization

  constructor(private organizationService: OrganizationService) {
    this.organizationService.getActive().subscribe(organization => {
      this.activeOrganization = organization
    })
  }

  ngOnInit(): void {
  }

}
