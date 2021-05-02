import { HttpModule, Module } from '@nestjs/common';
import { PythonController } from './python.controller';
import { PythonService } from './python.service';

@Module({
  imports: [],
  controllers: [PythonController],
  providers: [PythonService]
})
export class PythonModule {}
