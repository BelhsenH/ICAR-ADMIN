import {Currency} from "../shared/currency-enum.model";

export interface IPrice {
  currency: Currency;
  initialPriceAmount: number;
  platformCommissionDetails: PlatformCommissionDetails;
  transporterPaymentDetails: TransporterPaymentDetails;
  pickupRelayPointPaymentDetails?: RelayPointPaymentDetails;
  deliveryRelayPointPaymentDetails?: RelayPointPaymentDetails;
  insurancePaymentDetails?: InsurancePaymentDetails;
  paymentDetails: TransactionBreakdown;
  stripeFeesDetails: StripeFeesDetails;
}

export interface PlatformCommissionDetails {
  commissionRate: number;
  netCommissionAmount: number;
}

export interface TransporterPaymentDetails {
  totalTransferAmount: number;
  productPurchaseAmount: number;
  earningsAmount: number;
  processingFees: number;
}

export interface RelayPointPaymentDetails {
  earningsAmount: number;
  processingFees: number;
}

export interface InsurancePaymentDetails {
  parcelInsuranceAmount: number;
  processingFees: number;
}

export interface TransactionBreakdown {
  grossAmount: number;
  netAmount: number;
  feesAmount: number;
}

export interface StripeFeesDetails {
  stripePaymentFeesRate: number;
  stripePaymentExtraFee: number;
  stripeTransferFeesRate: number;
  stripeTransferExtraFee: number;
}
