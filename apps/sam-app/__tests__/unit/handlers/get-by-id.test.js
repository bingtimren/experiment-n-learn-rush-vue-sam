// Import all functions from get-by-id.js
const lambda = require("../../../src/handlers/get-by-id.js");

// This includes all tests for getByIdHandler()
describe("Test getByIdHandler", () => {
  // This test invokes getByIdHandler() and compare the result
  it("should get item by id", async () => {
    const event = {
      httpMethod: "GET",
      pathParameters: {
        id: "id1",
      },
    };

    // Invoke getByIdHandler()
    const result = await lambda.getByIdHandler(event);

    const expectedResult = {
      statusCode: 200,
      body: JSON.stringify("Hi, id1"),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});
