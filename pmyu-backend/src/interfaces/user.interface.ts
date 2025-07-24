import { Document } from "mongoose";
import { OfficerInfo } from "./officer-info.interface";
import { UserStatus } from "../enums";

export interface IUser extends Document {
  id: number;  
  aadharNumber: string;
  income: number;
  status: UserStatus;
  setupDate?: string;
  subsidyAmount?: number;
  officer?: OfficerInfo;
  rejectionReason?: string;
}
