import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getBackendBaseUrl } from '../../auth/auth-api-base';
import { WorkspaceSummary } from '../../auth/models/auth.models';

@Injectable()
export class WorkspaceApiService {
  private readonly backendBaseUrl = getBackendBaseUrl();

  constructor(private http: HttpClient) {}

  getSummary(): Observable<WorkspaceSummary> {
    return this.http.get<WorkspaceSummary>(`${this.backendBaseUrl}/api/workspace/summary`);
  }

  getAdminWorkspace(): Observable<any> {
    return this.http.get<any>(`${this.backendBaseUrl}/api/workspace/admin`);
  }

  getClinicalWorkspace(): Observable<any> {
    return this.http.get<any>(`${this.backendBaseUrl}/api/workspace/clinical`);
  }

  getSupportWorkspace(): Observable<any> {
    return this.http.get<any>(`${this.backendBaseUrl}/api/workspace/support`);
  }
}
