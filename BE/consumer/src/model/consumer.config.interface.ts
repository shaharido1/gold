import { RabbitConfig } from '../../../shared/interfase/rabitConfig';
import { RedisConfig } from '../../../shared/interfase/redisConfig';

export interface ConsumerConfig {
  rabbitConfig : RabbitConfig;
  redisConfig :  RedisConfig;
  config_batchNumber : number;
  config_totalNumberOfRounds: number;
  config_keyId: string;
}

