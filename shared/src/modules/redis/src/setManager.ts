import { Parser } from './parser';
import { RedisInterceptionCoreFields, RedisSetFormat } from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';

export class SetManager {

  private redis: RedisAdapter;

  constructor(redis: RedisAdapter) {
    this.redis = redis;
  }

  writeBatchToRedis(batch: Map<string, Array<RedisSetFormat>>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const promise = [];
        batch.forEach((entities) => {
          entities.forEach((entity)=>{
          promise.push(this.writeEntityToRedis(entity));
          })
        });
        this.redis.execData()
            .then(() => {
              Promise.all(promise)
                  .then((res) => {
                    resolve(res);
                  });
            });
      }
      catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  public writeEntityToRedis({ type, id, mainFieldId, entFields }: RedisSetFormat) :Promise<any> {
    const arr = Parser.redisInputIntoArrayString(entFields);
    // console.log(arr);
    const redisKey = `${type}_${id}_${mainFieldId}`;
    switch (mainFieldId) {
      case RedisInterceptionCoreFields.byTime:
      case RedisInterceptionCoreFields.byRank:
      case RedisInterceptionCoreFields.dynamic:
        //todo update mission with new time.
        return this.redis.pushToSortedSet(redisKey, arr);
      case RedisInterceptionCoreFields.static:
      case RedisInterceptionCoreFields.related_missions:
      case RedisInterceptionCoreFields.rank:
        //todo update mission with new rank
      case RedisInterceptionCoreFields.tags:
        return this.redis.setMultiFieldsToMultival(redisKey, arr);
    }
  }


}