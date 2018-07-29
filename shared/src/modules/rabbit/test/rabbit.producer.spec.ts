import { RabbitContainerAdapter } from './rabbit.containerAdapter';
import { assert, expect } from 'chai';
import { CreatesType, RabbitConnectionManager } from '../src/rabbitConnectionManager';
import { RabbitConsumer } from '../src/rabbitConsumer';
import { RabbitProducer } from '../src/rabbitProducer';
import { Replies } from 'amqplib/properties';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';


describe('rabbit producer functions', () => {
      const exposePort = '5672';
      const rabbitContainerAdapter = new RabbitContainerAdapter(exposePort);
      const rabbitConnectionManagerProducer = new RabbitConnectionManager({
        config_rabbitHost: 'localhost',
        config_rabbitPort: exposePort,
        config_rabbitUser: 'guest',
        config_rabbitPassword: 'guest'
      });
      const rabbitConnectionManagerConsumer = new RabbitConnectionManager({
        config_rabbitHost: 'localhost',
        config_rabbitPort: exposePort,
        config_rabbitUser: 'guest',
        config_rabbitPassword: 'guest'
      });
      let currentRabbitProducer: RabbitProducer;
      let currentRabbitConsumer: RabbitConsumer;
      const queueName = 'testQueue';
      const messegeInital = 'testMessage_';
      const numberOfMessages = 10;
      const subscriptions = [];
      let intervals = [];

      before((done) => {
        rabbitContainerAdapter.createRabbitContainer().then(() => {
          const promises = [rabbitConnectionManagerProducer.assertConnection(), rabbitConnectionManagerConsumer.assertConnection()];
          Promise.all(promises).then(() => done());
        });
      });


      it('should spawn producer worker from connaction 1 ', () => {
        return rabbitConnectionManagerProducer.spawnQueueWorker(CreatesType.PRODUCER)
            .then((rabbitProducer: RabbitProducer) => {
              currentRabbitProducer = rabbitProducer;
              expect(rabbitProducer).to.be.ok;
            })
            .catch(err => {
              assert.isNotOk('couldnt spawn producer');
            });
      });

      it('should spawn consumer worker from connection 2', () => {
        return rabbitConnectionManagerConsumer.spawnQueueWorker(CreatesType.CONSUMER)
            .then((rabbitConsumer: RabbitConsumer) => {
              currentRabbitConsumer = rabbitConsumer;
              expect(rabbitConsumer).to.be.ok;
            })
            .catch(err => {
              assert.isNotOk('couldnt spawn consumer');
            });
      });

      it('producer should assert queue', () => {
        return currentRabbitProducer.assertQueue(queueName)
            .then((replay: Replies.AssertQueue) => {
              expect(replay).to.be.ok;
              expect(replay.queue).to.be.ok;
            })
            .catch(err => {
              assert.isNotOk('producer cant assert queue');
            });
      });


      it('consumer should assert queue', () => {
        return currentRabbitConsumer.assertQueue(queueName)
            .then((replay: Replies.AssertQueue) => {
              expect(replay).to.be.ok;
              expect(replay.queue).to.be.ok;
            })
            .catch(err => {
              assert.isNotOk('consumer cant assert queue');
            });
      });

      it('producer shouold send data to queue (no persistency testing)', (done) => {
        return persistentProduceToQueue(done, false, false, 3);

      });

      it('consumer should consume from queue (no persistency testing)', (done) => {
        const promises = [currentRabbitConsumer.assertQueue(queueName), currentRabbitProducer.assertQueue(queueName)];
        Promise.all(promises).then(() => {
          persistentProduceToQueue(done, );
          consumeFromqueue(done);
        });
      });


      it('producer shuold recover after rabbit fall - persistency testing', (done) => {
        let isBreakDown = false;
        setTimeout(() => {
          rabbitContainerAdapter.rabbitContainer.stop().then(() => {
            let isBreakDown = true;
            setTimeout(() => {
              rabbitContainerAdapter.rabbitContainer.start();
            }, 10000);
          });
        }, 10000);
        persistentProduceToQueue(done, true, isBreakDown);
      });


      it('consumer shuold recover after rabbit fall - persistency testing', (done) => {
        let breakdown = false;
        setTimeout(() => {
          rabbitContainerAdapter.rabbitContainer.stop().then(() => {
            breakdown = true;
            setTimeout(() => {
              rabbitContainerAdapter.rabbitContainer.start();
            }, 10000);
          });
        }, 10000);
        persistentProduceToQueue(done);
        consumeFromqueue(done, true, breakdown);
      });

      after((done) => {
        const promises = [rabbitConnectionManagerProducer.destroyConnection(), rabbitConnectionManagerConsumer.destroyConnection()];
        subscriptions.forEach(subscriber => subscriber.unsubscribe());
        intervals.forEach(interval => clearInterval(interval));
        Promise.all(promises).then(() => done());
      });


      function consumeFromqueue(done, testingPersistency = false, breakdown = false, qName = queueName, consumer: RabbitConsumer = currentRabbitConsumer, numOfMsg = numberOfMessages, msgInit = messegeInital) {
        const queueListenerr = consumer.clientConsume(qName, {});
        const subscription = queueListenerr.subscribe((data) => {
          const content = data.content.toString();
          const breake = content.indexOf('_');
          const intial = content.substring(0, breake + 1);
          const end = content.substring(breake + 1, content.length + 1);
          const endNumber = Number(end);
          expect(intial).to.equal(msgInit);
          expect(typeof endNumber).to.be.equal('number');
          if ((!testingPersistency && endNumber === numOfMsg) || (testingPersistency && breakdown)) {
            subscription.unsubscribe();
            done();
          }
        });
        subscriptions.push(subscription);
      }


      function persistentProduceToQueue(done, testingPersistency = false, isBreakDown = false, numOfMsg = numberOfMessages, msgInit = messegeInital) {
        let i = 0;
        function produceToQueue() {
          currentRabbitProducer.assertQueue(queueName).then(() => {
            const subscription = source(numOfMsg, msgInit).subscribe((data) => {
              currentRabbitProducer.sendToQueue(data, queueName, {})
                  .then((replay) => {
                    i++;
                    console.log('manage to push to queue' + replay);
                    expect(replay).to.be.ok;
                    if (testingPersistency && isBreakDown) {
                      done();
                    }
                    else if (numOfMsg === i) {
                      assert.isOk('finish produing all messages');
                      done();
                    }
                  })
                  .catch(err => {
                    console.log('couldnt push to queue');
                    if (!testingPersistency) {
                      assert.isNotOk('producer is not testing persistency and failed to producer a message');
                      done();
                    }
                    else {
                      console.log('stop producing - auto recover');
                      console.log(err);
                      subscription.unsubscribe();
                      produceToQueue();
                    }
                  });
            });
          });
        }
        produceToQueue();
      }


      function source(numOfMsg = numberOfMessages, msgInit = messegeInital) {
        return new Observable(observer => {
          let i = 0;
          const interval = setInterval(() => {
            if (i < numOfMsg) {
              i++;
              observer.next(msgInit + i);
            }
            else {
              clearInterval(interval);
            }
          }, 1000);
          intervals.push(interval);
        });
      }
    }
);
