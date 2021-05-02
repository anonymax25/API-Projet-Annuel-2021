import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('Init')
const PORT = 3001

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // start app
  await app.listen(PORT).then(() => {
    logger.log(`App started on port ${PORT}`);
  });
}
bootstrap();
