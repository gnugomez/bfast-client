import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
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

  ngOnInit(): void {
    console.log(this.loginForm);
  }

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
