import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  AttributeDefinition,
  KeySchemaElement,
  KeyType,
  GlobalSecondaryIndex,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDBConfigService implements OnModuleInit {
  constructor(private readonly dynamoDBClient: DynamoDBClient) {}
  private logger = new Logger(DynamoDBConfigService.name);
  async onModuleInit() {
    const tableName = 'credentials';

    try {
      await this.dynamoDBClient.send(
        new DescribeTableCommand({ TableName: tableName }),
      );
      this.logger.log(
        `Table "${tableName}" already exists, skipping creation.`,
      );
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
        const params = {
          TableName: tableName,
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' } as AttributeDefinition,
            {
              AttributeName: 'username',
              AttributeType: 'S',
            } as AttributeDefinition,
            {
              AttributeName: 'email',
              AttributeType: 'S',
            } as AttributeDefinition,
            {
              AttributeName: 'password',
              AttributeType: 'S',
            } as AttributeDefinition,
          ] as AttributeDefinition[],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH' as KeyType,
            } as KeySchemaElement,
          ] as KeySchemaElement[],
          ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10,
          },
          GlobalSecondaryIndexes: [
            {
              IndexName: 'UsernameIndex',
              KeySchema: [
                { AttributeName: 'username', KeyType: 'HASH' as KeyType },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
              },
            },
            {
              IndexName: 'EmailIndex',
              KeySchema: [
                { AttributeName: 'email', KeyType: 'HASH' as KeyType },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
              },
            },
            {
              IndexName: 'PasswordIndex',
              KeySchema: [
                { AttributeName: 'password', KeyType: 'HASH' as KeyType },
              ],
              Projection: {
                ProjectionType: 'ALL',
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10,
              },
            },
          ] as GlobalSecondaryIndex[],
        };

        await this.dynamoDBClient.send(new CreateTableCommand(params));
        this.logger.log(`Table "${tableName}" created successfully.`);
      } else {
        console.error('Error checking for table existence:', error);
      }
    }
  }
}
