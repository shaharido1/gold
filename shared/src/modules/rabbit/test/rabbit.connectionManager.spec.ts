import { assert, expect } from 'chai';
import { CreatesType, RabbitConnectionManager } from '../src/rabbitConnectionManager';
import { RabbitProducer } from '../src/rabbitProducer';
import { RabbitConsumer } from '../src/rabbitConsumer';
import { RabbitContainerAdapter } from './rabbit.containerAdapter';

xdescribe('rabbit connection test', () => {
  const exposePort = '5672';
  const rabbitContainerAdapter = new RabbitContainerAdapter(exposePort);
  const waitTime = 1000;
  let rabbitProducerExm;
  const rabbitConnectionManager = new RabbitConnectionManager({
    config_rabbitHost: 'localhost',
    config_rabbitPort: exposePort,
    config_rabbitUser: 'guest',
    config_rabbitPassword: 'guest'
  });

  it('should connect to rabbit container, even if rabbit container is unavailable for a time', () => {
    setTimeout(() => rabbitContainerAdapter.createRabbitContainer(), waitTime);
    return rabbitConnectionManager.assertConnection()
        .then(connection => {
          expect(connection).to.be.ok;
        })
        .catch(err => {
          assert.isNotOk('couldnt connect to rabbit');
        });
  });


  it('should spawn consumer worker', () => {
    return rabbitConnectionManager.spawnQueueWorker(CreatesType.CONSUMER)
        .then((rabbitProducer: RabbitProducer) => {
          rabbitProducerExm = rabbitProducer;
          expect(rabbitProducer).to.be.ok;
        })
        .catch(err => {
          assert.isNotOk('couldnt connect to rabbit');
        });
  });

  it('should spawn producer worker', () => {
    return rabbitConnectionManager.spawnQueueWorker(CreatesType.CONSUMER)
        .then((rabbitConsumer: RabbitConsumer) => {
          expect(rabbitConsumer).to.be.ok;
        })
        .catch(err => {
          assert.isNotOk('couldnt connect to rabbit');
        });
  });

  it('should reconnect', (done) => {
    let recoverSuccess = false;
    rabbitProducerExm.rabbitChannel.on('recover', () => {
      console.log('recover success');
      assert.isOk('mange to recover');
      recoverSuccess = true;
      done();
    });
    rabbitContainerAdapter.rabbitContainer.stop()
        .then(() => {
          setTimeout(() => rabbitContainerAdapter.rabbitContainer.start(), waitTime);
        })
        .catch(err => {
          assert.isNotOk('couldnt reconnect to rabbit');
        });
    setTimeout(() => {
      recoverSuccess ? done() : assert.isNotOk('failed to recover');
    }, 20000);
  });


  it('should disconnect', () => {
    return rabbitConnectionManager.destroyConnection()
        .then(() => {
          assert.isOk('all ok');
        })
        .catch(err => {
          assert.isNotOk('couldnt connect to rabbit');
        });
  });


});
