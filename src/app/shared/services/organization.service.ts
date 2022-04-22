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
      this.clearActive();
      this.organizations = undefined;
    });
  }

  public getAll(
    params: { forceFetch: boolean } = { forceFetch: false }
  ): Observable<Organization[] | null> {
    if (!this.organizations || params.forceFetch) {
      this.http
        .get<Organization[]>(API_URL + 'organizations')
        .subscribe((organizations) => {
          this.organizations$.next(organizations);
          this.organizations = organizations;

          if (organizations.length > 0) {
            const activeOrganization = this.checkActive();

            if (activeOrganization) {
              this.setActive(activeOrganization);
            } else {
              this.setActive(organizations[0]);
            }
          }
        });
    }
    return this.organizations$;
  }

  public haveOrganizations(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getAll().subscribe((organizations) => {
        if (organizations) {
          observer.next(organizations?.length > 0);
        }
      });
    });
  }

  /**
   * It returns a BehaviorSubject that emits the current active organization
   * @returns BehaviorSubject<Organization | undefined>
   */
  public getActive(): BehaviorSubject<Organization | undefined> {
    return this.activeOrganization$;
  }


  /**
   * "If the user is logged in, return the value of the 'privileged' property of the active
   * organization."
   * 
   * The function isPrivileged() returns an Observable<boolean> which is a stream of boolean values
   * @returns Observable<boolean>
   */
  public isPrivileged(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.getActive().subscribe((organization) => {
        if (organization) {
          const privileged = organization.privileged;
          observer.next(privileged);
        }
      }
      );
    });
  }

  /**
   * It sorts the organizations array by the active organization, then sets the active organization in
   * local storage and in the activeOrganization$ BehaviorSubject
   * @param {Organization} organization - Organization - The organization to set as active
   */
  public setActive(organization: Organization): void {
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
      localStorage.setItem('activeOrganization', JSON.stringify(organization.id));
      this.activeOrganization$.next(organization);
    } else {
      this.clearActive();
      this.router.navigate(['/organization/not-found']);
    }
  }

  /**
   * It removes the activeOrganization from localStorage
   */
  public clearActive(): void {
    localStorage.removeItem('activeOrganization');
  }

  /**
   * If there is an active organization in local storage, return it, otherwise return null
   * @returns The active organization or null
   */
  private checkActive(): Organization | null {
    const activeOrganization = localStorage.getItem('activeOrganization');

    if (activeOrganization) {
      const org = this.organizations?.find((org) => org.id === Number(activeOrganization))
      return org ? org : null;
    } else {
      return null;
    }
  }

  /**
   * This function takes an Organization object as a parameter, and returns an Observable of type any
   * @param {Organization} organization - Organization - this is the object that we're passing in to
   * the function.
   * @returns Observable<any>
   */
  public create(organization: Organization): Observable<any> {
    const newOrganization = this.http.post(
      API_URL + 'organizations',
      organization
    );
    return newOrganization;
  }

  /**
   * It makes a DELETE request to the API, and if the request is successful, it removes the
   * organization from the list of organizations and sets the first organization in the list as the
   * active organization
   * @param {Organization} organization - Organization - this is the organization object that we want
   * to delete.
   * @returns An observable of void
   */
  public delete(organization: Organization): Observable<any> {
    return new Observable<void>((observer) => {
      this.http
        .delete(API_URL + 'organizations/' + organization.id)
        .subscribe(() => {
          this.organizations = this.organizations?.filter(
            (org) => org.id !== organization.id
          );
          if (this.organizations) {
            this.organizations$.next(this.organizations);
            this.setActive(this.organizations[0]);
          }
          observer.next();
        });
    });
  }

  /**
   * It returns an observable of the members of an organization
   * @param {Organization | undefined} organization - Organization | undefined
   * @returns An observable of any type.
   */
  public getMembers(
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

  /**
   * "If the organization is defined, then add the user to the organization."
   * 
   * The function takes two parameters: an organization and an email. The function returns an
   * Observable of any type
   * @param {Organization | undefined} organization - Organization | undefined
   * @param {string} email - The email of the user you want to add to the organization.
   * @returns An observable of any type.
   */
  public addMember(
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
