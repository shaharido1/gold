import { GoldServer } from '../../../shared/goldServer/goldServer';
import { MockDataGenerator } from './mockDataGeneretor/mockDataGeneretor';
import { configFileLocation } from '../config/config.filePath';
import { Producer } from '../../../shared/producer/producer.abstract';
import { Observable } from 'rxjs/index';


export class DataGenerator extends GoldServer {
  private source: Observable<any>;
  private mockDataGen: MockDataGenerator;


  constructor() {
    super(configFileLocation);
    this.init();
  }

  init() {
    this.mockDataGen = new MockDataGenerator();
    this.sendSourceToQueue();

  }

  sendSourceToQueue() {
    const a = new Producer(this.config.rabbitConfig);
    a.init()
        .then(() => {
          this.source = this.mockDataGen.generateMockData(Infinity, 10);
          a.generateToQueue(this.source, this.config.rabbitConfig.config_rabbitQueueName, this.config.rabbitConfig.config_queueOptions)
              .catch(() => {
                this.mockDataGen.killSourceMockData();
                this.sendSourceToQueue();
              })
        })
  }


}