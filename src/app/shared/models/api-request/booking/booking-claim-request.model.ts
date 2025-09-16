import {BookingClaimStatus} from "../../booking/booking-claim.model";

export interface FilterBookingClaim {
  bookingId?: string;
  bookingReference?: string;
  claimerId?: string;
  status?: BookingClaimStatus;
}
