import { Component, OnInit } from '@angular/core';
import { WorkspaceApiService } from '../services/workspace-api.service';

@Component({
  selector: 'app-workspace-admin',
  templateUrl: './workspace-admin.component.html',
  styleUrls: ['./workspace-admin.component.css'],
  standalone: false
})
export class WorkspaceAdminComponent implements OnInit {
  data: any = null;

  constructor(private workspaceApiService: WorkspaceApiService) {}

  ngOnInit(): void {
    this.workspaceApiService.getAdminWorkspace().subscribe((data) => {
      this.data = data;
    });
  }
}
