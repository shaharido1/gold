import { RedisConfig } from '../../../shared/interfase/redisConfig';

export interface EnrichConfig {
  redisConfig :  RedisConfig;
  config_batchNumber : number;
  config_totalNumberOfRounds: number;
  config_keyId: string;
}