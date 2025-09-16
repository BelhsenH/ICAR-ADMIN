import {BookingFile} from "./booking-file.model";
import {Currency} from "../shared/currency-enum.model";
import {IPrice} from "../pricing/price.model";

export interface PaymentBreakdown extends IPrice {
  note?: string;
  attachments?: BookingFile[];
}

export interface CompletedPurchasePayment {
  productCost: number;
  currency: Currency;
  note?: string;
  attachments?: BookingFile[];
}
