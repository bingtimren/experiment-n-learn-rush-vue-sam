import * as core from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { EndpointType } from "@aws-cdk/aws-apigateway";

export class GreetingService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    // the lambda handler

    const handler = new lambda.Function(this, "GreetingHandler", {
      runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset("build/lambdas"),
      handler: "greeting.greeting",
    });

    // the API
    const api = new apigateway.RestApi(this, "GreetingApi", {
      restApiName: "Greeting API",
      description: "Returns a greeting",
    });

    // the Resource
    const greetingResource = api.root.addResource("greeting");

    // the integration
    const greetingIntegration = new apigateway.LambdaIntegration(handler);

    // attach integration to method of resource
    greetingResource.addMethod("GET", greetingIntegration); 
  }
}