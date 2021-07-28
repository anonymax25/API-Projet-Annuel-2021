import './initEnv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';


const logger = new Logger('Init')
const { PORT } = process.env

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  // start app
  await app.listen(PORT).then(() => {
    logger.log(`App started on port ${PORT}`);
  });
}
bootstrap();