import { DynamoDBRepository } from 'src/db/dbService.service';
import { Injectable } from 'src/utils/dependencyInject/injectable';

@Injectable()
export class DbRepository {
  private tableName = 'credentials';

  constructor(private readonly dbRepository: DynamoDBRepository) {}
  async getUserById(userId: string) {
    const key = {
      id: { S: userId },
    };

    return await this.dbRepository.getItem(this.tableName, key);
  }
  async getUsersByUsername(username: string) {
    const indexName = 'UsernameIndex';
    const keyConditionExpression = 'username = :username';
    const expressionAttributeValues = {
      ':username': { S: username },
    };

    return this.dbRepository.queryItems(
      this.tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
    );
  }
  async getUsersByEmail(email: string) {
    const indexName = 'EmailIndex';
    const keyConditionExpression = 'email = :email';
    const expressionAttributeValues = {
      ':email': { S: email },
    };

    return this.dbRepository.queryItems(
      this.tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
    );
  }
  async createUser(
    id: string,
    username: string,
    email: string,
    password: string,
  ) {
    const item = {
      id: { S: id },
      username: { S: username },
      email: { S: email },
      password: { S: password },
    };

    await this.dbRepository.putItem(this.tableName, item);
    return 'Usuario creado correctamente';
  }

  async getAll() {
    return await this.dbRepository.scanItems(this.tableName);
  }
}
