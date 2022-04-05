import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
    this.organizationService.getActiveOrganization().subscribe((organization) => {
      this.organization = organization;
    });
  }

  public getAll(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces`);
  }

  public getSelf(): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${this.organization?.id}/workspaces/self`);
  }

  public create(name: string): Observable<any> {
    return this.http.post(`${API_URL}organizations/${this.organization?.id}/workspaces`, { name });
  }

  public delete(workspace: Workspace): Observable<any> {
    return this.http.delete(`${API_URL}organizations/${this.organization?.id}/workspaces/${workspace.id}`);
  }

}
