import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import toggleAnimation from 'src/app/layouts/default/animations/toggleAnimation';
import { User } from 'src/app/shared/domain/User';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'workspace-role-dropdown',
  templateUrl: './role-dropdown.component.html',
  styleUrls: ['./role-dropdown.component.scss'],
  animations: [
    toggleAnimation
  ]
})
export class RoleDropdownComponent implements OnInit {
  @Input() user!: User;
  @Input() workspace!: BehaviorSubject<Workspace | null | undefined>;

  public loading: boolean = false;

  constructor(private workspaceService: WorkspaceService) { }

  ngOnInit(): void {
  }

  public updateRole(role: string): void {
    if (this.workspace.value) {
      this.loading = true

      this.workspaceService.updateUserRole(this.workspace.value, this.user, role).subscribe(
        {
          next: () => {
            this.user.role = role;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        }
      )
    }
  }

}
