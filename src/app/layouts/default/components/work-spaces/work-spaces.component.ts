import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'layout-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.scss'],
})
export class WorkSpacesComponent implements OnInit {
  workspaces: Workspace[] | null = null;

  constructor(private workspaceService: WorkspaceService, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizationService.getActive().subscribe(() => {
      this.loadWorkspaces();
    });
  }

  private loadWorkspaces(): void {
    this.workspaceService.workspaces$.subscribe((workspaces) => {
      this.workspaces = workspaces;
    });
  }
}
