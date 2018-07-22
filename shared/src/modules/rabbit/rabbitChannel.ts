import { Options, Replies } from 'amqplib/properties';
import { RabbitConfig } from '../../interface/rabitConfig';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { Channel } from 'amqplib';
import { RabbitConnectionManager } from './rabbitConnectionManager';
import { Observable } from 'rxjs/index';
import { Observer } from 'rxjs/internal/types';
import { retryPromise } from '../utils/utils';

export abstract class RabbitChannel {
  public rabbitConnectionManager: RabbitConnectionManager;
  protected config: RabbitConfig;
  protected rabbitChannel: Channel;
  protected queue: string;
  protected queueOptions: Options.Consume;

  public observer: Observer<any>;

  constructor(rabbitConfig: RabbitConfig, channel) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    this.rabbitChannel = channel;
  }

  protected setUpListener(): void {
    this.rabbitChannel.on('error', () => {
      console.log('[rabbitChanel]: error');
      this.closeChannel().then(() => {
        this.assertQueue();
      });
    });
    this.rabbitChannel.on('close', () => {
      console.log('[rabbitChanel]: connection closed');
      this.closeChannel().then(() => {
        this.assertQueue();
      });
    });
    this.rabbitChannel.on('blocked', () => {
      console.log('[rabbitChanel]: connection blocked');
    });
    this.rabbitChannel.on('unblocked', () => {
      console.log('[rabbitChanel]: connection unblocked');
    });
  }

  public channelsEvent() {
    return new Observable((observer) => this.observer = observer);
  }

  public recover(channel) {
    this.rabbitChannel = channel;
    this.observer.next('recover');
  }

  public async closeChannel() {
    return new Promise((resolve, reject) => {
      if (this.rabbitChannel) {
        this.rabbitChannel.close();
        this.rabbitChannel = undefined;
        resolve();
      }
    });
  }


  public assertQueue(queue = this.queue, options = this.queueOptions): Promise<Channel> {
    return new Promise((resolve, reject) => {
      retryPromise(() => <any>this.rabbitChannel.assertQueue(queue, options), 5000)
      // todo make sure that the error is "no such queue, and not -> channel problem
          .then((replay: Replies.AssertQueue) => {
            console.log(`[rabbit]: queue ${replay.queue} has ${replay.consumerCount} consumers, and ${replay.messageCount} messages`);
            return resolve();
          })
          .catch(err => {
            console.log("can't assert queue - fatal");
            return reject()
          });
    });
  }

}

