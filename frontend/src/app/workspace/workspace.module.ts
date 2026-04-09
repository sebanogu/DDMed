import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../shared/app-material.module';
import { WorkspaceAdminComponent } from './workspace-admin/workspace-admin.component';
import { WorkspaceClinicalComponent } from './workspace-clinical/workspace-clinical.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceApiService } from './services/workspace-api.service';
import { WorkspaceShellComponent } from './workspace-shell/workspace-shell.component';
import { WorkspaceSupportComponent } from './workspace-support/workspace-support.component';

@NgModule({
  declarations: [
    WorkspaceShellComponent,
    WorkspaceDashboardComponent,
    WorkspaceAdminComponent,
    WorkspaceClinicalComponent,
    WorkspaceSupportComponent,
  ],
  imports: [
    AppMaterialModule,
    WorkspaceRoutingModule,
  ],
  providers: [WorkspaceApiService],
})
export class WorkspaceModule {}
