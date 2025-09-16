import {MeansOfTransport} from "../../booking/mean-of-transport-enum.model";
import {BookingStatus, BookingStatusCategory} from "../../booking/booking.model";
import {PayloadType} from "../../booking/payload-type-enum.model";

export interface IFilterBooking {
  statusCategory?: BookingStatusCategory;
  status?: BookingStatus[];
  reference?: string;
  payloadTypes?: PayloadType[];
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
  airportId?: string; // departure Airport OR arrival Airport
  departureAirportId?: string;
  departureAirportIata?: string;
  departureAirportName?: string;
  arrivalAirportId?: string;
  arrivalAirportIata?: string;
  arrivalAirportName?: string;
  relayPointId?: string; // pickup RelayPoint OR delivery RelayPoint
  pickupRelayPointId?: string;
  deliveryRelayPointId?: string;
  meansOfTransport?: MeansOfTransport;
  deliveryOfferId?: string;
  deliveryRequestId?: string;
  userId?: string; // transporter OR customer OR receiver
  transporterId?: string;
  customerId?: string;
  receiverId?: string;
  receiverEmail?: string;
  deleted?: boolean;
}
