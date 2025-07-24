import { Component, OnInit , ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedToastComponent } from '../../../shared/components';
import { ToastType } from '../../../core/enums';
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../core/interfaces';

@Component({
  selector: 'app-connection-apply-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SharedToastComponent],
  templateUrl: './connection-apply-form.html',
  styleUrl: './connection-apply-form.scss',
})
export class ConnectionApplyForm implements OnInit {
  @ViewChild(SharedToastComponent) toast!: SharedToastComponent;
  applyForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.applyForm = this.fb.group({
      aadharNumber: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
      income: ['', [Validators.required, Validators.min(0), Validators.max(99999)]]
    });
  }

  get f() {
    return this.applyForm.controls;
  }

  onSubmit(): void {
  this.submitted = true;
  if (this.applyForm.invalid) return;

  const formData: IUser = this.applyForm.value;

  this.userService.submitApplication(formData).subscribe({
    next: () => {
      this.toast.show({
        message: 'Application submitted successfully!',
        type: ToastType.SUCCESS,
        duration: 3000,
      });
      this.applyForm.reset();
      this.submitted = false;
    },
    error: (err) => {
      console.error('Submission failed:', err);
      this.toast.show({
        message: 'Something went wrong. Try again later!',
        type: ToastType.ERROR,
        duration: 3000,
      });
    }
  });
}

}
