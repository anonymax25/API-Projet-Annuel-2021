import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCodeSaveModule } from '../code-token/code-token.module';
import { CodeSaveController } from './code-save.controller';
import Code from './code-save.entity';
import { CodeSaveService } from './code-save.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Code], 'POSTGRES'),
        ConfigModule,
        TokenCodeSaveModule,
    ],
    controllers:[CodeSaveController],
    providers: [CodeSaveService],
    exports: [CodeSaveService]
})
export class CodeSaveModule { }