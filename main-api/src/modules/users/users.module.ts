import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrivateFilesModule } from 'modules/private-files/private-files.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CodeSaveModule } from 'modules/code-save/code-save.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'POSTGRES'),
    PrivateFilesModule,
    CodeSaveModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
