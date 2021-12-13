import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  animations: [
    trigger('fadeRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate(
          '500ms ease-in-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0, transform: 'translateX(20px)' })),
      ]),
    ]),
  ],
})
export class LoginViewComponent implements OnInit {
  public showPass = false;
  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  public loading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  public togglePass(): void {
    this.showPass = !this.showPass;
  }

  public submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.auth.login(this.loginForm.value).subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
        (err) => {
          this.loginForm.setErrors({ invalidLogin: true });
          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      );
    }
  }
}
