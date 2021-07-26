import { HttpModule, Module } from '@nestjs/common';
import { TokenCodeSaveModule } from '../code-token/code-token.module';
import { PrivateFilesModule } from '../private-files/private-files.module';
import { CodeExecutorController } from './code-executor.controller';
import { CodeExecutorService } from './code-executor.service';

@Module({
  imports: [
    HttpModule,
    PrivateFilesModule,
    TokenCodeSaveModule,
  ],
  controllers: [CodeExecutorController],
  providers: [CodeExecutorService]
})
export class CodeExecutorModule {}
