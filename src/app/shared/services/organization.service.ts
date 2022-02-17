import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private organizations?: Organization[];

  // Subjects
  private organizations$ = new Subject<Organization[]>();
  private activeOrganization$ = new Subject<Organization>();

  constructor(private http: HttpClient) {}

  public getOrganizations(
    params: { forceFetch: boolean } = { forceFetch: false }
  ): Subject<Organization[]> {
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
    if (this.organizations) {
      return new BehaviorSubject(this.organizations.length > 0);
    } else {
      return this.getOrganizations().pipe(
        map((organizations) => organizations.length > 0)
      );
    }
  }

  public getActiveOrganization(): Subject<Organization> {
    return this.activeOrganization$;
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

  public createOrganization(
    organization: Organization
  ): Observable<Organization> {
    return this.http.put<Organization>(API_URL + 'organizations', organization);
  }
}
