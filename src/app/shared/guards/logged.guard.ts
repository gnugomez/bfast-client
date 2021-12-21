import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      const url: string = state.url;

      this.authService.redirectUrl = url;

      this.router.navigate(['/404']);

      return false;
    }

    return true;
  }
}
