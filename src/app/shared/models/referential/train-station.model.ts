import {IReferentialCity} from "./referential-city.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface ITrainStation extends AuditingEntity {
  id: string;
  name: string;
  city: IReferentialCity;
  enabled: boolean;
}
