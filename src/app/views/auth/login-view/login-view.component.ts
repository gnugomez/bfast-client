import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
})
export class LoginViewComponent implements OnInit {
  public showPass = false;

  constructor() {}

  ngOnInit(): void {}

  public togglePass(): void {
    this.showPass = !this.showPass;
  }
}
