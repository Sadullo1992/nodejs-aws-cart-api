import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CartServiceStack } from './Stack';
import { getConfig } from './config';
const config = getConfig();

const app = new cdk.App();
new CartServiceStack(app, 'CartServiceStack', { config });