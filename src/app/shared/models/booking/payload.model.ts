import {PayloadType} from "./payload-type-enum.model";
import {Currency} from "../shared/currency-enum.model";

export interface IPayload {
  id: string;
  type: PayloadType;
  parcelType?: ParcelType;
  description?: string;
  attachments: PayloadFile[];
  weight?: number;
  dimensions?: PayloadDimension;
  purchaseLink?: string;
  estimatedCost?: number;
  estimatedCostCurrency?: Currency;
  requestRaison?: PrescriptionRequestRaison;
  insurance?: PayloadInsurance;
}

export interface PayloadInsurance {
  estimatedPayloadCost: number;
  estimatedPayloadCostCurrency: Currency;
  estimatedInsuranceAmount: number;
  estimatedInsuranceAmountCurrency: Currency;
  note?: string;
  attachments?: PayloadFile[];
}

export interface PayloadFile {
  id: string;
  name: string;
  type: PayloadFileType;
}

export enum PayloadFileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF'
}

export interface PayloadDimension {
  width: number;
  height: number;
  length: number;
}

export enum ParcelType {
  NORMAL = 'NORMAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  PRECIOUS = 'PRECIOUS',
  FRAGILE = 'FRAGILE'
}

export enum PrescriptionRequestRaison {
  MEDICINE_NOT_AVAILABLE_IN_COUNTRY = 'MEDICINE_NOT_AVAILABLE_IN_COUNTRY',
  RARE_DISEASE_MEDICINE = 'RARE_DISEASE_MEDICINE',
  CHRONIC_DISEASE_MEDICINE = 'CHRONIC_DISEASE_MEDICINE',
  ESSENTIAL_MEDICINE_NOT_AVAILABLE_LOCALLY = 'ESSENTIAL_MEDICINE_NOT_AVAILABLE_LOCALLY',
  MEDICAL_EMERGENCY_MEDICINE = 'MEDICAL_EMERGENCY_MEDICINE',
  OTHER = 'OTHER'
}
