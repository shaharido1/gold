import { RabbitConfig } from '../../../../shared/interfase/rabitConfig';

export interface ProducerConfig {
  rabbitConfig : RabbitConfig;
  config_batchNumber : number;
}

