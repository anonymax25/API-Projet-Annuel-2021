import { HttpModule, Module } from '@nestjs/common';
import { CodeExecutorController } from './code-executor.controller';
import { CodeExecutorService } from './code-executor.service';

@Module({
  imports: [HttpModule],
  controllers: [CodeExecutorController],
  providers: [CodeExecutorService]
})
export class CodeExecutorModule {}
