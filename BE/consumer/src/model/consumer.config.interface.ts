import { RabbitConfig } from '../../../shared/src/interface/rabitConfig';
import { RedisConfig } from '../../../shared/src/interface/redisConfig';

export interface ConsumerConfig {
  rabbitConfig : RabbitConfig;
  redisConfig :  RedisConfig;
  config_batchNumber : number;
  config_totalNumberOfRounds: number;
  config_keyId: string;
}
