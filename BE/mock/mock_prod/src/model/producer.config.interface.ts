import { RabbitConfig } from '../../../../shared/interfase/rabitConfig';
import { RedisConfig } from '../../../../shared/interfase/redisConfig';

export interface ProducerConfig {
  rabbitConfig?: RabbitConfig;
  redisConfig?: RedisConfig;
  config_batchNumber : number;
}

