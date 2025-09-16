import {ICity} from "./city.model";
import {IDeliveryOffer} from "./delivery-offer.model";
import {OfferStatusEnum} from "./offer-status-enum.model";
import {IPayload} from "./payload.model";
import {IBookingUser} from "./booking-user.model";
import {IBooking} from "./booking.model";
import {PaymentBreakdown} from "./payment-breakdown.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface IDeliveryRequest extends AuditingEntity {
  id: string;
  status: OfferStatusEnum;
  startDate: number;
  expiryDate: number;
  departureCity: ICity;
  arrivalCity: ICity;
  customer: IBookingUser;
  receiver: IBookingUser;
  payload: IPayload;
  price: PaymentBreakdown;
  correspondingOffers: IDeliveryOffer[];
  bookings: IBooking[];
  customerId?: string;
}
