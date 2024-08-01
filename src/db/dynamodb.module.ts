import { Module } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBConfigService } from './dynamodb.service';
import { envs } from 'src/config/envs';
import { DynamoDBRepository } from './dbService.service';

@Module({
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: () => {
        return new DynamoDBClient({
          region: envs.AWS_REGION,
          endpoint: envs.DB_URL,
          credentials: {
            accessKeyId: envs.ACCES_KEY_ID,
            secretAccessKey: envs.SECRET_ACCESS_KEY,
          },
        });
      },
    },
    DynamoDBConfigService,
    DynamoDBRepository,
  ],
  exports: [DynamoDBRepository, DynamoDBConfigService],
})
export class DynamoDBModule {}
