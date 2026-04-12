import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { AuthModule } from '../auth.module';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const paramMapSubject = new BehaviorSubject(convertToParamMap({ tenantSlug: 'north-clinic' }));
  const queryParamMapSubject = new BehaviorSubject(convertToParamMap({}));

  const activatedRouteStub = {
    paramMap: paramMapSubject.asObservable(),
    queryParamMap: queryParamMapSubject.asObservable(),
    snapshot: {
      get paramMap() {
        return paramMapSubject.value;
      },
      get queryParamMap() {
        return queryParamMapSubject.value;
      },
    },
  };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['getPublicTenant', 'login']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate', 'navigateByUrl']);
    authServiceSpy.getPublicTenant.and.returnValue(of({
      id: 'tenant-north',
      slug: 'north-clinic',
      name: 'North Clinic',
      status: 'active',
    }));
    authServiceSpy.login.and.returnValue(of({
      user: {
        id: 'user-alex',
        email: 'alex.owner@ddmed.test',
        displayName: 'Alex Owner',
      },
      memberships: [],
      activeTenant: {
        tenantId: 'tenant-north',
        tenantSlug: 'north-clinic',
        tenantName: 'North Clinic',
        tenantStatus: 'active',
      },
      effectiveRoles: ['owner'],
      effectivePermissions: ['workspace.view'],
      availableRoles: ['owner'],
    }));

    await TestBed.configureTestingModule({
      imports: [AuthModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('resolves the tenant from the route and loads its public profile', () => {
    expect(component.resolvedTenantSlug).toBe('north-clinic');
    expect(component.tenant?.name).toBe('North Clinic');
    expect(authServiceSpy.getPublicTenant).toHaveBeenCalledWith('north-clinic');
  });

  it('submits credentials against the tenant resolved from the URL', () => {
    component.form.patchValue({
      email: 'alex.owner@ddmed.test',
      password: 'Demo123!',
    });

    component.submit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('alex.owner@ddmed.test', 'Demo123!', 'north-clinic');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/workspace');
  });
});
