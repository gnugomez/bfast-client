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

  constructor(private http: HttpClient, private organizationService: OrganizationService) { }

  public getAllWorkspaces(): Observable<Workspace[]> {
    const organization = this.organizationService.getActiveOrganization().value;
    return this.http.get<Workspace[]>(`${API_URL}organizations/${organization?.id}/workspaces`);
  }

  public createWorkspace(name: string): Observable<any> {
    const organization = this.organizationService.getActiveOrganization().value;
    return this.http.post(`${API_URL}organizations/${organization?.id}/workspaces`, { name });
  }

  public deleteWorkspace(workspace: Workspace): Observable<any> {
    const organization = this.organizationService.getActiveOrganization().value;
    return this.http.delete(`${API_URL}organizations/${organization?.id}/workspaces/${workspace.id}`);
  }

}
