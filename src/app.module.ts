import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RootModule } from './modules/root/root.module';
import { User } from './modules/users/user.entity';
import { CodeExecutorModule } from './modules/code-executor/code-executor.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import PrivateFile from './modules/private-files/private-file.entity';
import Code from './modules/code-save/code-save.entity';
import { TokenCode } from './modules/code-token/code-token.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  ENV
} = process.env


let POSTGRES_DB_CONFIG: PostgresConnectionOptions
if(ENV === 'prod'){
  POSTGRES_DB_CONFIG = {
    name: "POSTGRES",
    type: 'postgres',
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    logging: ['error'],
    entities: [User, PrivateFile, Code, TokenCode],
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  };
} else {
  POSTGRES_DB_CONFIG = {
    name: "POSTGRES",
    type: 'postgres',
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    logging: ['error'],
    entities: [User, PrivateFile, Code, TokenCode],
    synchronize: true
  };
}

@Module({
  imports: [
    TypeOrmModule.forRoot(POSTGRES_DB_CONFIG),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      })
    }),
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', ENV === 'prod' ? './static/prod' : './static/dev')}),
    RootModule,
    AuthenticationModule,
    UsersModule,
    CodeExecutorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
