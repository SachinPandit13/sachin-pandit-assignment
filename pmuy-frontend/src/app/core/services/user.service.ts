import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IUser, Response, ApplicationDetails } from '../interfaces';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  submitApplication(data: IUser): Observable<Response<IUser>> {
    return this.api.post('user/submit', data);
  }
  getApplicationStatusByAadhar(
    aadharNumber: string
  ): Observable<Response<ApplicationDetails>> {
    return this.api.get(`user/get-status/${aadharNumber}`);
  }
}
