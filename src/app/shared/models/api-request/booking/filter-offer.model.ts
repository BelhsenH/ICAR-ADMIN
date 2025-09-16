import {MeansOfTransport} from "../../booking/mean-of-transport-enum.model";
import {OfferStatusEnum} from "../../booking/offer-status-enum.model";

export interface IFilterOffer {
  status?: OfferStatusEnum[];
  minStartDate?: number;
  maxStartDate?: number;
  minExpiryDate?: number;
  maxExpiryDate?: number;
  minTravelDepartureDate?: number;
  maxTravelDepartureDate?: number;
  minTravelArrivalDate?: number;
  maxTravelArrivalDate?: number;
  departureCityCode?: string;
  departureCityName?: string;
  departureCountryCode?: string;
  arrivalCityCode?: string;
  arrivalCityName?: string;
  arrivalCountryCode?: string;
  airportId?: string;
  departureAirportId?: string;
  departureAirportIata?: string;
  departureAirportName?: string;
  arrivalAirportId?: string;
  arrivalAirportIata?: string;
  arrivalAirportName?: string;
  relayPointId?: string;
  pickupRelayPointId?: string;
  deliveryRelayPointId?: string;
  meansOfTransport?: MeansOfTransport;
  transporterId?: string;
  excludedTransporterId?: string;
  deleted?: boolean;
}
