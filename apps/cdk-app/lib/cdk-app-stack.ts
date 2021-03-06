import * as cdk from '@aws-cdk/core';
import {GreetingService} from './greeting-service'
export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new GreetingService(this, GreetingService.name)
  }
}
