import {Card} from "./card.model";
import {Invoice} from "./invoice.model";
import {Moment} from "moment-timezone";

export interface PaymentTransaction {
  id: string;
  transactionDate: Moment;
  description: string;
  amount: number;
  currency: string;
  user: PaymentTransactionUser;
  bookingId: string;
  transferGroup: string;
  paymentMethodTypes: string[];
  card: Card;
  receiptUrl: string;
  invoice: Invoice;
}

interface PaymentTransactionUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: PaymentTransactionUserAddress;
}

interface PaymentTransactionUserAddress {
  line1: string;
  postalCode: string;
  city: string;
  country: string;
}
