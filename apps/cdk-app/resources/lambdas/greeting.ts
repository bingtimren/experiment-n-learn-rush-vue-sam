import {APIGatewayProxyHandlerV2} from "aws-lambda"

const greetingFn : APIGatewayProxyHandlerV2 = async (event, context) => {
    const name = event.queryStringParameters?.name
    return {
        statusCode: 200,
        body: `Hi there, ${name?name:'stranger'}`
    }
}

export const greeting = greetingFn