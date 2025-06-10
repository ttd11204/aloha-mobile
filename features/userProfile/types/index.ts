export type UserProfile = {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string | null;
  fullname: string | null;
  balance: number;
  profilePictureUrl: string | null;
  createdDate: string | null; // or Date | null if you plan to convert the string to a Date object
  emailConfirmed: boolean;
  phoneNumberConfirmed: boolean;
};