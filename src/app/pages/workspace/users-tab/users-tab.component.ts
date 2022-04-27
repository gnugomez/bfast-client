import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { AddNewMemberDialogComponent } from './add-new-member-dialog/add-new-member-dialog.component';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.scss'],
})
export class UsersTabComponent implements OnInit {
  public workspace!: BehaviorSubject<Workspace | null | undefined>
  public activeOrganization?: Organization

  constructor(private organizationService: OrganizationService, private modalService: ModalService) {
    this.organizationService.getActive().subscribe(organization => {
      this.activeOrganization = organization
    })
  }

  ngOnInit(): void {
  }

  public addNewMember(): void {
    this.modalService.open(AddNewMemberDialogComponent, { workspace: this.workspace });
  }

}
