export interface IUser {
  aadharNumber: string;
  income: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  subsidyAmount?: number;
  setupDate?: string;
  officer?: {
    name: string;
    designation: string;
    contact: string;
  };
  rejectionReason?: string;
}
