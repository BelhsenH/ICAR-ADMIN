import {AuditingEntity} from "../shared/auditing-entity.model";

export interface IRepairUsers extends AuditingEntity {
  _id: string;
  type: 'garagiste' | string;
  nomGarage: string;
  adresse: string;
  zoneGeo: string;
  geolocation: {
    lat: number;
    lng: number;
  };
  nomResponsable: string;
  phoneNumber: string;
  email: string;
  typeService: string[];
  verified: boolean;
  serviceHistory: any[];
  createdAt: Date;
  updatedAt: Date;
}
