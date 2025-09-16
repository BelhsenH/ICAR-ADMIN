import {BookingEvent} from "./booking-event-enum.model";
import {ActionExecutor} from "./action-executor.model";
import {BookingFile} from "./booking-file.model";
import {BookingStatus} from "./booking.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface BookingClaim extends AuditingEntity {
  id: string;
  type: BookingClaimType;
  date: number;
  bookingId: string;
  bookingReference: string;
  bookingEvent: BookingEvent;
  bookingActualStatus: BookingStatus;
  claimerType: ActionExecutor;
  claimerId: string;
  claimerEmail: string;
  standardClaimReason?: StandardBookingClaimReason;            // for STANDARD
  standardClaimReasonExtra?: string;                           // for STANDARD
  damageClaimReason?: DamageBookingClaimReason;                // for DAMAGE
  damageClaimReasonExtra?: string;                             // for DAMAGE
  issueDescription?: string;
  attachmentsType?: BookingClaimAttachmentsType;
  attachments?: BookingFile[];
  damagedParcelPhotos?: BookingFile[];                         // for DAMAGE
  preIncidentPhotos?: BookingFile[];                           // for DAMAGE
  valueProofDocuments?: BookingFile[];                         // for DAMAGE
  incidentObservedAt?: number;                                 // for DAMAGE
  preferredResolution?: BookingClaimPreferredResolutionType;   // for STANDARD
  status: BookingClaimStatus;
  actions?: BookingClaimAction[];
}

export enum BookingClaimType {
  STANDARD = 'STANDARD',
  DAMAGE = 'DAMAGE'
}

export interface BookingClaimAction {
  id: string;
  date: number;
  bookingId: string;
  agentId: string;
  bookingNewStatus: BookingStatus;
}

export enum StandardBookingClaimReason {
  TRAVELER_DID_NOT_PICK_UP_PARCEL = 'TRAVELER_DID_NOT_PICK_UP_PARCEL',
  PARCEL_NOT_DELIVERED_TO_RECIPIENT = 'PARCEL_NOT_DELIVERED_TO_RECIPIENT',
  PARCEL_WAS_DAMAGED_UPON_DELIVERY = 'PARCEL_WAS_DAMAGED_UPON_DELIVERY',
  MISDIRECTED_PARCEL = 'MISDIRECTED_PARCEL',
  DELAY_IN_DELIVERY = 'DELAY_IN_DELIVERY',
  PAYMENT_ISSUE = 'PAYMENT_ISSUE',
  OTHER = 'OTHER'
}

export enum DamageBookingClaimReason {
  LOST_PARCEL = 'LOST_PARCEL',
  STOLEN_PARCEL = 'STOLEN_PARCEL',
  DAMAGED_PARCEL = 'DAMAGED_PARCEL',
  OTHER = 'OTHER'
}

export enum BookingClaimAttachmentsType {
  BOOKING_CONFIRMATION = 'BOOKING_CONFIRMATION',
  PAYMENT_RECEIPT = 'PAYMENT_RECEIPT',
  DAMAGED_PARCEL_PHOTO = 'DAMAGED_PARCEL_PHOTO',
  ISSUE_SCREENSHOT = 'ISSUE_SCREENSHOT',
  OTHER = 'OTHER'
}

export enum BookingClaimPreferredResolutionType {
  REFUND = 'REFUND',
  REBOOKING_WITH_DIFFERENT_TRAVELER = 'REBOOKING_WITH_DIFFERENT_TRAVELER',
  COMPENSATION_FOR_DAMAGE = 'COMPENSATION_FOR_DAMAGE',
  INVESTIGATION_AND_RESPONSE = 'INVESTIGATION_AND_RESPONSE',
  OTHER = 'OTHER'
}

export enum BookingClaimStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  MORE_INFO_NEEDED = 'MORE_INFO_NEEDED',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED'
}
