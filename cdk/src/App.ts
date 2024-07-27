import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NodejsAwsCartStack } from './Stack';

const app = new cdk.App();
new NodejsAwsCartStack(app, 'NodejsAwsCartStack', {});