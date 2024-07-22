import { Injectable } from 'src/utils/dependencyInject/injectable';
import { Auth } from '../../domain/entities/Auth';
import { ErrorSignInException } from '../../domain/errors/errorSignIn.exception';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { UserSingInDtos } from './userSigIn.dto';

@Injectable()
export class UserSignInService {
  constructor(private readonly authRepository: AuthRepository) {}

  async run(dto: UserSingInDtos): Promise<{ token: string }> {
    const $user = Auth.signIn(dto);
    const user = await this.authRepository.signIn($user);
    if (!user) throw new ErrorSignInException('Error al iniciar sesion');
    return user;
  }
}
