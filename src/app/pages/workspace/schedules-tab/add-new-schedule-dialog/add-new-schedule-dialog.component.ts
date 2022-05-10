import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DATA } from 'src/app/components/modal/modal-outlet/modal-outlet.component';
import { ModalService } from 'src/app/components/modal/modal.service';
import { WorkspaceService } from 'src/app/shared/services/workspace.service';

@Component({
  selector: 'app-add-new-schedule-dialog',
  templateUrl: './add-new-schedule-dialog.component.html',
  styleUrls: ['./add-new-schedule-dialog.component.scss'],
})
export class AddNewScheduleDialogComponent implements OnInit {
  public newScheduleForm = new FormGroup({
    weekDay: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(6)]),
    startTime: new FormControl("", [Validators.required]),
    endTime: new FormControl("", [Validators.required]),
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
    if (this.newScheduleForm.valid) {
      this.loading = true;
      this.workspaceService.addSchedule(this.data.workspace.value, {
        weekday: this.newScheduleForm.value.weekDay,
        start_time: this.stringTimeToMinutes(this.newScheduleForm.value.startTime),
        end_time: this.stringTimeToMinutes(this.newScheduleForm.value.endTime),
      }).subscribe({
        next: () => {
          this.modalService.close();
          this.workspaceService.getSingleBySlug(this.data.workspace.value.slug).subscribe((workspace) => {
            this.data.workspace.next(workspace);
            this.workspaceService.loadSelf();
            this.loading = false;
          });
        },
        error: (err) => {
          this.loading = false;

          if (err.error?.errors && "start_time" in err.error.errors) {
            this.newScheduleForm.get("startTime")?.setErrors({
              invalid: true,
            });
          }
          if (err.error?.errors && "end_time" in err.error.errors) {
            this.newScheduleForm.get("endTime")?.setErrors({
              invalid: true,
            });
          }

          if (err.status === 409) {
            this.newScheduleForm.setErrors({
              conflict: true,
            });
            this.newScheduleForm.get('startTime')?.setErrors({
              conflict: true,
            })
            this.newScheduleForm.get('endTime')?.setErrors({
              conflict: true,
            })
          }
        },
      })
    }
  }

  public stringTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

}
