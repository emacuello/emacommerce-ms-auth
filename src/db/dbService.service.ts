// dynamodb.service.ts
import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDBRepository {
  constructor(private readonly dynamoDBClient: DynamoDBClient) {}

  async getItem(tableName: string, key: { [key: string]: any }) {
    const command = new GetItemCommand({
      TableName: tableName,
      Key: key,
    });

    try {
      const response = await this.dynamoDBClient.send(command);
      return response.Item;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw new Error('Could not fetch item.');
    }
  }

  async queryItems(
    tableName: string,
    indexName: string,
    keyConditionExpression: string,
    expressionAttributeValues: { [key: string]: any },
  ) {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    try {
      const response = await this.dynamoDBClient.send(command);
      return response.Items;
    } catch (error) {
      console.error('Error querying items:', error);
      throw new Error('Could not query items.');
    }
  }

  async scanItems(tableName: string) {
    const command = new ScanCommand({
      TableName: tableName,
    });

    try {
      const response = await this.dynamoDBClient.send(command);
      return response.Items;
    } catch (error) {
      console.error('Error scanning items:', error);
      throw new Error('Could not scan items.');
    }
  }
  async putItem(tableName: string, item: { [key: string]: any }) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });

    try {
      const response = await this.dynamoDBClient.send(command);
      return response;
    } catch (error) {
      console.error('Error putting item:', error);
      throw new Error('Could not put item.');
    }
  }
}
