import {OfferStatusEnum} from "../../booking/offer-status-enum.model";
import {PayloadType} from "../../booking/payload-type-enum.model";

export interface IFilterRequest {
  status?: OfferStatusEnum[];
  minStartDate?: number;
  maxStartDate?: number;
  minExpiryDate?: number;
  maxExpiryDate?: number;
  departureCityCode?: string;
  departureCityName?: string;
  departureCountryCode?: string;
  arrivalCityCode?: string;
  arrivalCityName?: string;
  arrivalCountryCode?: string;
  customerId?: string;
  excludedCustomerId?: string;
  receiverId?: string;
  receiverEmail?: string;
  payloadTypes?: PayloadType[];
  deleted?: boolean;
}
