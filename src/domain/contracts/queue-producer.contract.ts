export interface QueueProducer {
  send<T>(input: SendMessage.Input<T>): Promise<SendMessage.Output>
}

export namespace SendMessage {
  export type Input<T> = {
    messageBody: T,
    messageId: string,
    queueName: string
  }
  export type Output = void
}
