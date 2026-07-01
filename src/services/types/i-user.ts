export enum EnumUserType {
    USER_COMMON = 'common',
    USER_ADMIN = 'adm',
    USER_NURSE = 'nurse',
}

export interface Address {
  id_address: string;
  id_user?: string;
  id_donation_point?: string;
  zipcode: string;
  street: string;
  number?: string;
  city: string;
  state: string;
  neighborhood: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at?: string;
  removed_at?: string;
}