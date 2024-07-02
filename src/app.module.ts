import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinoLogger } from '@/infra/gateways/logger/pino.logger';
import { SqsQueueModule } from './infra/gateways/sqs/sqs.module';

@Module({
  imports: [SqsQueueModule],
  controllers: [AppController],
  providers: [
    PinoLogger,
    AppService
  ],
})
export class AppModule {}
