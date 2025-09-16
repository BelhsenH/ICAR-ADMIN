import {Role} from "./role-enum.model";
import {AccountLanguage} from "../shared/account-language-enum.model";

export interface AdminUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinedDate: number;
  country: string;
  profilePicture: string;
  role: Role;
  language: AccountLanguage;
  enabled: boolean;
}
