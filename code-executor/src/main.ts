import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';


const logger = new Logger('Init')
const PORT = 3001

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  config.update({
    accessKeyId: s3config.AWS_ACCESS_KEY_ID,
    secretAccessKey: s3config.AWS_SECRET_ACCESS_KEY,
    region: s3config.AWS_REGION,
  });

  // start app
  await app.listen(PORT).then(() => {
    logger.log(`App started on port ${PORT}`);
  });
}
bootstrap();

export const s3config ={
  AWS_PRIVATE_BUCKET_NAME: "convagogo",
  AWS_REGION: "eu-west-3",
  AWS_ACCESS_KEY_ID: "AKIAR3PYWYRMYBEEVQ52",
  AWS_SECRET_ACCESS_KEY: "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"
}
