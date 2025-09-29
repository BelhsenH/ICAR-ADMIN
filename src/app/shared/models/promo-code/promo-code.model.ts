export interface PromoCode {
  _id?: string;
  code: string;
  assignedTo?: string;
  usedCount?: number;
  startDate?: Date;
  endDate?: Date;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
