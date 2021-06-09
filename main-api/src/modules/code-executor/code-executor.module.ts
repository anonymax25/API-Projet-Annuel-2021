import { HttpModule, Module } from '@nestjs/common';
import { PrivateFilesModule } from 'modules/private-files/private-files.module';
import { CodeExecutorController } from './code-executor.controller';
import { CodeExecutorService } from './code-executor.service';

@Module({
  imports: [
    HttpModule,
    PrivateFilesModule
  ],
  controllers: [CodeExecutorController],
  providers: [CodeExecutorService]
})
export class CodeExecutorModule {}
