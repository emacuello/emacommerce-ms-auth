import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envs } from './envs';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
