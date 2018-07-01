import { ProducerConfig } from './model/producer.config.interface';
import { RabbitAdapter } from '../../../shared/rabbit/rabbit';
import { MockDataGeneretor } from './mockDataGeneretor/mockDataGeneretor';
import { ConfigHandler } from '../../../shared/configSetup/configHandler';
import { ConfigFileLocation } from '../config/config.filePath';

export class Producer {
  private config: ProducerConfig;
  private rabbitAdapter: RabbitAdapter;

  constructor() {
    this.config = <ProducerConfig>new ConfigHandler(ConfigFileLocation).finalConfig;
    this.rabbitAdapter = new RabbitAdapter(this.config.rabbitConfig);
    this.init();
  }

  public init() {
    this.rabbitAdapter.initConnection().then(() => {
      setInterval(() => {
        const batch = MockDataGeneretor.createBatch(this.config.config_batchNumber);
        this.rabbitAdapter.sendToQueue(batch);
      }, this.config.config_batchNumber / 10);
    });
  }

}
