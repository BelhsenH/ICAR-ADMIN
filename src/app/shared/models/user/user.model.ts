import {ISuspension} from "./suspension.model";
import {IVerification} from "./verification.model";
import {AccountLanguage} from "../shared/account-language-enum.model";
import {Country} from "../shared/country-enum.model";
import {Role} from "../authentication/role-enum.model";
import {RelayPoint} from "../relay-point/relay-point.model";
import {AuditingEntity} from "../shared/auditing-entity.model";

export interface User extends AuditingEntity {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  joinedDate: number;
  country: Country;
  address: Address;
  profilePicture?: string;
  coverImage?: string;
  accountVerification: IVerification;
  dateOfBirth: DateOfBirth;
  language: AccountLanguage;
  stripeAccount?: StripeAccount;
  rating?: Rating;
  accountSuspension?: ISuspension;
  firebaseToken?: string;
  role: Role;
  stripeCustomerId: string;
  paymentsEnabled: boolean;
  transfersEnabled: boolean;
  relayPoint: RelayPoint
  enabled: boolean;
}

export interface Address {
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: Country;
}

export interface DateOfBirth {
  day: number;
  month: number;
  year: number;
}

interface Rating {
  id: string;
  avgRating: number;
  reviewsCount: number;
}

export interface StripeAccount {
  id: string;
  created: number;
  country: string;
  individual: StripeAccountIndividual;
  defaultCurrency: string;
  detailsSubmitted: boolean;
  verificationStatus: StripeAccountVerificationStatus;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  externalAccountsExist: boolean;
}

export interface StripeAccountIndividual {
  id: string;
  phone: string;
  address: StripeAccountIndividualAddress;
}

export interface StripeAccountIndividualAddress {
  line1?: string;
  line2?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country: string;
}

export enum StripeAccountVerificationStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  PENDING = 'PENDING'
}

export enum StripeAccountCountry {
  FR = 'FR',
  US = 'US'
}
