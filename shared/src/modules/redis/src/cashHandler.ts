import {
  RedisEnswer,
  KeyScore,
  RedisDataType,
  RedisQuestion,
  RedisQueryGetMission,
  RedisSetFormat,
  RedisReturnCB
} from './entity/redisQuer';
import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../../interface/redisConfig';
import { GetMission } from './getMission';
import { GetEntities } from './getEntities';
import { SetManager } from './setManager';
import { Parser } from './parser';


export enum GetRangeSorted {
  withscores = 'withscores',
  limit = 'limit',
  zero = 0,
  one = 1,
  tenThousand = 10000
}

export class CashHandler {

  public static rediskeyConvertor({ type, missionId, mainFieldId }): string {
    return `${type}_${missionId}_${mainFieldId}`;
  }

  public redis: RedisAdapter;
  public config: RedisConfig;
  private promises: Array<Promise<RedisReturnCB>> = [];
  setManager: SetManager;
  getM: GetMission;
  getE: GetEntities;

  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
    this.config = this.redis.config;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.redis.initClientConnection()
          .then((res: any) => {
            this.setManager = new SetManager(this.redis);
            this.getM = new GetMission(this.redis);
            this.getE = new GetEntities(this.redis);
            resolve(res);
          });
    });
  }

  setMissionsOrEntities(batch: Map<string, Array<RedisSetFormat>>) {
    return new Promise((resolve, reject) => {
      this.setManager.writeBatchToRedis(batch)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }

  public getMission(missionMap: Map<string, RedisQueryGetMission>, max, min): Promise<Map<string, number>> {
    return new Promise((resolve, reject) => {
      missionMap.forEach((mission) => {
        this.atomicGetMission(mission, max, min);
      });
      this.exec()
          .then((res: Array<RedisReturnCB>) => {
            // console.log(res);
            resolve(Parser.fromRedisArrayToMap(res[0].argsToResolve, res[0].response));
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }

  private atomicGetMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max: number, min: number): Array<Promise<RedisReturnCB>> {
    const redisKey = CashHandler.rediskeyConvertor({ type, missionId, mainFieldId });
    return this.promises.push(this.getM.getMission(redisKey, max, min, missionId));
  }

  public getEntities(arrayOfQueries: Map<string, RedisQuestion>): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.atomicGetEntities(arrayOfQueries);
      this.exec()
          .then((res: Array<RedisReturnCB>) => {
            const entityMap = this.getE.createObjectOfEntity(res);
            resolve(entityMap);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }

  private atomicGetEntities(arrayOfQueries: Map<string, RedisQuestion>): Array<Promise<RedisReturnCB>> {
    return this.promises.push(...this.getE.getBatchOfEntities(arrayOfQueries));
  }

  private cleanPromisesArray(): void {
    this.promises = [];
  }

  private exec(): Promise<Array<RedisReturnCB>> {
    return new Promise((resolve, reject) => {
      this.redis.execData()
          .then(() => {
            Promise.all(this.promises)
                .then((res) => {
                  this.cleanPromisesArray();
                  // console.log('exec:');
                  // console.log(res);
                  resolve(res);
                });
          })
          .catch((err) => {
            console.log(err);
          });
    });
  }

  static splitToChunksOfQueries<T>(array: Array<T>, numberOfEntitiesInChunk: number): Array<Array<T>> {
    const arrayOfChunks = [];
    while (array.length) {
      arrayOfChunks.push(array.splice(0, numberOfEntitiesInChunk));
    }
    return arrayOfChunks;
  }

  private createQuery(entityId, missionId, options ?): RedisQuestion {
    // todo options
    const entityQuery: RedisQuestion = {
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
    return entityQuery;
  }


  public generatedEntitiesToMission(missionMap: Map<string, RedisQueryGetMission>, max, min) {
    return new Promise((resolve, reject) => {
      this.getMission(missionMap, max, min)
          .then((missionsArray: any) => {
            const entityQueue: Map<string, RedisQuestion> = new Map();
            missionsArray.forEach((val, missionId) => {
              val.map((entityId) => {
                // console.log(entityId);
                const queryInput = this.createQuery(entityId, missionId);
                entityQueue.set(entityId.key.split('_').pop(), queryInput);
              });
            });

            // todo: check the chunk function.
            // const arrayOfChunks = CashHandler.splitToChunksOfQueries(entityQueue, 2);
            // arrayOfChunks.forEach((chunk: Array<RedisQuestion>) => {
            // console.log(chunk);
            this.getEntities(entityQueue)
                .then((chunkEntities) => {
                  resolve(chunkEntities);
                })
                .catch(err => {
                  console.log(err);
                  reject(err);
                });

            // });
          });
    });
  }

  public updateFields(update: Map<string, Array<RedisSetFormat>>): void {
    update.forEach((val , key) => {
      this.setManager.writeEntityToRedis(val);
    });


  }
}

