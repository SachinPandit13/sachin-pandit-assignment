import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loginForm!: FormGroup;
  errorMsg = '';

  private readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123',
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [this.ADMIN_CREDENTIALS.username, Validators.required],
      password: [this.ADMIN_CREDENTIALS.password, Validators.required],
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (
      username === this.ADMIN_CREDENTIALS.username &&
      password === this.ADMIN_CREDENTIALS.password
    ) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMsg = 'Invalid credentials. Try again.';
    }
  }
}
