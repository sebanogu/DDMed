import { Component, OnInit } from '@angular/core';
import { WorkspaceApiService } from '../services/workspace-api.service';

@Component({
  selector: 'app-workspace-clinical',
  templateUrl: './workspace-clinical.component.html',
  styleUrls: ['./workspace-clinical.component.css'],
  standalone: false
})
export class WorkspaceClinicalComponent implements OnInit {
  data: any = null;

  constructor(private workspaceApiService: WorkspaceApiService) {}

  ngOnInit(): void {
    this.workspaceApiService.getClinicalWorkspace().subscribe((data) => {
      this.data = data;
    });
  }
}
