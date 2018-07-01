import { ConsumerConfig } from './model/consumer.config.interface';
import { RabbitAdapter } from '../../shared/rabbit/rabbit';
import { RedisMqAdapter } from '../../shared/redis/redisMQ';
import { ConfigHandler } from '../../shared/configSetup/configHandler';
import { TimeSetup } from '../../shared/measureTime/TimeSetup';
import { MeasureTime } from '../../shared/measureTime/measeuerTime';
import { ConfigFileLocation } from '../config/config.filePath';


export class Consumer {

  private config: ConsumerConfig;

  private rabbitAdapter: RabbitAdapter;
  private redisAdapter: RedisMqAdapter;
  private rabbitStartTime: number;
  private timeSetup: TimeSetup = {
    avgTime: 0,
    numberOfRounds: 0,
    roundTime: 0,
    totalTime: 0
  };
  private measureTime: MeasureTime = new MeasureTime();


  constructor() {
    this.config = <ConsumerConfig>new ConfigHandler(ConfigFileLocation).finalConfig;
    this.rabbitAdapter = new RabbitAdapter(this.config.rabbitConfig);
    this.redisAdapter = new RedisMqAdapter(this.config.redisConfig);
    this.init();
  }


  init() {
    Promise.all([this.redisAdapter.initRMSQ(), this.rabbitAdapter.initConnection()]).then((connections) => {
      this.rabbitStartTime = new Date().getTime();
      this.rabbitAdapter.consumeFromQueue().then(this.doStuff.bind(this));
    }).catch(err => err);
  }

  doStuff(data) {
    const rabbitEnd = new Date().getTime();
    const rawData = data.content.toString();
    const parsedData = JSON.parse(rawData);
    if (this.rabbitStartTime > parsedData.rabbitStart) {
      console.log('pass');
    }
    else {
      this.measureTime.showMeasureTime(rabbitEnd, parsedData.rabbitStart, this.timeSetup, this.config);
      const messageWithTime = this.measureTime.timeWrapper(parsedData.message);
      this.redisAdapter.sendMassage(messageWithTime, this.timeSetup, this.config.config_totalNumberOfRounds);
      this.redisAdapter.sendToQueue(parsedData.message, this.config.config_keyId).then();
    }
  }
}