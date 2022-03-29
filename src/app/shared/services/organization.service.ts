import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';
import { AuthService } from './auth.service';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private organizations?: Organization[];

  // Subjects
  private organizations$ = new BehaviorSubject<Organization[] | null>(null);
  private activeOrganization$ = new BehaviorSubject<Organization | undefined>(
    undefined
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.listenEvent('logout', () => {
      this.clearActiveOrganization();
      this.organizations = undefined;
    });
  }

  public getOrganizations(
    params: { forceFetch: boolean } = { forceFetch: false }
  ): Observable<Organization[] | null> {
    if (!this.organizations || params.forceFetch) {
      this.http
        .get<Organization[]>(API_URL + 'organizations')
        .subscribe((organizations) => {
          this.organizations$.next(organizations);
          this.organizations = organizations;

          if (organizations.length > 0) {
            const activeOrganization = this.checkActiveOrganization();

            if (activeOrganization) {
              this.setActiveOrganization(activeOrganization);
            } else {
              this.setActiveOrganization(organizations[0]);
            }
          }
        });
    }
    return this.organizations$;
  }

  public haveOrganizations(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getOrganizations().subscribe((organizations) => {
        if (organizations) {
          observer.next(organizations?.length > 0);
        }
      });
    });
  }

  public getActiveOrganization(): BehaviorSubject<Organization | undefined> {
    return this.activeOrganization$;
  }

  public isPrivileged(): Observable<boolean> {
    return this.activeOrganization$.pipe(
      map((organization) => {
        return organization?.pivot?.role === 'admin' || organization?.pivot?.role === 'owner';
      }
      ));
  }

  public setActiveOrganization(organization: Organization): void {
    if (this.organizations) {
      this.organizations.sort((a, b) => {
        if (a.id === organization.id) {
          return -1;
        } else if (b.id === organization.id) {
          return 1;
        } else {
          return 0;
        }
      });
      this.organizations$.next(this.organizations);
    }

    if (organization) {
      localStorage.setItem('activeOrganization', JSON.stringify(organization));
      this.activeOrganization$.next(organization);
    } else {
      this.clearActiveOrganization();
      this.router.navigate(['/organization/not-found']);
    }
  }

  public clearActiveOrganization(): void {
    localStorage.removeItem('activeOrganization');
  }

  private checkActiveOrganization(): Organization | null {
    const activeOrganization = localStorage.getItem('activeOrganization');

    if (activeOrganization) {
      return JSON.parse(activeOrganization);
    } else {
      return null;
    }
  }

  public createOrganization(organization: Organization): Observable<any> {
    const newOrganization = this.http.post(
      API_URL + 'organizations',
      organization
    );
    return newOrganization;
  }

  public deleteOrganization(organization: Organization): Observable<any> {
    return new Observable<void>((observer) => {
      this.http
        .delete(API_URL + 'organizations/' + organization.id)
        .subscribe(() => {
          this.organizations = this.organizations?.filter(
            (org) => org.id !== organization.id
          );
          if (this.organizations) {
            this.organizations$.next(this.organizations);
            this.setActiveOrganization(this.organizations[0]);
          }
          observer.next();
        });
    });
  }

  public getMembersFromOrganization(
    organization: Organization | undefined
  ): Observable<any> {
    if (organization) {
      return this.http.get(
        API_URL + 'organizations/' + organization.id + '/members'
      );
    } else {
      return new Observable<any>();
    }
  }

  public addMemberToOrganization(
    organization: Organization | undefined,
    email: string
  ): Observable<any> {
    if (organization) {
      return this.http.put(
        API_URL + 'organizations/' + organization.id + '/members',
        { user_email: email }
      );
    } else {
      return new Observable<any>();
    }
  }
}
