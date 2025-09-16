export interface IBookingUser {
  id: string;
  username?: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  ratingScore?: number;
  enabled?: boolean;
  fireBaseToken?: string;
}
