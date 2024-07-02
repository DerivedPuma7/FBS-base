export const Config = {
  QueueName: process.env.AWS_SQS_QUEUE_NAME as string,
  QueueURL: process.env.AWS_SQS_QUEUE_URL as string,
  QueueRegion: process.env.AWS_REGION as string
}
