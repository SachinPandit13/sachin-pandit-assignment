import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'apply',
    loadComponent: () =>
      import(
        './components/user/connection-apply-form/connection-apply-form'
      ).then((m) => m.ConnectionApplyForm),
  },
  {
    path: 'status/123456789012',
    loadComponent: () =>
      import('./components/user/status-check/status-check').then(
        (m) => m.StatusCheck
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/login-page/login-page').then(
        (m) => m.LoginPage
      ),
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./components/admin/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'admin/applications',
    loadComponent: () =>
      import('./components/admin/applications/applications').then((m) => m.Applications),
  },
  {
    path: 'admin/verify',
    loadComponent: () =>
      import('./components/admin/verification/verification').then((m) => m.Verification),
  },
  {
    path: '',
    redirectTo: 'apply',
    pathMatch: 'full',
  },
];
