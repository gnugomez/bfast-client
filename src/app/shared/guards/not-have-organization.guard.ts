import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, skip } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

@Injectable({
  providedIn: 'root',
})
export class NotHaveOrganizationGuard implements CanActivate {
  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.organizationService.haveOrganizations().pipe(
      map((haveOrganizations) => {
        if (haveOrganizations) {
          this.router.navigate(['/404']);
        }
        return !haveOrganizations;
      })
    );
  }
}
