import {RelayPointTypeEnum} from "../../relay-point/relay-point-type-enum.model";
import {IGeoPosition} from "../../booking/geo-position.model";
import {IHoursOfOperation} from "../../relay-point/hours-of-operation.model";

export interface NewRelayPoint {
  name: string;
  type: RelayPointTypeEnum;
  countryId: string;
  cityId: string;
  hoursOfOperation: IHoursOfOperation;
  airportId?: string;
  trainStationId?: string;
  position?: IGeoPosition;
}
