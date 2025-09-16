import {Address, DateOfBirth} from "../../../user/user.model";
import {AccountLanguage} from "../../../shared/account-language-enum.model";

export interface NewUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  language: AccountLanguage;
  dateOfBirth?: DateOfBirth;
  address?: Address;
  bankAccount?: any;
}
