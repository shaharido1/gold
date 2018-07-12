import { RabbitConfig } from '../../../../shared/src/interface/rabitConfig';
import { RedisConfig } from '../../../../shared/src/interface/redisConfig';

export interface ProducerConfig {
  rabbitConfig?: RabbitConfig;
  redisConfig?: RedisConfig;
  config_batchNumber : number;
}

