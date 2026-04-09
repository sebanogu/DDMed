import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../shared/app-material.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { LoginComponent } from './login/login.component';
import { TenantSuspendedComponent } from './tenant-suspended/tenant-suspended.component';

@NgModule({
  declarations: [
    LoginComponent,
    AccessDeniedComponent,
    TenantSuspendedComponent,
  ],
  imports: [
    AppMaterialModule,
  ],
})
export class AuthModule {}
