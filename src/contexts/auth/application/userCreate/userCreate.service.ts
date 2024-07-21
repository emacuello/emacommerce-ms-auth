import { Injectable } from 'src/utils/dependencyInject/injectable';
import { Auth } from '../../domain/entities/Auth';
import { ErrorCreateException } from '../../domain/errors/errorCreate.exception';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { UserCreateDtos } from './userCreate.dto';

@Injectable()
export class UserCreateService {
  constructor(private readonly userRepository: AuthRepository) {}

  async run(dto: UserCreateDtos): Promise<string> {
    const $user = Auth.create(dto);
    const newUser = await this.userRepository.signUp($user);
    if (!newUser) throw new ErrorCreateException('Error al crear el usuario');
    return newUser;
  }
}
