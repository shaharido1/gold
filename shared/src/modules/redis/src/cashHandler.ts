import { RedisDataType, RedisQueryGetInterception, RedisQueryGetMission, RedisQuerySet } from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../../interface/redisConfig';
import { GetMission } from './getMission';
import { SetMissionsOfEntities } from './setMissionsOfEntities';
import { GetEntities } from './getEntities';


export enum GetRangeSorted {
  withscores = 'withscores',
  limit = 'limit',
  zero = 0,
  one = 1,
  tenThousand = 10000
}

export class CashHandler {

  public redis: RedisAdapter;
  public config: RedisConfig;


  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
    this.config = this.redis.config;

  }


  static rediskeyConvertor({ type, missionId, mainFieldId }): string {
    return `${type}_${missionId}_${mainFieldId}`;

  }

  setMissionsOrEntities(batch: Array<RedisQuerySet>) {
    const setMissionsOrEntities = new SetMissionsOfEntities(this.redis);
    setMissionsOrEntities.writeBatchToRedis(batch)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
  }

  getMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max, min) {
    const mission = new GetMission(this.redis);
    const redisKey = CashHandler.rediskeyConvertor({ type, missionId, mainFieldId });
    mission.getMission(redisKey, max, min)
        .then();
  }

  getEntity(arrayOfQueries: Array<RedisQueryGetInterception>) {
    const entities = new GetEntities();
    entities.getBatchOfEntities(arrayOfQueries);
  }

  exec() {
    this.redis.execData()
        .then(() => {

        })
        .catch(() => {

        });
  }

  // public getFieldsOfMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max, min) {
  //   return new Promise((resolve, reject) => {
  //     this.cashHandler.getMission({ type, missionId, mainFieldId }, max, min)
  //         .then((entityIds: Array<string>) => {
  //           this.cashHandler.mapHashFields = new Map();
  //           this.cashHandler.mapSetFields = new Map();
  //           const entityQueue: Array<RedisQueryGetInterception> = [];
  //
  //           entityIds.forEach((entityId) => {
  //             const query = this.createQuery(entityId, missionId);
  //             entityQueue.push(query);
  //           });
  //           const arrayOfChunks = CashHandler.splipToChunksOfQueries(entityQueue, 2);
  //
  //           arrayOfChunks.forEach((chunk) => {
  //             // console.log(chunk);
  //             this.cashHandler.getDataFromBatchOfEntities(chunk)
  //                 .then((a) => {
  //                   console.log('res');
  //                   console.log(a);
  //                   console.log('\n');
  //
  //                   // console.log(response);
  //                   // const missionAnswer = this.createObנjectOfEntity(response);
  //                   // resolve(a);
  //                   // resolve(missionAnswer);
  //                 });
  //
  //           });
  //
  //
  //         }).catch(err => console.log(err));
  //   });


  static splipToChunksOfQueries<T>(array: Array<T>, numberOfEntitiesInChunk: number): Array<Array<T>> {
    const arrayOfChunks = [];
    while (array.length) {
      arrayOfChunks.push(array.splice(0, numberOfEntitiesInChunk));
    }
    return arrayOfChunks;
  }


  private createQuery(entityId, missionId, options ?) {
    // todo options
    const entityQuery = {
      type: RedisDataType.interception,
      entityId: entityId.key.split('_').pop(),
      missionId: `M_${missionId}`,
      static: {
        name: true,
        surName: true,
        address: true
      },
      dynamic: true,
      rank: true,
      tags: true
    };
    return;
    entityQuery;
  }

}

