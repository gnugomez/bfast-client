import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { Workspace } from 'src/app/shared/domain/Workspace';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-delete-workspace-dialog',
  templateUrl: './delete-workspace-dialog.component.html',
  styleUrls: ['./delete-workspace-dialog.component.scss'],
})
export class DeleteWorkspaceDialog implements OnInit {
  public deleteWorkspaceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public loading: boolean = false;

  public workspace: Workspace;

  constructor(
    private modalService: ModalService,
    private workspaceService: WorkspaceService,
    @Inject(DATA) private data: any
  ) {
    this.workspace = this.data.workspace;
  }

  ngOnInit(): void {
  }

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {

    if (this.deleteWorkspaceForm.valid) {

      if (this.deleteWorkspaceForm.value.name === this.workspace.name) {
        this.loading = true;
        this.workspaceService
          .delete(this.workspace)
          .subscribe({
            next: (res) => {
              this.workspaceService.getAll().subscribe({
                next: (workspaces) => {
                  this.data.workspaces.next(workspaces);
                  this.modalService.close();
                  this.loading = false;
                },
              });
            },
            error: (err) => {
              this.loading = false;
              this.deleteWorkspaceForm.get("name")?.setErrors({
                somethingWrong: true,
              });
            },
          });
      } else {
        this.deleteWorkspaceForm.get("name")?.setErrors({
          wrongName: true,
        });
      }
    }
  }
}
