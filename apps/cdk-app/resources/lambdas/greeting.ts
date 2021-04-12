import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { greeting as greet } from "@bingsjs/greeting";
import S = require("string");

const greetingFn: APIGatewayProxyHandlerV2 = async (event, context) => {
  const name = event.queryStringParameters?.name;
  return {
    statusCode: 200,
    body: S(greet(name || "stranger"))
      .titleCase()
      .toString(),
  };
};

export const greeting = greetingFn;
