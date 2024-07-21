import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { SingUpDto } from './signUp.dto';
import { ErrorCreateException } from 'src/contexts/auth/domain/errors/errorCreate.exception';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller(V1_ROUTES.BASE)
export class SigUpController {
  constructor(private client: UserCreateService) {}
  @MessagePattern('signUp')
  async signIn(@Payload() dto: SingUpDto) {
    try {
      return await this.client.run(dto);
    } catch (error) {
      if (error instanceof ErrorCreateException) {
        throw new RpcException(error.message);
      }
    }
  }
}
