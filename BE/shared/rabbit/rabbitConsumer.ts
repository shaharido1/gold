import { Message, Options, Replies } from 'amqplib/properties';
import { Observable, Observer } from 'rxjs/index';
import { RabbitChannel } from './rabbitChannel';


export class RabbitConsumer extends RabbitChannel {
  private consumerTag: Replies.Consume;
  private observer: Observer<Message>;


  public clientConsume(queue = this.config.config_rabbitQueueName, options: Options.Consume = this.config.config_queueOptions) {
    this.queue = queue;
    this.queueOptions = options;
    return new Observable((observer: Observer<Message>) => {
      this.observer = observer;
      this.consumeFromQueue();
    });
  }


  protected setUpListener(): void {
    this.rabbitChannel.on('error', () => {
      console.log('[rabbitChanel]: error');
      this.closeChannel().then( () => {
        this.consumeFromQueue();
      })
    });
    this.rabbitChannel.on('close', () => {
      console.log('[rabbitChanel]: connection closed');
      this.closeChannel().then( () => {
        this.consumeFromQueue();
      })
    });
    this.rabbitChannel.on('blocked', () => {
      console.log('[rabbit]: connection blocked');
    });
    this.rabbitChannel.on('unblocked', () => {
      console.log('[rabbit]: connection unblocked');
    });
  }

  private consumeFromQueue(): void {
    if (this.observer) {
      this.assertQueue()
          .then(channel => {
            console.log('[rabbit]: start consuming');
            this.setUpListener()
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
                  this.closeChannel();
                  console.log('[rabbit]: can\'t consume');
                  return this.consumeFromQueue();
                });
          })
          .catch(err => {
            console.log("fatal2");
            this.observer.error("fatal!")
          })
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