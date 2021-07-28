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

export const config = {
  execution_timeout: 2000,
  mainApiConfig: {
    url: "http://localhost:3030/api/v1",
    email: "testing@testing.com",
    password: "testing",
  }
}
