import {AuditingEntity} from "../shared/auditing-entity.model";


export interface IcarVehicule extends AuditingEntity {
  _id: string;
  vin: string;
  marque: string;
  modele: string;
  numeroImmatriculation: string;
  immatriculationType: 'TUN' | 'RS';
  fuelType: string;
  datePremiereMiseEnCirculation: Date;
  kilometrage?: number;
  kilometerageUnit: string;
  userId: string;
}
