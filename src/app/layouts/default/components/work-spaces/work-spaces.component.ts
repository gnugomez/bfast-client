import { Component, OnInit } from '@angular/core';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';
import items from './workSpaces';

@Component({
  selector: 'layout-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.scss'],
})
export class WorkSpacesComponent implements OnInit {
  workspaces: Workspace[] | null = null;

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
    this.workspaceService.getSelf().subscribe({
      next: (workspaces) => {
        this.workspaces = workspaces;
      },
    });
  }
}
