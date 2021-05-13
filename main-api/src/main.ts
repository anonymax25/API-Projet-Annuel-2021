import './initEnv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';


const logger = new Logger('Init')

const { PORT, API_VERSION } = process.env

async function bootstrap() {

  const allowedResponseOrigins = [
    "http://localhost:3000"
  ]

  const app = await NestFactory.create(AppModule);

  //prefix  for api URL
  app.setGlobalPrefix(`api/v${API_VERSION}`);

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Projet Annuel API')
    .setDescription('back nestJs de l\'application')
    .setVersion(`${API_VERSION}`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // cors config
  app.enableCors({
    origin: allowedResponseOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200,
    allowedHeaders: '*',
  })
  
  // start app
  await app.listen(PORT || 3000).then(() => {
    logger.log(`App started on port ${PORT || 3000}`);
  });
}

bootstrap();

