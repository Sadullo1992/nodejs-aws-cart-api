import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { ConfigProps } from './config';

type AwsEnvStackProps = cdk.StackProps & {
  config: Readonly<ConfigProps>;
};

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsEnvStackProps) {
    super(scope, id, props);

    const { config } = props;

    const cartServiceLambda = new NodejsFunction(this, 'CartServiceLambda', {
      functionName: 'CartServiceLambda',
      entry: '../dist/main.lambda.js',
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(10),
      environment: {
        POSTGRES_HOST: config.POSTGRES_HOST,
        POSTGRES_PORT: config.POSTGRES_PORT,
        POSTGRES_DB: config.POSTGRES_DB,
        POSTGRES_USER: config.POSTGRES_USER,
        POSTGRES_PASSWORD: config.POSTGRES_PASSWORD,
      },
      bundling: {
        externalModules: [
          '@nestjs/microservices',
          '@nestjs/websockets',
          'class-transformer',
          'class-validator',
        ],
      },
    });

    const functionUrl = cartServiceLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, 'cart-service-function-url', {
      value: functionUrl.url,
      exportName: 'cart-service-function-url',
    });
  }
}
