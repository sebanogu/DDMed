import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
  standalone: false
})
export class AccessDeniedComponent {
  permission = this.route.snapshot.queryParamMap.get('permission');
  redirect = this.route.snapshot.queryParamMap.get('redirect') || '/workspace';

  constructor(private route: ActivatedRoute, private router: Router) {}

  goBack(): void {
    this.router.navigateByUrl(this.redirect);
  }
}
