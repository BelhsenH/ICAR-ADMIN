import {VerificationStatus} from "../../../user/verification.model";
import {Role} from "../../../authentication/role-enum.model";

export interface FilterUsers {
  role?: Role;
  identityVerificationStatus?: VerificationStatus;
  bankAccountVerificationStatus?: VerificationStatus;
  relayPointName?: string;
}
