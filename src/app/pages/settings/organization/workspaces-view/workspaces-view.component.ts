import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import toggleAnimation from 'src/app/layouts/default/animations/toggleAnimation';
import { Organization } from 'src/app/shared/domain/Organization';
import { User } from 'src/app/shared/domain/User';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { AddNewDialogComponent } from '../members-view/add-new-dialog/add-new-dialog.component';

@Component({
  selector: 'app-workspaces-view',
  templateUrl: './workspaces-view.component.html',
  styleUrls: ['./workspaces-view.component.scss'],
  animations: [
    toggleAnimation
  ]
})
export class WorkspacesViewComponent implements OnInit {
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
    this.modalService.open(AddNewDialogComponent, { members: this.organizationMembers, org: this.activeOrganization });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
