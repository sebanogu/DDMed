import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PublicTenant } from '../models/auth.models';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  readonly demoUsers = [
    { email: 'alex.owner@ddmed.test', password: 'Demo123!', label: 'Owner + Clinician, active and suspended tenants' },
    { email: 'bianca.admin@ddmed.test', password: 'Demo123!', label: 'Admin in one tenant, Clinician + Staff in another' },
    { email: 'sam.support@ddmed.test', password: 'Demo123!', label: 'Support operator across multiple tenants' },
  ];

  readonly form = this.formBuilder.group({
    organization: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = false;
  errorMessage = '';
  tenant: PublicTenant | null = null;
  resolvedTenantSlug = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe(() => this.syncTenantContext());
    this.route.queryParamMap.subscribe(() => this.syncTenantContext());
  }

  fillDemoUser(email: string, password: string): void {
    this.form.patchValue({ email, password });
  }

  private syncTenantContext(): void {
    const routeTenantSlug = this.route.snapshot.paramMap.get('tenantSlug');
    const queryTenantSlug = this.route.snapshot.queryParamMap.get('tenant');
    const tenantSlug = (routeTenantSlug || queryTenantSlug || '').trim().toLowerCase();

    this.resolvedTenantSlug = tenantSlug;
    this.tenant = null;
    this.errorMessage = '';

    if (tenantSlug) {
      this.form.patchValue({ organization: tenantSlug }, { emitEvent: false });
      this.authService.getPublicTenant(tenantSlug).subscribe({
        next: (tenant) => {
          if (this.resolvedTenantSlug === tenantSlug) {
            this.tenant = tenant;
          }
        },
        error: (error) => {
          if (this.resolvedTenantSlug === tenantSlug) {
            this.tenant = null;
            this.errorMessage = error?.error?.message || 'The requested tenant could not be resolved.';
          }
        }
      });
      return;
    }

    this.form.patchValue({ organization: '' }, { emitEvent: false });
  }

  submit(): void {
    const organization = (this.form.controls.organization.value || '').trim().toLowerCase();
    const tenantSlug = this.resolvedTenantSlug || organization;
    if (!tenantSlug) {
      this.form.controls.organization.markAsTouched();
      this.errorMessage = 'Organization is required.';
      return;
    }

    if (this.form.controls.email.invalid || this.form.controls.password.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(email || '', password || '', tenantSlug).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe({
      next: (session) => {
        if (session.activeTenant?.tenantStatus === 'suspended') {
          this.router.navigate(['/tenant-suspended']);
          return;
        }

        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/workspace';
        this.router.navigateByUrl(redirect);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Authentication failed.';
      }
    });
  }
}
