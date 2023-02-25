import { APIGatewayEvent } from "aws-lambda";

const handler = async (event: APIGatewayEvent) => {
  console.log("evento", event);

  return {
    statusCode: 200,
  };
};

export { handler };
