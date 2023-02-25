"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var aws_sdk_1 = require("aws-sdk");
var index_1 = require("../index");
var dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
var userCrud = new index_1.default(dynamoDb, (_a = process.env.DYNAMODB_TABLE) !== null && _a !== void 0 ? _a : "");
var create = userCrud.create.bind(userCrud);
exports.create = create;
//# sourceMappingURL=factory.js.map