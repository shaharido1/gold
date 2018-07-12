import { Options, Replies } from 'amqplib/properties';
import { RabbitConfig } from '../../interface/rabitConfig';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { Channel } from 'amqplib';
import { RabbitConnectionManager } from './rabbitConnectionManager';
import { Observable } from 'rxjs/index';
import { Observer } from 'rxjs/internal/types';

export abstract class RabbitChannel {
  public rabbitConnectionManager: RabbitConnectionManager;
  protected config: RabbitConfig;
  protected rabbitChannel: Channel;
  protected queue: string;
  protected queueOptions: Options.Consume;

  createChannel;
  public observer: Observer<any>;

  public constructor(rabbitConfig: RabbitConfig, channel, createChannel) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    this.createChannel = createChannel;
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

  public getChannel(): Promise<Channel> {
    return new Promise((resolve, reject) => {
      if (this.rabbitChannel) {
        return resolve(this.rabbitChannel);
      }
      else {
        this.createChannel
            .then(channel => {
              this.closeChannel();
              this.rabbitChannel = channel;
              // this.setUpListener();
              return resolve(channel);
            })
            .catch(err => {
              console.log(err);
              console.log('fatal - can\'t create channel after multiple retries');
              return reject(err);
            });
      }
    });
  }


  public recover(channel) {
    // todo
    this.rabbitChannel = channel;
    this.observer.next('recover');
  }

  public closeChannel() {
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
      this.getChannel()
          .then(channel => {
            channel.assertQueue(queue, options)
                .then((replay: Replies.AssertQueue) => {
                  console.log(`[rabbit]: queue ${replay.queue} has ${replay.consumerCount} consumers, and ${replay.messageCount} messages`);
                  return resolve(channel);
                })
                .catch(err => {
                  this.rabbitChannel = undefined;
                  return this.assertQueue(queue, options);
                });
          }).catch(err => {
        console.log('fatal');
        return reject(err);
      });
    });
  }

}

