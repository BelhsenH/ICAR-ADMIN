import {AccountDisabler, SuspensionAdminReason} from "../../../user/suspension.model";

export interface DisableUserAccount {
  requestUserType: AccountDisabler; // AccountDisabler.ADMIN
  userId: string;
  enabled: boolean; // false
  suspensionAdminReason: SuspensionAdminReason;
  disablerComment: string;
}
