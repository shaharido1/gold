import { Parser } from './parser';
import { RedisInterceptionCoreFields, RedisQuerySet } from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';

export class SetMissionsOfEntities {

  private redis: RedisAdapter;

  constructor(redis: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
  }

  writeBatchToRedis(batch: Array<RedisQuerySet>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        batch.forEach((entity) => {
          this.writeEntityToRedis(entity);
        });
        this.redis.execData()
            .then((res) => {
              resolve(res);
            })
            .catch((err) => reject(err));
      }
      catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  private writeEntityToRedis({ type, entityId, mainFieldId, entFields }: RedisQuerySet) {
    const arr = Parser.redisInputIntoArrayString(entFields);
    const redisKey = `${type}_${entityId}_${mainFieldId}`;
    switch (mainFieldId) {
      case RedisInterceptionCoreFields.byTime:
      case RedisInterceptionCoreFields.byRank:
      case RedisInterceptionCoreFields.dynamic: {
        this.redis.pushToSortedSet(redisKey, arr);
        break;
      }
      case RedisInterceptionCoreFields.static:
      case RedisInterceptionCoreFields.related_missions:
      case RedisInterceptionCoreFields.rank:
      case RedisInterceptionCoreFields.tags:

        this.redis.setMultiFieldsToMultival(redisKey, arr);
        break;
    }
  }


}