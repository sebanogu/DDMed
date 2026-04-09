import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { getBackendBaseUrl } from '../auth-api-base';
import { AuthResponse, SessionContext, SessionResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenStorageKey = 'ddmed.auth.token';
  private readonly backendBaseUrl = getBackendBaseUrl();
  private readonly sessionSubject = new BehaviorSubject<SessionContext | null>(null);
  private readonly initializedSubject = new BehaviorSubject<boolean>(false);

  readonly session$ = this.sessionSubject.asObservable();
  readonly initialized$ = this.initializedSubject.asObservable();

  constructor(private http: HttpClient) {}

  bootstrapSession(): Observable<SessionContext | null> {
    const token = this.getToken();
    if (!token) {
      this.clearSessionState();
      this.initializedSubject.next(true);
      return of(null);
    }

    return this.http.get<SessionResponse>(`${this.backendBaseUrl}/api/auth/session`).pipe(
      map((response) => response.session),
      tap((session) => {
        this.sessionSubject.next(session);
        this.initializedSubject.next(true);
      }),
      catchError(() => {
        this.clearSessionState();
        this.initializedSubject.next(true);
        return of(null);
      })
    );
  }

  login(email: string, password: string, tenantId?: string): Observable<SessionContext> {
    return this.http.post<AuthResponse>(`${this.backendBaseUrl}/api/auth/login`, {
      email,
      password,
      tenantId: tenantId || null,
    }).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenStorageKey, response.token);
        this.sessionSubject.next(response.session);
        this.initializedSubject.next(true);
      }),
      map((response) => response.session)
    );
  }

  logout(): Observable<void> {
    return this.http.post(`${this.backendBaseUrl}/api/auth/logout`, {}).pipe(
      tap(() => this.clearSessionState()),
      map(() => void 0),
      catchError(() => {
        this.clearSessionState();
        return of(void 0);
      })
    );
  }

  switchTenant(tenantId: string): Observable<SessionContext> {
    return this.http.post<SessionResponse>(`${this.backendBaseUrl}/api/auth/switch-tenant`, { tenantId }).pipe(
      map((response) => response.session),
      tap((session) => this.sessionSubject.next(session))
    );
  }

  getSessionSnapshot(): SessionContext | null {
    return this.sessionSubject.value;
  }

  isInitialized(): boolean {
    return this.initializedSubject.value;
  }

  isAuthenticatedSnapshot(): boolean {
    return !!this.sessionSubject.value?.user;
  }

  isTenantSuspendedSnapshot(): boolean {
    return this.sessionSubject.value?.activeTenant?.tenantStatus === 'suspended';
  }

  hasPermission(permission: string): boolean {
    return this.sessionSubject.value?.effectivePermissions.includes(permission) ?? false;
  }

  clearSessionState(): void {
    localStorage.removeItem(this.tokenStorageKey);
    this.sessionSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }
}
