const greetingFn : AWSLambda.APIGatewayProxyHandlerV2 = async (event, context) => {
    return {
        statusCode: 200,
        body: "Hi there"
    }
}