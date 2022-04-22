import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';
import { Workspace } from '../domain/Workspace';
import { OrganizationService } from './organization.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private organization?: Organization;

  constructor(private http: HttpClient, private organizationService: OrganizationService) {
    this.organizationService.getActive().subscribe((organization) => {
      this.organization = organization;
    });
  }

  /**
   * It returns an observable of an array of Workspaces
   * @returns An observable of an array of Workspaces
   */
  public getAll(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces`);
  }

  /**
   * This function returns an observable of an array of Workspace objects of the self user.
   * @returns An observable of an array of Workspaces
   */
  public getSelf(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces/self`);
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

}
