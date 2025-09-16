import {ICity} from "./city.model";
import {IPayload} from "./payload.model";
import {IRelayPointTransaction} from "./relay-point-transaction.model";
import {IPositionTransaction} from "./position-transaction.model";
import {IBookingUser} from "./booking-user.model";
import {IAirport} from "../referential/airport.model";
import {PayloadType} from "./payload-type-enum.model";
import {CompletedPurchasePayment, PaymentBreakdown} from "./payment-breakdown.model";
import {ActionExecutor} from "./action-executor.model";
import {MeansOfTransport} from "./mean-of-transport-enum.model";
import {BookingEvent} from "./booking-event-enum.model";
import {BookingClaim} from "./booking-claim.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface IBooking extends AuditingEntity {
  id: string;
  reference: string;
  status: BookingStatus;
  deliveryPayloadType: PayloadType;
  payload: IPayload;
  startDate: number;
  expiryDate: number;
  travelDepartureDate: number;
  travelArrivalDate: number;
  deliveryOfferId: string;
  deliveryRequestId: string;
  creatorType: ActionExecutor;
  transporter: IBookingUser;
  customer: IBookingUser;
  receiver: IBookingUser;
  departureCity: ICity;
  arrivalCity: ICity;
  meansOfTransport: MeansOfTransport;
  departureAirport?: IAirport;
  arrivalAirport?: IAirport;
  depositInfo: BookingDepositInfo;
  payment: BookingPayment;
  cancellationInfo: BookingCancellation;
  rejectionInfo: BookingRejection;
  eventsHistory: Record<number, BookingEvent>;
  claims: BookingClaim[];
  notes: BookingNote[];
}

export interface BookingDepositInfo {
  pickUpDepositType: DepositType;
  deliveryDepositType: DepositType;
  pickupRelayPointTransaction: IRelayPointTransaction;
  deliveryRelayPointTransaction: IRelayPointTransaction;
  pickupPositionTransaction: IPositionTransaction;
  deliveryPositionTransaction: IPositionTransaction;
}

export enum BookingStatus {
  PENDING_TRANSPORTER_APPROVAL = 'PENDING_TRANSPORTER_APPROVAL',
  PENDING_CUSTOMER_APPROVAL = 'PENDING_CUSTOMER_APPROVAL',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID_AWAITING_PICKUP = 'PAID_AWAITING_PICKUP',
  PAID_PENDING_PURCHASE = 'PAID_PENDING_PURCHASE',
  PENDING_PURCHASE = 'PENDING_PURCHASE',
  PAYLOAD_PURCHASED = 'PAYLOAD_PURCHASED',
  PAYLOAD_PICKED_UP_BY_DEPARTURE_RELAY_POINT = 'PAYLOAD_PICKED_UP_BY_DEPARTURE_RELAY_POINT',
  IN_TRANSIT = 'IN_TRANSIT',
  PAYLOAD_PICKED_UP_BY_ARRIVAL_RELAY_POINT = 'PAYLOAD_PICKED_UP_BY_ARRIVAL_RELAY_POINT',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CLAIMED = 'CLAIMED'
}

export enum BookingStatusCategory {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED'
}

export enum DepositType {
  MEETING = 'MEETING',
  RELAY_POINT = 'RELAY_POINT'
}

export interface BookingPayment {
  primaryPayment: PaymentBreakdown;
  proposedPayment?: PaymentBreakdown;
  completedPurchasePayment?: CompletedPurchasePayment;
  finalPayment?: PaymentBreakdown;
  paymentEventsHistory: Record<number, BookingPaymentEvent>;
}

export enum BookingPaymentEvent {
  CUSTOMER_HAS_PAID = 'CUSTOMER_HAS_PAID',
  DEPARTURE_RELAY_POINT_HAS_BEEN_PAID = 'DEPARTURE_RELAY_POINT_HAS_BEEN_PAID',
  ARRIVAL_RELAY_POINT_HAS_BEEN_PAID = 'ARRIVAL_RELAY_POINT_HAS_BEEN_PAID',
  TRANSPORTER_HAS_BEEN_PAID = 'TRANSPORTER_HAS_BEEN_PAID'
}

export interface BookingCancellation {
  date: number;
  event: BookingEvent;
  raison: string;
  cancelerType: ActionExecutor;
  cancelerId: string;
  cancelerEmail: string;
}

export interface BookingRejection {
  date: number;
  event: BookingEvent;
  raison: string;
  declinerType: ActionExecutor;
  declinerId: string;
  declinerEmail: string;
}

export interface BookingNote {
  id: string;
  date: number;
  description: string;
  writerType: ActionExecutor;
  writerId: string;
  writerEmail: string;
}
