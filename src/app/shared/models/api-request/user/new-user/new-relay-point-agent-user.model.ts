import {Address, DateOfBirth} from "../../../user/user.model";
import {AccountLanguage} from "../../../shared/account-language-enum.model";

export interface NewRelayPointAgentUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  relayPoint: NewUserRelayPoint;
  language: AccountLanguage;
  dateOfBirth?: DateOfBirth;
  address?: Address;
}

interface NewUserRelayPoint {
  id: string;
  name: string;
}
