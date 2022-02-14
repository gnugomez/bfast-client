import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organization } from '../domain/Organization';

const API_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  constructor(private http: HttpClient) {}

  public getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(API_URL + 'organizations');
  }
}
