import {IReferentialCity} from "./referential-city.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface IAirport extends AuditingEntity {
  id: string;
  name: string;
  iata: string;
  city: IReferentialCity;
  enabled: boolean;
}
