import {RelayPointSuspensionReason} from "../../relay-point/relay-point-suspension.model";

export interface DisableRelayPoint {
  relayPointId: string;
  suspensionReason: RelayPointSuspensionReason;
  disablerComment: string;
  enabled: boolean; // false
}
