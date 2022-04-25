import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-add-new-member-dialog',
  templateUrl: './add-new-member-dialog.component.html',
  styleUrls: ['./add-new-member-dialog.component.scss'],
})
export class AddNewMemberDialogComponent implements OnInit {
  public newMemberForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
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

    if (this.newMemberForm.valid) {
      this.loading = true;
      this.workspaceService.addMember(this.data.workspace.value, this.newMemberForm.value.email).subscribe({
        next: () => {
          this.modalService.close();
          this.workspaceService.getSingle(this.data.workspace.value.slug).subscribe((workspace) => {
            this.data.workspace.next(workspace);
            this.workspaceService.loadSelf();
            this.loading = false;
          });
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 409) {
            this.newMemberForm.setErrors({
              duplicate: true,
            });
          }
          if (err.status === 404) {
            this.newMemberForm.setErrors({
              notFound: true,
            });
          }
        },
      });
    }
  }
}
