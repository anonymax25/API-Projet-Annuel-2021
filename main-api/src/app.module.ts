import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { RootModule } from './modules/root/root.module';
import { User } from './modules/users/user.entity';
import { CodeExecutorModule } from './modules/code-executor/code-executor.module';
import { FileUploadModule } from 'modules/file-upload/file-upload.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { PrivateFilesModule } from 'modules/private-files/private-files.module';
import PrivateFile from 'modules/private-files/private-file.entity';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  ENV
} = process.env

const POSTGRES_DB_CONFIG: PostgresConnectionOptions = {
  name: "POSTGRES",
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  logging: ['error'],
  entities: [User, PrivateFile],
  synchronize: true
};

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
    RootModule,
    AuthenticationModule,
    UsersModule,
    CodeExecutorModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
