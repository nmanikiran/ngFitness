export interface Profile {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  email: string;
  address: Address;
  profileUrl?: string;
  bio: string;
  id?: string;
  authId?: string;
}

export interface Address {
  formatted_address: string;
  locality: string;
  admin_area_l1: string;
  street_number: string;
  route: string;
  country: string;
  postal_code: string;
}
