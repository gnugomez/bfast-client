import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Schedule } from 'src/app/shared/domain/Schedule';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'workspace-schedule-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {
  @Input() public schedule!: Schedule
  @Input() public workspace!: BehaviorSubject<Workspace>
  public loading = false

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
  }

  public removeSchedule(schedule: Schedule): void {
    this.loading = true
    this.workspaceService.removeSchedule(this.workspace.value, schedule).subscribe({
      next: () => {
        this.workspaceService.getSingleBySlug(this.workspace.value.slug).subscribe((workspace) => {
          this.workspace?.next(workspace)
          this.loading = false
        })
      },
      error: () => {
        this.loading = false
      }
    })

  }

}
