import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Organization } from 'src/app/shared/domain/Organization';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-workspace-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  public workspace = new BehaviorSubject<Workspace | null | undefined>(undefined)
  public activeOrganization?: Organization

  constructor(private workspaceService: WorkspaceService,
    private organizationService: OrganizationService,
    private route: ActivatedRoute) { }

  public onOutletLoaded(tab: any) {
    tab.workspace = this.workspace
  }

  ngOnInit(): void {
    this.organizationService.getActive()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(organization => {
        this.activeOrganization = organization

        this.workspace.next(undefined)

        this.route.params.subscribe((params) => {

          this.workspace.next(undefined)

          this.workspaceService.getSingleBySlug(params.slug).subscribe({
            next: (workspace) => {
              this.workspace.next(workspace)
            },
            error: () => {
              this.workspace.next(null)
            }
          });
        });
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
