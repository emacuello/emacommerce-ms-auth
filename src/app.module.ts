import { Module } from '@nestjs/common';
import { AuthModule } from './contexts/auth/infrastructure/nestjs/module/auth.module';
import { DynamoDBModule } from './db/dynamodb.module';

@Module({
  imports: [DynamoDBModule, AuthModule],
})
export class AppModule {}
