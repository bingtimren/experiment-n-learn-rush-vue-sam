const G = require("@bingsjs/greeting");

/**
 * Rewrite to test dependency in a monorepo
 */
exports.getByIdHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }
  // All log statements are written to CloudWatch
  console.info("received:", event, "\n");

  // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
  const id = event.pathParameters.id;

  const response = {
    statusCode: 200,
    body: JSON.stringify(G.greeting(id)),
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}\n`
  );

  return response;
};
