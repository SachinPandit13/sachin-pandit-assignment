import { ToastType } from '../enums';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}
