import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { activeTenantGuard, permissionGuard } from '../auth/guards/auth.guards';
import { WorkspaceAdminComponent } from './workspace-admin/workspace-admin.component';
import { WorkspaceClinicalComponent } from './workspace-clinical/workspace-clinical.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { WorkspaceShellComponent } from './workspace-shell/workspace-shell.component';
import { WorkspaceSupportComponent } from './workspace-support/workspace-support.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceShellComponent,
    canActivate: [activeTenantGuard],
    children: [
      {
        path: '',
        component: WorkspaceDashboardComponent,
      },
      {
        path: 'admin',
        component: WorkspaceAdminComponent,
        canActivate: [permissionGuard],
        data: { permission: 'tenant.manage' },
      },
      {
        path: 'clinical',
        component: WorkspaceClinicalComponent,
        canActivate: [permissionGuard],
        data: { permission: 'clinical.read' },
      },
      {
        path: 'support',
        component: WorkspaceSupportComponent,
        canActivate: [permissionGuard],
        data: { permission: 'support.access' },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
