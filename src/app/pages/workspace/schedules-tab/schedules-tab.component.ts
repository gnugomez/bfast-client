import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { AddNewScheduleDialogComponent } from './add-new-schedule-dialog/add-new-schedule-dialog.component';

@Component({
  selector: 'app-schedules-tab',
  templateUrl: './schedules-tab.component.html',
  styleUrls: ['./schedules-tab.component.scss']
})
export class SchedulesTabComponent implements OnInit {
  public workspace!: BehaviorSubject<Workspace | null | undefined>
  public activeOrganization?: Organization

  constructor(private organizationService: OrganizationService, private modalService: ModalService) {
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
