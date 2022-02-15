import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

@Injectable({
  providedIn: 'root',
})
export class HaveOrganizationGuard implements CanActivate {
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
    const haveOrganization = this.organizationService
      .getOrganizations()
      .pipe(map((organizations) => organizations.length > 0));

    return haveOrganization.pipe(
      map((res) => {
        if (!res) {
          this.router.navigate(['/organization-not-found']);
        }
        return res;
      })
    );
  }
}
