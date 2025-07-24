import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationDetails } from '../../../core/interfaces';
import { UserService } from '../../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-status-check',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './status-check.html',
  styleUrl: './status-check.scss',
})
export class StatusCheck implements OnInit {
  checkForm!: FormGroup;
  submitted = signal(false);
  status = signal<string | null>(null);
  applicationDetails = signal<ApplicationDetails | null>(null);

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkForm = this.fb.group({
      aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
    });
  }

  get f() {
    return this.checkForm.controls;
  }

  onSubmit(): void {
  this.submitted.set(true);
  if (this.checkForm.invalid) return;

  const aadhar = this.checkForm.value.aadharNumber;

  this.userService.getApplicationStatusByAadhar(aadhar).subscribe({
    next: (res) => {
      const app = res.data;
      this.status.set(app?.status || 'Not Found');
      this.applicationDetails.set(app || null);
    },
    error: () => {
      this.status.set('Not Found');
      this.applicationDetails.set(null);
    }
  });
}
}
