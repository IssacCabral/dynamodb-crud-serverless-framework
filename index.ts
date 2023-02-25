import { APIGatewayEvent } from "aws-lambda";

const create = async (event: APIGatewayEvent) => {
  console.log("evento", event);

  return {
    statusCode: 200,
  };
};

export { create };
