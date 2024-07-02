import { QueueProducer, SendMessage } from '@/domain/contracts/queue-producer.contract';
import { PinoLogger } from '@/infra/gateways/logger/pino.logger';

import { SqsService } from '@ssut/nestjs-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsProducerService implements QueueProducer{
  constructor(
    private readonly logger: PinoLogger,
    private readonly sqsService: SqsService
  ) {}

  async send<T>(input: SendMessage.Input<T>): Promise<void> {
    try {
      this.logger.log("producing sqs message: ", input.messageBody);
      await this.sqsService.send<T>(
        input.queueName,
        {
          id: input.messageId,
          body: input.messageBody
        }
      );
    } catch (error) {
      this.logger.log("error producing message: ", error);
    }
  }
}
