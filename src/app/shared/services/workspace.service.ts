import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';
import { User } from '../domain/User';
import { Workspace } from '../domain/Workspace';
import { AuthService } from './auth.service';
import { OrganizationService } from './organization.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private organization?: Organization;
  private selfWorkspaces = new BehaviorSubject<Workspace[] | null>(null);

  constructor(
    private http: HttpClient,
    private organizationService: OrganizationService,
    private authService: AuthService
  ) {
    this.organizationService.getActive().subscribe((organization) => {
      this.organization = organization;
    });

    this.authService.listenEvent('logout', () => {
      this.selfWorkspaces.next(null);
    });
  }

  /**
   * If the user has not yet loaded their workspaces, load them and then return the workspaces
   * @returns A BehaviorSubject that is either null or an array of Workspaces.
   */
  get workspaces$(): BehaviorSubject<Workspace[] | null> {
    this.loadSelf();
    return this.selfWorkspaces;
  }

  /**
   * It subscribes to the observable returned by the getSelf() function, and when the observable emits
   * a value, it updates the selfWorkspaces subject with the value
   */
  public loadSelf(): void {
    this.getSelf().subscribe((workspaces) => {
      this.selfWorkspaces.next(workspaces);
    });
  }

  /**
   * It returns an observable of an array of Workspaces
   * @returns An observable of an array of Workspaces
   */
  public getAll(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces`)
  }

  /**
   * This function returns an observable of an array of Workspace objects of the self user.
   * @returns An observable of an array of Workspaces
   */
  public getSelf(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces/self`)
  }

  /**
   * It creates a new workspace in the current organization
   * @param {string} name - The name of the workspace you want to create.
   * @returns Observable<any>
   */
  public create(name: string): Observable<any> {
    return this.http.post(`${API_URL}organizations/${this.organization?.id}/workspaces`, { name });
  }

  /**
   * It makes a DELETE request to the API to delete the workspace
   * @param {Workspace} workspace - Workspace - The workspace object that you want to delete.
   * @returns Observable<any>
   */
  public delete(workspace: Workspace): Observable<any> {
    return this.http.delete(`${API_URL}organizations/${this.organization?.id}/workspaces/${workspace.id}`);
  }

  /**
   * "Get a single workspace by its slug."
   * 
   * The function takes a single parameter, `workspaceSlug`, which is the slug of the workspace we want
   * to get
   * @param {string} workspaceSlug - The slug of the workspace you want to get.
   * @returns An observable of type Workspace
   */
  public getSingle(workspaceSlug: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${API_URL}organizations/${this.organization?.id}/workspaces/${workspaceSlug}`);
  }

  /**
   * It makes a PUT request to the API to add a member to a workspace
   * @param {Workspace} workspace - Workspace, userEmail: string
   * @param {string} userEmail - The email of the user you want to add to the workspace.
   * @returns Observable<any>
   */
  public addMember(workspace: Workspace, userEmail: string): Observable<any> {
    return this.http.put(`${API_URL}organizations/${this.organization?.id}/workspaces/${workspace.id}/members`, { user_email: userEmail });
  }

  public updateUserRole(workspace: Workspace, user: User, role: string): Observable<any> {
    return this.http.patch(`${API_URL}organizations/${this.organization?.id}/workspaces/${workspace.id}/members/${user.id}`, { role });
  }

}
