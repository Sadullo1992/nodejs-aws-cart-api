import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serverlessExpress = require('@vendia/serverless-express');

let cachedServer: any;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    nestApp.enableCors({
      origin: (req, callback) => callback(null, true),
    });
    await nestApp.init();
    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler = async (event: any, context: any, callback: any) => {
  console.log('ENVIRONMENT VARIABLES\n' + JSON.stringify(process.env, null, 2));
  console.info('EVENT\n' + JSON.stringify(event, null, 2));

  const server = await bootstrap();
  const result = await server(event, context, callback);

  return result;
};

exports.handler = handler;
