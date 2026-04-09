import { Component, OnInit } from '@angular/core';
import { WorkspaceApiService } from '../services/workspace-api.service';

@Component({
  selector: 'app-workspace-support',
  templateUrl: './workspace-support.component.html',
  styleUrls: ['./workspace-support.component.css'],
  standalone: false
})
export class WorkspaceSupportComponent implements OnInit {
  data: any = null;

  constructor(private workspaceApiService: WorkspaceApiService) {}

  ngOnInit(): void {
    this.workspaceApiService.getSupportWorkspace().subscribe((data) => {
      this.data = data;
    });
  }
}
