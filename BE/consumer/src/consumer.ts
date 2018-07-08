import { ConsumerConfig } from './model/consumer.config.interface';
import { RedisMqAdapter } from '../../shared/redis/redisMQ';
import { ConfigHandler } from '../../shared/configSetup/configHandler';
import { TimeSetup } from '../../shared/measureTime/TimeSetup';
import { MeasureTime } from '../../shared/measureTime/measeuerTime';
import { configFileLocation } from '../config/config.filePath';
import { Message } from 'amqplib';
import { RabbitConsumer } from '../../shared/rabbit/rabbitConsumer';


export class Consumer {

  private config: ConsumerConfig;

  private rabbitConsumer: RabbitConsumer;
  private redisAdapter: RedisMqAdapter;
  private rabbitStartTime: number;
  private timeSetup: TimeSetup = {
    avgTime: 0,
    numberOfRounds: 0,
    roundTime: 0,
    totalTime: 0
  };
  private measureTime: MeasureTime = new MeasureTime();
  subscriptions = [];

  constructor() {
    this.config = <ConsumerConfig>new ConfigHandler(configFileLocation).finalConfig;
    this.rabbitConsumer = new RabbitConsumer(this.config.rabbitConfig);
    this.redisAdapter = new RedisMqAdapter(this.config.redisConfig);
    this.init();
  }


  async init() {
    Promise.all([this.redisAdapter.initRMSQ(), this.rabbitConsumer.getChannel()]).then(() => {
      this.rabbitStartTime = new Date().getTime();
      const subscription = this.rabbitConsumer.clientConsume()
          .subscribe(message => {
            this.doStuff(message)
                .then(() => {
                  try {
                    console.log('ack');
                    this.rabbitConsumer.ack(message);
                  }
                  catch (e) {
                    console.log('failed ack');
                    console.log(e);
                  }
                })
                .catch((e) => {
                  console.log(e);
                  console.log('canceling..');
                  this.rabbitConsumer.cancel(message);
                });
          }, err => console.log(err));
      this.subscriptions.push(subscription);
    }).catch(err => Error(err));
  }


  doStuff(msg): Promise<Message> {
    return new Promise((resolve, reject) => {
    //   return resolve();
    // })
      const rabbitEnd = new Date().getTime();
      const rawData = msg.content.toString();
      const parsedData = JSON.parse(rawData);
      if (this.rabbitStartTime > parsedData.rabbitStart) {
        console.log('pass');
        return resolve(msg);
      }
      else {
        this.measureTime.showMeasureTime(rabbitEnd, parsedData.rabbitStart, this.timeSetup, this.config);
        const messageWithTime = this.measureTime.timeWrapper(parsedData.message);
        const timeToWightToRedis = new Date().getTime();
        console.log(messageWithTime);
        this.redisAdapter.sendMassage(messageWithTime)
            .then(() => {
              if (this.timeSetup.numberOfRounds % this.config.config_totalNumberOfRounds == 0) {
                console.log(`Time to write to redis: ${(new Date().getTime() - timeToWightToRedis) * 0.001} sec\n`);
              }
              return resolve(msg);
            }).catch(err => {
          console.log(err);
          // todo error log handling etc....
          return reject(msg);
        });
      }
    });
  }


}