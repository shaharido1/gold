import { RedisConfig } from '../../../shared/src/interface/redisConfig';

export interface EnrichConfig {
  redisConfig :  RedisConfig;
  config_batchNumber : number;
  config_totalNumberOfRounds: number;
  config_keyId: string;
}
