import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';
import { AuthService } from './auth.service';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private organizations?: Organization[];

  // Subjects
  private organizations$ = new ReplaySubject<Organization[]>();
  private activeOrganization$ = new ReplaySubject<Organization>();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.listenEvent('logout', () => {
      this.clearActiveOrganization();
      this.organizations = undefined;
    });
  }

  public getOrganizations(
    params: { forceFetch: boolean } = { forceFetch: false }
  ): Subject<Organization[]> {
    if (!this.organizations || params.forceFetch) {
      this.organizations$ = new ReplaySubject<Organization[]>();

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
    return this.getOrganizations({ forceFetch: true }).pipe(
      map((organizations) => organizations.length > 0)
    );
  }

  public getActiveOrganization(): Observable<Organization> {
    return this.activeOrganization$.asObservable();
  }

  public setActiveOrganization(organization: Organization): void {
    this.activeOrganization$.next(organization);

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

    localStorage.setItem('activeOrganization', JSON.stringify(organization));
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
    const newOrganization = this.http.put(
      API_URL + 'organizations',
      organization
    );
    return newOrganization;
  }

  public getMembersFromOrganization(
    organization: Organization
  ): Observable<any> {
    return this.http.get(
      API_URL + 'organizations/' + organization.id + '/members'
    );
  }
}
