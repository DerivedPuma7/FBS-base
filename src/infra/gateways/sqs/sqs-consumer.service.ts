import { PinoLogger } from '@/infra/gateways/logger/pino.logger';
import { Config } from '@/infra/gateways/sqs/sqs.config';

import {
  SqsConsumerEventHandler,
  SqsMessageHandler,
} from '@ssut/nestjs-sqs';
import * as AWS from '@aws-sdk/client-sqs';
import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsConsumerService {
  constructor(private readonly logger: PinoLogger) {}

  @SqsMessageHandler(Config.QueueName, false)
  async handleMessage<T>(message: AWS.Message) {
    const queuePayload: T = message.Body as T;
    this.logger.log("handling sqs message: ", queuePayload);
  }

  @SqsConsumerEventHandler(Config.QueueName, 'processing_error')
  public async onProcessingError(error: Error, message: Message) {
    this.logger.log("error handling sqs message: ", { error, message });
  }
}
