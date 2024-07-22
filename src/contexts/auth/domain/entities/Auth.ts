export interface PrimitiveAuth {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: bigint | number;
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
  phone?: bigint | number;
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
  toValue(): PrimitiveAuth {
    return this.attributes;
  }
  toValueRegister(): Partial<PrimitiveAuth> {
    return {
      name: this.attributes.name,
      username: this.attributes.username,
      email: this.attributes.email,
      password: this.attributes.password,
      phone: this.attributes.phone,
      country: this.attributes.country,
      address: this.attributes.address,
      city: this.attributes.city,
      birthdate: this.attributes.birthdate,
    };
  }

  toValueSignIn(): Partial<PrimitiveAuth> {
    return {
      id: this.attributes.id,
      username: this.attributes.username,
      email: this.attributes.email,
      password: this.attributes.password,
    };
  }
}
