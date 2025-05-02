export interface Client {
  name: string;
  email: string;
  phone: string;
  clientType: 'Individual' | 'Business';
  isActive: boolean;
  bankBalance: number;
  outstandingLoan?: number;
  registrationDate: Date;
}
