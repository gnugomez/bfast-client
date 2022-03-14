import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/components/modal/modal.service';

@Component({
  selector: 'app-add-new-dialog',
  templateUrl: './add-new-dialog.component.html',
  styleUrls: ['./add-new-dialog.component.scss'],
})
export class AddNewDialogComponent implements OnInit {
  public newMemberForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public loading: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  public cancel() {
    this.modalService.close();
  }

  public onSubmit() {
    if (this.newMemberForm.valid) {
      this.loading = true;
      this.modalService.close();
    }
  }
}
