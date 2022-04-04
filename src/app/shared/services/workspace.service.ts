import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workspace } from '../domain/Workspace';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private http: HttpClient) { }

  public getAllWorkspaces(organizationId: number): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${API_URL}organizations/${organizationId}/workspaces`);
  }

}
