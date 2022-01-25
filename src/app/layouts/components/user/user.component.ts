import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import toggleAnimation from '../../animations/toggleAnimation';

@Component({
  selector: 'layout-user',
  templateUrl: './user.component.html',
  animations: [toggleAnimation],
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  public logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {}
}
