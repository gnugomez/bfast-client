import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-create-new-workspace-dialog',
  templateUrl: './create-new-workspace-dialog.component.html',
  styleUrls: ['./create-new-workspace-dialog.component.scss'],
})
export class CreateNewWorkspaceDialog implements OnInit {
  public newWorkspaceForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  public loading: boolean = false;

  constructor(
    private modalService: ModalService,
    private workspaceService: WorkspaceService,
    @Inject(DATA) private data: any
  ) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {

    if (this.newWorkspaceForm.valid) {
      this.loading = true;
      this.workspaceService
        .create(
          this.newWorkspaceForm.value.name
        )
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
            if (err.status === 409) {
              this.newWorkspaceForm.setErrors({
                duplicate: true,
              });
            }
            if (err.status === 404) {
              this.newWorkspaceForm.setErrors({
                notFound: true,
              });
            }
          },
        });
    }
  }
}
