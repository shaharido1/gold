import { Channel } from 'amqplib/callback_api';
import { Client, RedisSMQ } from 'rsmq';
import { ConsumerConfig } from './model/consumer.config.interface';
import * as path from 'path';
import { RabbitAdapter } from '../../shared/rabbit';
import { RedisMqAdapter } from '../../shared/redis/redisMQ';
import { ConfigHandler } from '../../shared/configServer/configHandler';


export class Consumer {

  config: ConsumerConfig;
  rabbitAdapter: RabbitAdapter;
  redisAdapter: RedisMqAdapter;
  rabbitChannel: Channel;
  avgTime: number;
  numberOfRounds: number;
  roundTime: number;
  totalTime: number;


  constructor() {
    const LocalPath = '../../../src/config/config.json';

    const configLocation = this.isDevelopment() ?
        LocalPath : process.env.configLocation || './src/config/config.json';
    console.log(configLocation);
    const configPatch = path.join(__dirname, configLocation);
    const configHandler = new ConfigHandler();
    this.config = <ConsumerConfig>configHandler.getConfig(configPatch);
    console.log(this.config);
    this.rabbitAdapter = new RabbitAdapter(this.config.rabbitConfig);
    this.redisAdapter = new RedisMqAdapter(this.config.redisConfig);

    this.avgTime = 0;
    this.numberOfRounds = 0;
    this.roundTime = 0;
    this.totalTime = 0;
  }

  isDevelopment() {
    return Object.keys(process.argv).some(key => process.argv[key] === 'goldStarDevelopment');
  }

  init() {
    Promise.all([this.redisAdapter.initRMSQ(), this.rabbitAdapter.initConnection()]).then(connections => {
      console.log('start init consumer ');
      this.rabbitChannel = connections[1].channel;

      const rabbitStartTime = new Date().getTime();
      this.rabbitChannel.consume(this.config.rabbitConfig.config_rabbitQueueName, data => {
        const rabbitEnd = new Date().getTime();

        const rawData = data.content.toString();
        const parsedData = JSON.parse(rawData);

        if (rabbitStartTime > parsedData.start) {
          console.log('pass');
        }
        else {
          this.measerTime(rabbitEnd, parsedData);

          // this.redisAdapter.saveInRedis(parsedData.message, this.config.config_keyId);

          const stringifyBatch = this.stringifyMessage(parsedData.message);
          this.redisAdapter.sendMassage(stringifyBatch, this.numberOfRounds, this.config.config_totalNumberOfRounds);
        }
      }, { noAck: true });
      // });
    }).catch(err => err);


  }

  measerTime(rabbitEnd, parsedData) {
    const timeSec = (rabbitEnd - parsedData.rabbitStart) * 0.001;
    this.numberOfRounds++;
    this.avgTime += timeSec;
    this.roundTime += timeSec;

    if (this.numberOfRounds % this.config.config_totalNumberOfRounds == 0) {

      this.totalTime += this.roundTime / this.config.config_totalNumberOfRounds;
      console.log(`\n********************************************`);
      console.log(`Average time for this round: ${this.roundTime / this.config.config_totalNumberOfRounds}`);
      console.log(`Finished ${this.numberOfRounds} number of rounds`);
      console.log(`avg time: ${(this.avgTime / this.numberOfRounds)} sec`);
      console.log(`Total entities : ${this.numberOfRounds * this.config.config_batchNumber }`);
      console.log(`********************************************\n`);
      this.roundTime = 0;
    }
  }


  private stringifyMessage(message: object): String {
    const js = {
      message,
      rabbitStart: new Date().getTime()
    };
    const batch = JSON.stringify(js);
    const stringIfyBatch = `{"message":${JSON.stringify(batch)} ,"Start":${new Date().getTime()}}`;
    return stringIfyBatch;
  }
}


const consumer = new Consumer();
consumer.init();


