import { Inject } from '@nestjs/common';
import { Auth } from '../../domain/entities/Auth';
import { AuthRepository } from '../../domain/repository/auth.repository';
import { USER_SERVICE } from 'src/utils/ms/msNames';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Injectable } from 'src/utils/dependencyInject/injectable';
import { ErrorSignInException } from '../../domain/errors/errorSignIn.exception';
import { DbRepository } from './dynamoDb.repository';
import { GenerateToken } from '../generateToken/generateToken';
import { HashPasswordAndCompare } from '../hashPassword/hashPassword';

@Injectable()
export class AuthMicroservice extends AuthRepository {
  constructor(
    @Inject(USER_SERVICE) private client: ClientProxy,
    private readonly dbRepository: DbRepository,
    private readonly generateToken: GenerateToken,
    private readonly hashPassword: HashPasswordAndCompare,
  ) {
    super();
  }
  async signIn(data: Auth): Promise<{ token: string }> {
    const { password, ...rest } = data.attributes;
    let response;
    let result;
    if (rest.username) {
      response = this.client.send('getOne', { username: rest.username });
      result = await this.dbRepository.getUsersByUsername(rest.username);
    } else {
      response = this.client.send('getOne', { email: rest.email });
      result = await this.dbRepository.getUsersByEmail(rest.email);
    }
    const comparePassword = await this.hashPassword.comparePassword(
      password,
      result[0].password.S,
    );
    if (!comparePassword)
      throw new ErrorSignInException('Credenciales invalidas');

    const user = Auth.signIn(await firstValueFrom(response));
    return await this.generateToken.generateToken(user);
  }
  async signUp(data: Auth): Promise<string> {
    const result = this.client.send('createUser', data.toValue());

    const user = new Auth(await firstValueFrom(result));

    const hashPass = await this.hashPassword.hashPassword(
      data.attributes.password,
    );
    return await this.dbRepository.createUser(
      user.attributes.id,
      user.attributes.username,
      user.attributes.email,
      hashPass,
    );
  }
  signSocial(): Promise<string> {
    const result = this.client.send('createUser', {});

    return firstValueFrom(result);
  }
}
