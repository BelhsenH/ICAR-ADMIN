import {IPositionTransaction} from "./position-transaction.model";
import {IRelayPointTransaction} from "./relay-point-transaction.model";

export interface ITransactionPoint {
  relayPointTransactions: IRelayPointTransaction[];
  positionTransactions: IPositionTransaction[];
}
