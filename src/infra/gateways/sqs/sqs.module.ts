import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SqsProducerService } from "./sqs-producer.service";
import { SqsConsumerService } from './sqs-consumer.service';
import { Config } from '@/infra/gateways/sqs/sqs.config';
import { PinoLogger } from '@/infra/gateways/logger/pino.logger';

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: Config.QueueName,
          queueUrl: Config.QueueURL,
          region: Config.QueueRegion,
        },
      ],
      producers: [
        {
          name: Config.QueueName,
          queueUrl: Config.QueueURL,
          region: Config.QueueRegion,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [
    PinoLogger,
    SqsProducerService,
    SqsConsumerService
  ],
  exports: [SqsProducerService],
})
export class SqsQueueModule {}
