import { DynamoDB } from "aws-sdk";
import UserCrud from "../index";

const dynamoDb = new DynamoDB.DocumentClient();
const userCrud = new UserCrud(dynamoDb, process.env.DYNAMODB_TABLE ?? "");

const create = userCrud.create.bind(userCrud);

export { create };
