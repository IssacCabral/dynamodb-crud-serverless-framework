import { APIGatewayEvent } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { CreateUserParams, InsertUser } from "./src/types/user.types";
import * as uuid from "uuid";

class UserCrud {
  constructor(
    private readonly dynamodDbService: DynamoDB.DocumentClient,
    private readonly dynamoDbTable: string
  ) {}

  private prepareData(data: CreateUserParams) {
    console.log(data);
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

      const createdUser = await this.dynamodDbService.put(dbParams).promise();

      return {
        statusCode: 200,
        body: JSON.stringify(createdUser),
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
