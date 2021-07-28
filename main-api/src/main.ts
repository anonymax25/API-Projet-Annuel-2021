import './initEnv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as download from 'download-git-repo';



async function downloadClient(){
  return new Promise((resolve, reject) => {
    download('abdelillah-tech/convertissuer-a-gogo-front#release', './static/prod', (err) => {
      if(err)
        reject(err)
      resolve(null)
    })
  })
}

const logger = new Logger('Init')

const { ENV, PORT, API_VERSION } = process.env

async function bootstrap() {

  if(ENV === 'prod'){
    logger.log("Download client start")
    await downloadClient()
    logger.log("Download client finished")
  }

  const allowedResponseOrigins = [
    "http://localhost:3000",
    "http://localhost:3003",
    "http://ec2-15-188-232-65.eu-west-3.compute.amazonaws.com"
  ]

  const app = await NestFactory.create(AppModule);

  //prefix  for api URL
  app.setGlobalPrefix(`api/v${API_VERSION}`);

  // swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Projet Annuel API')
    .setDescription('back nestJs de l\'application')
    .setVersion(`${API_VERSION}`)
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.use(morgan('tiny'));
  
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

