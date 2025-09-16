import {Country} from "../../../shared/country-enum.model";
import {Currency} from "../../../shared/currency-enum.model";
import {BankAccountHolderType} from "../../../user/external-account.model";

class NewVerificationFile {
}

export interface NewBankAccountRequest {
  accountHolderName: string;
  accountHolderType: BankAccountHolderType;
  bankName: string;
  accountNumber: string;
  bicCode?: string;
  routingNumber?: string;
  country: Country;
  currency: Currency;
  defaultForCurrency: boolean;
  verificationFile: NewVerificationFile;
}

export interface UpdateBankAccountRequest {
  accountHolderName: string;
  defaultForCurrency: boolean;
  verificationFile?: NewVerificationFile;
}
