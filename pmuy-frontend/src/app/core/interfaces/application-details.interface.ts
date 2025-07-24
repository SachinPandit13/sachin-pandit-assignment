import { OfficerInfo } from './officer-info-interface';
import { StatusType } from '../enums/status.enum';
export interface ApplicationDetails {
  status: StatusType;
  income: number;
  setupDate?: string;
  officer?: OfficerInfo;
  subsidyAmount?: number;
  rejectionReason?:string
}