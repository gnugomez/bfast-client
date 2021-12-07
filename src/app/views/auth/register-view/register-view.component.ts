import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss'],
})
export class RegisterViewComponent implements OnInit {
  public showPass = false;

  constructor() {}

  ngOnInit(): void {}

  public togglePass(): void {
    this.showPass = !this.showPass;
  }
}
