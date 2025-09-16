export interface IRelayPointSuspension {
  disablerAdminId: string;
  suspensionReason: RelayPointSuspensionReason;
  suspensionDate: number;
  comment: string;
}

export enum RelayPointSuspensionReason {
  OTHER = 'OTHER',
}
