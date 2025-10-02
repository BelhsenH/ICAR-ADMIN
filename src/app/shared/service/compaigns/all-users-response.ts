import { AllUser } from '../../models/compains/all-user.model';

export interface AllUserResponse {
  icars: AllUser[];
  ipieces: AllUser[];
  irepairs: AllUser[];
  total: {
    icars: number;
    ipieces: number;
    irepairs: number;
    all: number;
  };
}
