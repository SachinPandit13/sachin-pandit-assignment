import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services';
import { IUser } from '../../../core/interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applications',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
  standalone: true
})
export class Applications implements OnInit {
  applications: IUser[] = [];
  loading = false;

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications(): void {
    this.loading = true;
    console.log('Before API call, loading:', this.loading);

    this.adminService.getAllApplications().subscribe({
      next: (res) => {
        console.log('API Response received:', res);
        this.applications = res.data;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
        this.loading = false;
        this.cdr.detectChanges(); 
      },
    });
  }

  back(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
