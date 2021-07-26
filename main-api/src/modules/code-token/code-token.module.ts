import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCode } from './code-token.entity';
import { TokenCodeSaveService } from './code-token.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TokenCode], 'POSTGRES'),
        ConfigModule,
    ],
    providers: [TokenCodeSaveService],
    exports: [TokenCodeSaveService]
})
export class TokenCodeSaveModule { }