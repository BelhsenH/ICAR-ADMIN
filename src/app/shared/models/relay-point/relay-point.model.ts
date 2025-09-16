import {ITrainStation} from "../referential/train-station.model";
import {IAirport} from "../referential/airport.model";
import {IReferentialCity} from "../referential/referential-city.model";
import {IReferentialCountry} from "../referential/referential-country.model";
import {RelayPointTypeEnum} from "./relay-point-type-enum.model";
import {IGeoPosition} from "../booking/geo-position.model";
import {IHoursOfOperation} from "./hours-of-operation.model";
import {IRelayPointSuspension} from "./relay-point-suspension.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface RelayPoint extends AuditingEntity {
  id: string;
  name: string;
  type: RelayPointTypeEnum;
  country: IReferentialCountry;
  city: IReferentialCity;
  hoursOfOperation: IHoursOfOperation;
  position?: IGeoPosition;
  airport?: IAirport;
  trainStation?: ITrainStation;
  suspension?: IRelayPointSuspension;
  enabled: boolean;
}
