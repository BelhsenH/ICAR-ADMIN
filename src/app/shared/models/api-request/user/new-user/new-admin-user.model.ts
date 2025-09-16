import {AccountLanguage} from "../../../shared/account-language-enum.model";


export interface NewAdminUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  language: AccountLanguage;
}
