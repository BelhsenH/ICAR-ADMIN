import {AuditingEntity} from "../shared/auditing-entity.model";


export interface ICarUsers extends AuditingEntity {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  type: TYPE;
  password: string;
  verified: boolean;
}


export enum TYPE {
  ENTREPRISE = 'ENTREPRISE',
  PERSONAL = 'PERSONAL'
}
