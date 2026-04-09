import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionContext } from '../models/auth.models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tenant-suspended',
  templateUrl: './tenant-suspended.component.html',
  styleUrls: ['./tenant-suspended.component.css'],
  standalone: false
})
export class TenantSuspendedComponent {
  get session(): SessionContext | null {
    return this.authService.getSessionSnapshot();
  }

  constructor(private authService: AuthService, private router: Router) {}

  switchTenant(tenantId: string): void {
    this.authService.switchTenant(tenantId).subscribe({
      next: (session) => {
        if (session.activeTenant?.tenantStatus === 'active') {
          this.router.navigate(['/workspace']);
        }
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
