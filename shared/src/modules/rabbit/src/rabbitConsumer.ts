import { Message, Options, Replies } from 'amqplib/properties';
import { Observable, Observer } from 'rxjs/index';
import { RabbitChannel } from './rabbitChannel';
import { EventEmitter } from 'events';


export class RabbitConsumer extends RabbitChannel {
  private consumerTag: Replies.Consume;
  public observer: Observer<Message>;



  public clientConsume(queue = this.config.config_rabbitQueueName, options: Options.Consume = this.config.config_queueOptions) {
    this.queue = queue;
    this.queueOptions = options;
    return new Observable((observer: Observer<Message>) => {
      this.observer = observer;
      this.newConsumeFromQueue();
    });
  }

  recover(channel) {
    console.log("on recover");
    this.rabbitChannel = channel;
    this.newConsumeFromQueue()
  }

  private newConsumeFromQueue() {
    // this.setUpListener();
    this.rabbitChannel.consume(
        this.queue,
        (msg: Message) => {
          if (this.observer) {
            this.observer.next(msg);

          }
        },
        this.queueOptions
    )
        .then((consumerTag) => {
          this.consumerTag = consumerTag;
        })
        .catch(err => {
          // this.closeChannel();
          console.log(err)
          console.log('[rabbitConsumer]: can\'t consume');
          // return this.newConsumeFromQueue();
        });
  }

  private consumeFromQueue(): void {
    if (this.observer) {
      this.assertQueue()
          .then(channel => {
            console.log('[rabbitConsumer]: start consuming');
            this.setUpListener();
            channel.consume(
                this.queue,
                (msg: Message) => {
                  if (this.observer) {
                    this.observer.next(msg);

                  }
                },
                this.queueOptions
            )
                .then((consumerTag) => {
                  this.consumerTag = consumerTag;
                })
                .catch(err => {
                  // this.closeChannel();
                  console.log('[rabbitConsumer]: can\'t consume');
                  return this.consumeFromQueue();
                });
          })
          .catch(err => {
            console.log('[rabbitConsumer]: fatal2');
            this.observer.error('[rabbitConsumer]: fatal!');
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