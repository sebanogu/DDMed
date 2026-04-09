import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
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
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  fillDemoUser(email: string, password: string): void {
    this.form.patchValue({ email, password });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(email || '', password || '').pipe(
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
