import { JwtService } from '@nestjs/jwt';
import { Injectable } from 'src/utils/dependencyInject/injectable';
import { PayloadJwt } from './interfaces';
import { Auth } from '../../domain/entities/Auth';

@Injectable()
export class GenerateToken {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(data: Auth): Promise<{ token: string }> {
    const payload: PayloadJwt = {
      iss: data.attributes.id,
      sub: data.attributes.email,
      role: data.attributes.role,
    };
    const token = this.jwtService.sign(payload);
    return {
      token: token,
    };
  }
}
