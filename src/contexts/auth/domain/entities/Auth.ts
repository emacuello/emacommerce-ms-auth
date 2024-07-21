export interface PrimitiveAuth {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
  role?: string;
  birthdate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuthDto {
  name: string;
  email: string;
  username?: string;
  password?: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
  birthdate?: string;
}

interface SigInDto {
  username?: string;
  email?: string;
  password: string;
}

export class Auth {
  constructor(public readonly attributes: PrimitiveAuth) {}

  static create(dto: AuthDto): Auth {
    return new Auth(dto);
  }

  static signIn(dto: SigInDto): Auth {
    return new Auth(dto);
  }
}
