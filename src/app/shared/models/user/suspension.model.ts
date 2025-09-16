export interface ISuspension {
  disabler: AccountDisabler;
  disablerAdminId: string;
  suspensionAdminReason?: SuspensionAdminReason;
  suspensionUserReason?: SuspensionUserReason;
  suspensionSystemReason?: SuspensionSystemReason;
  suspensionDate: number;
  comment: string;
}

export enum AccountDisabler {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum SuspensionAdminReason {
  OTHER = 'OTHER',
}

export enum SuspensionUserReason {
  NEED_BREAK = 'NEED_BREAK',
  CONCERNED_ABOUT_PRIVACY = 'CONCERNED_ABOUT_PRIVACY',
  UNHAPPY_WITH_THE_SERVICE = 'UNHAPPY_WITH_THE_SERVICE',
  OTHER = 'OTHER',
}

export enum SuspensionSystemReason {
  RELAY_POINT_DISABLED = 'RELAY_POINT_DISABLED'
}
