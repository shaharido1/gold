import { GoldServer } from '../../../shared/src/modules/goldServer/goldServer';
import { MockDataGenerator } from './mockDataGeneretor/mockDataGeneretor';
import { configFileLocation } from '../config/config.filePath';
import { Producer } from '../../../shared/src/modules/producer/producer';
import { Observable } from 'rxjs/index';
import { RabbitConnectionManager } from '../../../shared/src/modules/rabbit/src/rabbitConnectionManager';
import { EventEmitter } from 'events';


export class DataGenerator extends GoldServer {

  private source: Observable<any>;
  private mockDataGen: MockDataGenerator;
  private connectionManager: RabbitConnectionManager;
  private producer: Producer;
  private eventListener: EventEmitter;


  constructor() {
    super(configFileLocation);
    this.init();
  }

  init() {
    this.mockDataGen = new MockDataGenerator();
    this.connectionManager = new RabbitConnectionManager(this.config.rabbitConfig);
    this.producer = new Producer(this.config.rabbitConfig, this.connectionManager);
    this.producer.listener.subscribe(event => {
      if (event = 'ready' || 'recover')
        this.sendSourceToQueue();
    });

  }

  sendSourceToQueue() {
    this.source = this.mockDataGen.generateMockData(Infinity, 10);
    this.producer.generateToQueue(this.source, this.config.rabbitConfig.config_rabbitQueueName, this.config.rabbitConfig.config_queueOptions)
        .catch(() => {
          this.mockDataGen.killSourceMockData();
          this.sendSourceToQueue();
        });
  }


}