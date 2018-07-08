// import { Channel, Connection, connect } from 'amqplib/callback_api'
import { Message, Options, Replies } from 'amqplib/properties';
import { RabbitConfig } from '../interfase/rabitConfig';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { Observable, Observer } from 'rxjs/index';
import { Channel, Connection } from 'amqplib';
import { RabbitConnectionManager } from './rabbitConnectionManager';

interface Nack {
  message: Message
  allUpTo?: boolean;
  requeue?: boolean
}

type Ack = (message: Message, allUpTo?: boolean) => void

export class RabbitConsumer {
  private rabbitConnectionManager: RabbitConnectionManager;
  private config: RabbitConfig;
  private rabbitChannel: Channel;
  private consumerTag: Replies.Consume;
  private observer: Observer<Message>;
  private queue: string;
  private queueOptions: Options.Consume;


  constructor(rabbitConfig: RabbitConfig, connection?: Connection) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    this.rabbitConnectionManager = new RabbitConnectionManager(this.config, connection);
  }

  private setUpListener(): void {
    this.rabbitChannel.on('error', () => {
      this.rabbitChannel = undefined;
      this.consumeFromQueue();
    });
    this.rabbitChannel.on('close', () => {
      console.log('connection closed');
      this.rabbitChannel = undefined;
      this.consumeFromQueue();
    });
    this.rabbitChannel.on('blocked', () => {
      console.log('[rabbit]: connection blocked');
    });
    this.rabbitChannel.on('unblocked', () => {
      console.log('[rabbit]: connection unblocked');
    });
  }

  public getChannel(): Promise<Channel> {
    return new Promise((resolve, reject) => {
      if (this.rabbitChannel) {
        return resolve(this.rabbitChannel);
      }
      this.rabbitConnectionManager.createChannel()
          .then(channel => {
            this.rabbitChannel = channel;
            this.setUpListener();
            return resolve(channel);
          })
          .catch(err => {
            console.log(err);
            console.log('fatal - can\'t create channel after multiple retries');
            this.observer.error('fatal');
            return reject(err);
          });
    });
  }

  private assertQueue(queue = this.queue, options = this.queueOptions): Promise<Channel> {
    return new Promise((resolve, reject) => {
      this.getChannel()
          .then(channel => {
            channel.assertQueue(queue, options)
                .then((replay: Replies.AssertQueue) => {
                  console.log(`queue ${replay.queue} has ${replay.consumerCount} consumers, and ${replay.messageCount} messages`);
                  return resolve(channel);
                })
                .catch(err => {
                  this.rabbitChannel = undefined;
                  return this.assertQueue(queue, options);
                });
          });
    });
  }

  public clientConsume(queue = this.config.config_rabbitQueueName, options: Options.Consume = this.config.config_queueOptions) {
    this.queue = queue;
    this.queueOptions = options;
    return new Observable((observer: Observer<Message>) => {
      this.observer = observer;
      this.consumeFromQueue();
    });
  }

  private consumeFromQueue(): void {
    if (this.observer) {
      this.assertQueue()
          .then(channel => {
            console.log('[rabbit]: start consuming');
            channel.consume(
                this.queue,
                (msg: Message) => {
                  this.observer.next(msg);
                },
                this.queueOptions
            )
                .then((consumerTag) => {
                  this.consumerTag = consumerTag;
                })
                .catch(err => {
                  this.rabbitChannel = undefined;
                  console.log('[rabbit]: can\'t consume');
                  return this.consumeFromQueue();
                });
          });
    }
  }


  public cancel(msg: Message) {
    console.log('[rabbit]: cancel function');
    return new Promise((resolve, reject) => {
      this.rabbitChannel.nack(msg);
      this.rabbitChannel.cancel(this.consumerTag.consumerTag);
      this.observer.complete();

    });
  }

  public ack(msg: Message) {

    this.rabbitChannel.ack(msg);
  }
}