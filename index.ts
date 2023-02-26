import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { CreateUserParams } from "./src/types/user.types";
import * as uuid from "uuid";

class UserCrud {
  constructor(
    private readonly dynamodDbService: DynamoDB.DocumentClient,
    private readonly dynamoDbTable: string
  ) {}

  private prepareData(data: CreateUserParams) {
    return {
      TableName: this.dynamoDbTable,
      Item: {
        ...data,
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
      },
    };
  }

  async create(event: APIGatewayEvent) {
    try {
      const data: CreateUserParams = JSON.parse(event.body!);
      const dbParams = this.prepareData(data);

      await this.dynamodDbService.put(dbParams).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(dbParams.Item),
      };
    } catch (error) {
      console.error(error.stack);
      return {
        statusCode: 500,
      };
    }
  }

  async delete(event: APIGatewayEvent) {
    try {
      console.log(event.pathParameters!.id);

      const params = {
        TableName: this.dynamoDbTable,
        Key: {
          id: event.pathParameters!.id,
          nameUser: "Romeo Cabral",
        },
      };

      await this.dynamodDbService.delete(params).promise();

      return {
        statusCode: 200,
        body: true,
      };
    } catch (error) {
      console.error(error.stack);
      return {
        statusCode: 500,
      };
    }
  }

  async findAll(event: APIGatewayEvent) {
    try {
      const params = {
        TableName: this.dynamoDbTable,
      };

      const result = await this.dynamodDbService.scan(params).promise();
      const items = result.Items?.map((item) => item);

      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    } catch (error) {
      console.error(error.stack);
      return {
        statusCode: 500,
      };
    }
  }
}

export default UserCrud;
