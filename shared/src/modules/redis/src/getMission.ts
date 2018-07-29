import { RedisQueryGetMission } from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';
import { Parser } from './parser';
import { GetRangeSorted } from './cashHandler';

export class GetMission {
  private redis: RedisAdapter;


  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
  }

  public getMission(redisKey, max, min) {
    return new Promise((resolve, reject) => {
      // console.log('redisKey: ' + redisKey);
      this.redis.getRangeSetByScoreHighToLow(redisKey,
          '+inf',
          '-inf',
          GetRangeSorted.withscores,
          GetRangeSorted.limit, min, max)
          .then((res: any) => {
            // console.log(res);
            const mission = Parser.fromRedisArrayToObject(res);
            resolve(mission);
          });
    });
  }

}
