import {CompletedPurchasePayment, PaymentBreakdown} from "../../booking/payment-breakdown.model";
import {BookingEvent} from "../../booking/booking-event-enum.model";

export interface FireBookingEventRequest {
  event: BookingEvent;
  raison?: string;
  proposedPayment?: PaymentBreakdown;
  completedPurchasePayment?: CompletedPurchasePayment;
}
