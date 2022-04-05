import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ModalService } from 'src/app/components/modal/modal.service';
import toggleAnimation from 'src/app/layouts/default/animations/toggleAnimation';
import { Organization } from 'src/app/shared/domain/Organization';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import { CreateNewWorkspaceDialog } from './create-new-workspace-dialog/create-new-workspace-dialog.component';
import { DeleteWorkspaceDialog } from './delete-workspace-dialog/delete-workspace-dialog.component';

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
  public organizationWorkspaces = new BehaviorSubject<Workspace[] | null>(null);

  constructor(
    private organizationService: OrganizationService,
    private workspaceService: WorkspaceService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.organizationService
      .getActiveOrganization()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (active) => {
          if (!active?.privileged) {
            this.router.navigate(['/settings']);
          }

          this.activeOrganization = active;
          this.organizationWorkspaces.next(null);

          if (active) {
            this.workspaceService.getAllWorkspaces().subscribe({
              next: (workspaces) => {
                this.organizationWorkspaces.next(workspaces);
              }
            });
          }
        },
      });
  }

  public createWorkspace(): void {
    this.modalService.open(CreateNewWorkspaceDialog, { workspaces: this.organizationWorkspaces, org: this.activeOrganization });
  }

  public deleteWorkspace(workspace: Workspace): void {
    this.modalService.open(DeleteWorkspaceDialog, { workspace, org: this.activeOrganization, workspaces: this.organizationWorkspaces });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
