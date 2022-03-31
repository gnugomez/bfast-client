import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

@Injectable({
  providedIn: 'root'
})
export class IsPrivilegedGuard implements CanActivate {

  constructor(private organizationService: OrganizationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.organizationService.isPrivileged().pipe(
      map((isPrivileged) => {
        if (!isPrivileged) {
          this.router.navigate(['/404']);
        }
        return isPrivileged;
      })
    );
  }

}
