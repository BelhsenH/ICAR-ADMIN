import {VerificationFile, VerificationStatus} from "./verification.model";

export interface ExternalAccount {
  id: string;
  userId: string;
  stripeAccountId: string;
  stripeExternalAccountId: string;
  type: ExternalAccountType;
}

export interface BankAccount extends ExternalAccount {
  accountHolderName: string;
  accountHolderType: BankAccountHolderType;
  bankName: string;
  last4: string;
  routingNumber?: string;
  country: string;
  currency: string;
  defaultForCurrency: boolean;
  accountType?: string;
  status: BankAccountStatus;
  verification: BankAccountVerification;
  deleted?: boolean;
  accountNumber?: string;
  bicCode?: string;
}

export enum ExternalAccountType {
  BANK_ACCOUNT = 'BANK_ACCOUNT',
  CARD = 'CARD'
}

export enum BankAccountHolderType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY'
}

export enum BankAccountStatus {
  NEW = 'NEW',
  VALIDATED = 'VALIDATED',
  VERIFIED = 'VERIFIED',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  ERRORED = 'ERRORED'
}

export interface BankAccountVerification {
  status: VerificationStatus;
  verificationFile?: VerificationFile;
}
