import {ICity} from './city.model';
import {IDeliveryRequest} from "./delivery-request.model";
import {MeansOfTransport} from "./mean-of-transport-enum.model";
import {OfferStatusEnum} from "./offer-status-enum.model";
import {ITransactionPoint} from "./transaction-point.model";
import {IBookingUser} from "./booking-user.model";
import {IAirport} from "../referential/airport.model";
import {IBooking} from "./booking.model";
import {PaymentBreakdown} from "./payment-breakdown.model";
import {BookingFile} from "./booking-file.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface IDeliveryOffer extends AuditingEntity {
  id: string;
  startDate: number;
  expiryDate: number;
  travelDepartureDate: number;
  travelArrivalDate: number;
  status: OfferStatusEnum;
  departureCity: ICity;
  arrivalCity: ICity;
  meansOfTransport: MeansOfTransport;
  transporter: IBookingUser;
  pickupTransaction: ITransactionPoint;
  deliveryTransaction: ITransactionPoint;
  price: PaymentBreakdown;
  correspondingRequests: IDeliveryRequest[];
  bookings: IBooking[];
  departureAirport?: IAirport;
  arrivalAirport?: IAirport;
  transporterId?: string;
  travelDocuments?: BookingFile[];
}
