import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
   constructor(private router: Router) {}

  goToApplications(): void {
    this.router.navigate(['/admin/applications']);
  }

  goToVerification(): void {
    this.router.navigate(['/admin/verify']);
  }
}
