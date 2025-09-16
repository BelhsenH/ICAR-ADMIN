import {PayloadType} from "../booking/payload-type-enum.model";
import {Moment} from "moment-timezone";

export interface Invoice {
  id: string;
  createdAt: Moment;
  information: InvoiceInformation;
  company: InvoiceCompany;
  client: InvoiceClient;
  delivery: InvoiceDelivery;
  payloads: InvoicePayload[];
  amount: number;
  currency: InvoiceCurrency;
  fileName: string;
  filePath: string;
}

export interface InvoiceInformation {
  numberGroup: number;
  numberNum: number;
  date: string;
  dueDate: string;
}

export interface InvoiceCompany {
  name: string;
  street: string;
  state: string;
  zip: string;
  country: string;
  website: string;
  phoneNumber: string;
}

export interface InvoiceClient {
  name: string;
  address: string;
  country: string;
}

export interface InvoiceDelivery {
  from: string;
  to: string;
  date: string;
}

export interface InvoicePayload {
  type: PayloadType;
  weight: number;
}

export enum InvoiceCurrency {
  EUR = 'EUR',
  USD = 'USD'
}
