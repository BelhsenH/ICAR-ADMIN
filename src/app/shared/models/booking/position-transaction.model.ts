import {IGeoPosition} from "./geo-position.model";
import {ICity} from "./city.model";

export interface IPositionTransaction {
  fromDate: number;
  toDate: number;
  city: ICity;
  postalCode: string;
  mapLink?: string;
  position: IGeoPosition;
}
