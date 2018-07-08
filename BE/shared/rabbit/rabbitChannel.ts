import { Options, Replies } from 'amqplib/properties';
import { RabbitConfig } from '../interfase/rabitConfig';
import { rabbitDefaultConfig } from './rabbit.config.default';
import { Channel, Connection } from 'amqplib';
import { RabbitConnectionManager } from './rabbitConnectionManager';

export abstract class RabbitChannel {
  public rabbitConnectionManager: RabbitConnectionManager;
  protected config: RabbitConfig;
  protected rabbitChannel: Channel;
  protected queue: string;
  protected queueOptions: Options.Consume;


  constructor(rabbitConfig: RabbitConfig, connection?: Connection) {
    this.config = rabbitConfig || rabbitDefaultConfig;
    this.rabbitConnectionManager = new RabbitConnectionManager(this.config, connection);
  }

  protected setUpListener(): void {
    this.rabbitChannel.on('error', () => {
      console.log('[rabbitChanel]: error');
      this.closeChannel().then( () => {
          this.assertQueue();
      })
    });
    this.rabbitChannel.on('close', () => {
      console.log('[rabbitChanel]: connection closed');
      this.closeChannel().then( () => {
        this.assertQueue();
      })
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
    });
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

