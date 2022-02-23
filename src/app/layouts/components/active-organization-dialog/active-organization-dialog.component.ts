import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-organization-dialog',
  templateUrl: './active-organization-dialog.component.html',
  styleUrls: ['./active-organization-dialog.component.scss'],
})
export class ActiveOrganizationDialogComponent implements OnInit {
  public isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  open() {
    this.isOpen = true;
    console.log(this.isOpen);
  }
  close() {
    this.isOpen = false;
  }
}
