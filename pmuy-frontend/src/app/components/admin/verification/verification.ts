import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';
import { AdminService } from '../../../core/services';
import { IUser } from '../../../core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.html',
  imports: [CommonModule],
  styleUrls: ['./verification.scss'],
  standalone: true,
})
export class Verification implements OnInit {
  applications: IUser[] = [];
  loading = true;

  private cdr = inject(ChangeDetectorRef); 
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.loading = true;
    this.cdr.detectChanges();

    this.adminService.getAllApplications().subscribe({
      next: (res) => {
        this.applications = res.data;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: () => {
        alert('Failed to load applications');
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  approve(aadharNumber: string) {
    if (!confirm(`Are you sure you want to approve ${aadharNumber}?`)) return;

    this.adminService.approveApplication(aadharNumber).subscribe({
      next: () => {
        alert('Approved successfully');
        this.getApplications(); 
      },
      error: () => alert('Approval failed'),
    });
  }

  reject(aadharNumber: string): void {
    const reason = prompt("Please enter the reason for rejection:");
    if (reason && reason.trim()) {
      this.adminService.rejectApplication(aadharNumber, reason.trim()).subscribe({
        next: () => {
          alert('Application rejected.');
          this.getApplications(); 
        },
        error: (err) => {
          console.error('Rejection failed', err);
          alert('Failed to reject application');
        }
      });
    } else {
      alert("Rejection reason is required.");
    }
  }
}
