import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { Schedule } from 'src/app/shared/domain/Schedule';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { AddNewScheduleDialogComponent } from './add-new-schedule-dialog/add-new-schedule-dialog.component';

@Component({
  selector: 'app-schedules-tab',
  templateUrl: './schedules-tab.component.html',
  styleUrls: ['./schedules-tab.component.scss']
})
export class SchedulesTabComponent implements OnInit {
  public workspace!: BehaviorSubject<Workspace>
  public activeOrganization?: Organization

  constructor(
    private organizationService: OrganizationService,
    private modalService: ModalService,
  ) {
    this.organizationService.getActive().subscribe(organization => {
      this.activeOrganization = organization
    })
  }

  ngOnInit(): void {
  }

  public addNewSchedule(): void {
    this.modalService.open(AddNewScheduleDialogComponent, { workspace: this.workspace });
  }

}
