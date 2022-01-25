import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/domain/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import toggleAnimation from '../../animations/toggleAnimation';

@Component({
  selector: 'layout-user',
  templateUrl: './user.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public user?: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getMe().subscribe((user) => {
      this.user = user;
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {}
}
