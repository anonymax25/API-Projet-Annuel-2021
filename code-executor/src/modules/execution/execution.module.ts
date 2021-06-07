import { Module } from '@nestjs/common';
import { ExecutionController } from './execution.controller';
import { ExecutionService } from './execution.service';
import { S3Service } from './s3.service';

@Module({
  imports: [],
  controllers: [ExecutionController],
  providers: [ExecutionService, S3Service]
})
export class ExecutionModule {}
