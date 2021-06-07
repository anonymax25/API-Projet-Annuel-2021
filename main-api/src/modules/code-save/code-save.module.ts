import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Code from './code-save.entity';
import { CodeSaveService } from './code-save.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Code], 'POSTGRES'),
        ConfigModule,
    ],
    providers: [CodeSaveService],
    exports: [CodeSaveService]
})
export class CodeSaveModule { }