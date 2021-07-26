import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ExecutionModule } from './modules/execution/execution.module';

@Module({
  imports: [
    ExecutionModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
