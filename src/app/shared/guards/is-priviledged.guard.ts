import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationService } from '../services/organization.service';

@Injectable({
  providedIn: 'root'
})
export class IsPriviledgedGuard implements CanActivate {

  constructor(private organizationService: OrganizationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.organizationService.isPrivileged();
  }

}
