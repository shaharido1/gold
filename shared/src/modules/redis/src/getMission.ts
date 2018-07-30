import { RedisReturnCB } from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';
import { Parser } from './parser';
import { GetRangeSorted } from './cashHandler';

export class GetMission {
  private redis: RedisAdapter;


  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
  }


  public getMission(redisKey: string, max: number, min :number ,passToResolve ): Promise<RedisReturnCB> {
    return this.redis.getRangeSetByScoreHighToLow(
        redisKey,
        '+inf',
        '-inf',
        GetRangeSorted.withscores,
        GetRangeSorted.limit,
        min,
        max ,passToResolve );
  }

}
