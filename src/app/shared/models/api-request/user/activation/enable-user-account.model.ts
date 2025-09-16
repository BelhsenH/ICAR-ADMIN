import {AccountDisabler} from "../../../user/suspension.model";

export interface EnableUserAccount {
  requestUserType: AccountDisabler; // AccountDisabler.ADMIN
  userId: string;
  enabled: boolean; // true
}

export interface EnableRelayPointAccount {
  requestUserType: AccountDisabler; // AccountDisabler.ADMIN
  relayPointId: string;
  enabled: boolean; // true
}
