import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IUser, Response } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private api: ApiService) {}
  getAllApplications(): Observable<Response<IUser[]>> {
    return this.api.get('admin/applications');
  }

  approveApplication(aadharNumber: string): Observable<Response<IUser>> {
    return this.api.put(`admin/approve/${aadharNumber}`, {});
  }

  rejectApplication(
    aadharNumber: string,
    reason: string
  ): Observable<Response<IUser>> {
    return this.api.put(`admin/reject/${aadharNumber}`, { reason });
  }
}
