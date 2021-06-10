import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ExecutionController } from './execution.controller';
import { ExecutionService } from './execution.service';
import { FileService } from './file.service';

@Module({
  imports: [],
  controllers: [ExecutionController],
  providers: [ExecutionService, FileService, AuthenticationService]
})
export class ExecutionModule {}
