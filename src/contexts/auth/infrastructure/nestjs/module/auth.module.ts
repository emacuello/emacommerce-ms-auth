import { Module } from '@nestjs/common';
import { SigInController } from '../controller/V1/signin/sigin.controller';
import { SigUpController } from '../controller/V1/signup/signup.controller';
import { UserCreateService } from 'src/contexts/auth/application/userCreate/userCreate.service';
import { UserSignInService } from 'src/contexts/auth/application/userSingIn/userSigIn.service';
import { AuthRepository } from 'src/contexts/auth/domain/repository/auth.repository';
import { AuthMicroservice } from '../../ms/authMicroservices';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/utils/ms/msNames';
import { envs } from 'src/config/envs';
import { DynamoDBModule } from 'src/db/dynamodb.module';
import { JwtConfigModule } from 'src/config/jwt.module';
import { GenerateToken } from '../../generateToken/generateToken';
import { HashPasswordAndCompare } from '../../hashPassword/hashPassword';
import { DbRepository } from '../../ms/dynamoDb.repository';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.NATS,
        options: {
          urls: [envs.NATS_SERVER_URL],
        },
      },
    ]),
    DynamoDBModule,
    JwtConfigModule,
  ],
  controllers: [SigInController, SigUpController],
  providers: [
    UserCreateService,
    UserSignInService,
    AuthMicroservice,
    GenerateToken,
    HashPasswordAndCompare,
    DbRepository,
    {
      provide: AuthRepository,
      useExisting: AuthMicroservice,
    },
  ],
})
export class AuthModule {}
