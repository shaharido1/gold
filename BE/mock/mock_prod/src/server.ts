///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as path from "path";
import { ProducerConfig } from './model/producer.config.interface';

const uuidv4 = require('uuid/v4');
import { RabbitConfig } from '../../../shared/interfase/rabitConfig';
import { RabbitAdapter } from '../../../shared/rabbit';
import { ConfigHandler } from '../../../shared/configServer/configHandler';

export class Producer {
  config: ProducerConfig;
  rabbitConfig: RabbitConfig;
  private rabbitAdapter: RabbitAdapter;

  constructor() {
    const LocalPath = '../../../../src/config/config.json';

    const configLocation =  this.isDevelopment() ?
        LocalPath : process.env.configLocation || './src/config/config.json';

    const configPatch = path.join(__dirname, configLocation);
    const configHandler = new ConfigHandler();
    this.config = configHandler.getConfig(configPatch);
    this.rabbitAdapter = new RabbitAdapter(this.config.rabbitConfig);
  }

  isDevelopment() {
    return Object.keys(process.argv).some(key => process.argv[key] === "goldStarDevelopment")
  }

  public init() {
    this.rabbitAdapter.initConnection().then(({ channel }) => {
      setInterval(() => {
        const batch = this.createBatch(this.config.config_batchNumber);
        const stringifyBatch = Producer.stringifyMessage(batch);
        this.rabbitAdapter.sendToQueue(stringifyBatch);
      }, this.config.config_batchNumber / 10);
    });
  }

  private createBatch(batchNumber): Array<{ message: string, id: string }> {
    let i = 0;
    const mockData = [];
    while (i < batchNumber) {
      const id = uuidv4();
      const msg = { massage: `ms-${i}`, id: `${id}` };
      mockData.push(msg);
      i++;
    }
    return mockData;
  }

  static stringifyMessage(message: object): String {
    const js = {
      message,
      rabbitStart: new Date().getTime()
    };
    const batch = JSON.stringify(js);
    const stringIfyBatch = `{"message":${JSON.stringify(batch)} ,"rabbitStart":${new Date().getTime()}}`;
    return stringIfyBatch;
  }

}


const producer = new Producer();
producer.init();

