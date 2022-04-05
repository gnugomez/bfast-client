import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import toggleAnimation from 'src/app/layouts/default/animations/toggleAnimation';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { AddNewMemberDialogComponent } from './add-new-member-dialog/add-new-member-dialog.component';

@Component({
  selector: 'app-members-view',
  templateUrl: './members-view.component.html',
  styleUrls: ['./members-view.component.scss'],
  animations: [toggleAnimation]
})
export class MembersViewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public activeOrganization?: Organization;
  public organizationMembers = new BehaviorSubject<User[]>([]);

  constructor(
    private organizationService: OrganizationService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.organizationService
      .getActiveOrganization()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (val) => {
          if (!val?.privileged) {
            this.router.navigate(['/settings']);
            return;
          }

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
    this.modalService.open(AddNewMemberDialogComponent, { members: this.organizationMembers, org: this.activeOrganization });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
