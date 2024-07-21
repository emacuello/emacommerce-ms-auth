import { Controller } from '@nestjs/common';
import { V1_ROUTES } from '../../routes';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { SingUpDto } from './sigin.dto';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ErrorSignInException } from 'src/contexts/auth/domain/errors/errorSignIn.exception';

@Controller(V1_ROUTES.BASE)
export class SigInController {
  constructor(private client: UserSignInService) {}
  @MessagePattern('signIn')
  signIn(@Payload() dto: SingUpDto) {
    try {
      return this.client.run(dto);
    } catch (error) {
      if (error instanceof ErrorSignInException) {
        throw new RpcException(error.message);
      }
    }
  }
}
