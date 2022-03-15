import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { AddNewDialogComponent } from './add-new-dialog/add-new-dialog.component';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss'],
})
export class MembersViewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public activeOrganization?: Organization;
  public organizationMembers = new BehaviorSubject<User[]>([]);

  constructor(
    private organizationService: OrganizationService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.organizationService
      .getActiveOrganization()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (val) => {
          this.activeOrganization = val;
          this.organizationMembers.next([]);
          this.organizationService
            .getMembersFromOrganization(this.activeOrganization)
            .subscribe({
              next: (members) => {
                this.organizationMembers.next(members);
              },
            });
        },
      });
  }

  public addNewMember(): void {
    this.modalService.open(AddNewDialogComponent, { members: this.organizationMembers, org: this.activeOrganization });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
