import { Component, signal } from '@angular/core';
import { ToastOptions } from '../../../core/interfaces';
import { ToastType } from '../../../core/enums';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-toast.html',
  styleUrl: './shared-toast.scss'
})
export class SharedToastComponent {
  message = signal<string>('');
  type = signal<ToastType>(ToastType.SUCCESS);
  isVisible = signal<boolean>(false);
  duration = signal<number>(3000);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(options: ToastOptions): void {
    this.message.set(options.message);
    this.type.set(options.type || ToastType.SUCCESS);
    this.duration.set(options.duration || 3000);
    this.isVisible.set(true);

    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => this.hide(), this.duration());
  }

  hide(): void {
    this.isVisible.set(false);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  get toastClass(): string {
    const type = this.type();
    return `bg-${this.mapTypeToColor(type)} text-white`;
  }

  private mapTypeToColor(type: ToastType): string {
    switch (type) {
      case ToastType.SUCCESS: return 'success';
      case ToastType.ERROR: return 'danger';
      case ToastType.WARNING: return 'warning';
      case ToastType.INFO: return 'info';
      default: return 'secondary';
    }
  }
}
