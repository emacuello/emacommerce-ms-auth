export interface UserCreateDtos {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: bigint | number;
  country: string;
  address: string;
  city: string;
  birthdate: string;
}
