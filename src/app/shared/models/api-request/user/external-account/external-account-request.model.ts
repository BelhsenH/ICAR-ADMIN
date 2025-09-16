import {Country} from "../../../shared/country-enum.model";
import {Currency} from "../../../shared/currency-enum.model";
import {BankAccountHolderType, BankAccountStatus, ExternalAccountType} from "../../../user/external-account.model";
import {VerificationStatus} from "../../../user/verification.model";

export interface FilterExternalAccountRequest {
  userId?: string;
  stripeAccountId?: string;
  stripeExternalAccountId?: string;
  type?: ExternalAccountType;
  accountHolderType?: BankAccountHolderType;
  accountNumber?: string;
  bicCode?: string;
  routingNumber?: string;
  last4?: string;
  country?: Country;
  currency?: Currency;
  defaultForCurrency?: boolean;
  status?: BankAccountStatus;
  verificationStatus?: VerificationStatus;
}
