import { Component, OnInit } from '@angular/core';
import { WorkspaceSummary } from '../../auth/models/auth.models';
import { AuthService } from '../../auth/services/auth.service';
import { WorkspaceApiService } from '../services/workspace-api.service';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.css'],
  standalone: false
})
export class WorkspaceDashboardComponent implements OnInit {
  summary: WorkspaceSummary | null = null;
  loading = true;

  constructor(
    public authService: AuthService,
    private workspaceApiService: WorkspaceApiService,
  ) {}

  ngOnInit(): void {
    this.workspaceApiService.getSummary().subscribe({
      next: (summary) => {
        this.summary = summary;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
