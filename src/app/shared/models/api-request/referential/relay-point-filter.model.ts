import {RelayPointTypeEnum} from "../../relay-point/relay-point-type-enum.model";

export interface RelayPointFilter {
  name?: string;
  type?: RelayPointTypeEnum;
  airportId?: string;
  trainStationId?: string;
  cityId?: string;
  cityName?: string;
  cityCode?: string;
  countryCode?: string;
  countryId?: string;
  enabled?: boolean;
  deleted?: boolean;
}
