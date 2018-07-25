import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../../interface/redisConfig';
import {
  RedisDataType,
  RedisInput,
  RedisInterceptionCoreFields,
  RedisQueryGetInterception,
  RedisQueryGetMission,
  RedisQuerySet
} from './entity/redisQuer';

export enum RedisGetTypes {
  set = 'set',
  hashMap = 'hashMap'
}

export enum RedisAnswerTypes {
  object = 'object',
  missionId = 'missionId',
  entityId = 'entityId'
}

export enum GetRangeSorted {
  withscores = 'withscores',
  limit = 'limit',
  zero = 0,
  one = 1,
  tenThousand = 10000

}

export enum SizeOfBatch { size = 2}

export type SomeFields = Map<string, { entityId: string, mainField: string, subFields: Array<string>, missionId?: string }>;
export type SetFields = Map<string, { entityId: string, mainField: string }>;

export class GoldDbService {

  public redis: RedisAdapter;
  public config: RedisConfig;
  mapSetFields: SetFields;
  mapHashFields: SomeFields;

  constructor() {
    this.redis = new RedisAdapter();
    this.config = this.redis.config;
    this.mapSetFields = new Map();
    this.mapHashFields = new Map();
  }

  connectToDataBase() {
    return new Promise((resolve, reject) => {

      this.redis.initClientConnection()
          .then(() => {
                resolve('redis is ready');
              }
          )
          .catch((err) => {
                console.log(err);
                reject(err);
              }
          );
    });
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
    const arr = GoldDbService.redisInputIntoArrayString(entFields);
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


  private static redisInputIntoArrayString(redisInput: Array<RedisInput>) {
    const redisInputArray = [];
    redisInput.forEach(input => {
      redisInputArray.push(input.subField, input.value);
    });
    return redisInputArray;
  }

  private static fromRedisArrayToObject(str): Array<{ key: string, score: number }> {
    const objectOut = [];
    for (let x = 0; x < str.length; x += 2) {
      const tmp = {
        key: str[x],
        score: Math.round(str[x + 1] * 10) / 10
      };
      objectOut.push(tmp);
    }
    return objectOut;
  }


  private redisKeyBuilder(obj): any {
    Object.keys(obj).forEach(key => {
      const redisKey = obj.type + '_' + obj.entityId + '_' + key;
      switch (key) {
        case RedisInterceptionCoreFields.dynamic:
          this.mapSetFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key
          });
          break;
        case RedisInterceptionCoreFields.static:
          const stringFields = [];
          Object.keys(obj[key])
              .forEach(sub => {
                if (obj[key][sub] === true) {
                  stringFields.push(sub);
                }
              });
          this.mapHashFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key,
            subFields: stringFields
          });
          break;
        case RedisInterceptionCoreFields.related_missions:
        case RedisInterceptionCoreFields.rank:
        case RedisInterceptionCoreFields.tags:
          this.mapHashFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key,
            subFields: obj.missionId,
            missionId: obj.missionId
          });
          break;
      }
    });
  }

  getDataFromBatchOfEntities(ArrayOfQueries: Array<RedisQueryGetInterception>): Promise<any> {
    return new Promise((resolve, reject) => {
      const promises = [];
      ArrayOfQueries.forEach(query => {
        this.redisKeyBuilder(query);
        promises.push(...this.getAllEntitiesOfSubFields());
        promises.push(...this.getTopRateFieldOfSet());
      });
      this.redis.execData()
          .then(() => {
            Promise.all(promises).then((response) => {
              // console.log("getDataFromBatchOfEntities")
              console.log('execData');
              console.log(response);
              const missionAnswer = this.createObjectOfEntity(response);
              this.mapHashFields = new Map();
              this.mapSetFields = new Map();
              resolve(response);
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }


  getDataOfEntity(query: RedisQueryGetInterception): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisKeyBuilder(query);
      const promises = [];
      promises.push(...this.getAllEntitiesOfSubFields());
      promises.push(...this.getTopRateFieldOfSet());
      this.redis.execData()
          .then(() => {
            Promise.all(promises).then((response) => {
              // console.log(response);
              const missionAnswer = this.createObjectOfEntity(response);
              this.mapHashFields = new Map();
              this.mapSetFields = new Map();
              resolve(missionAnswer);
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }

  getAllEntitiesOfSubFields(someFields: SomeFields = this.mapHashFields): Array<Promise<any>> {
    const promises = [];
    someFields.forEach(({ subFields }, redisKey) => {
      // console.log(redisKey)
      // console.log(subFields)
      promises.push(this.redis.getValue(redisKey, subFields, {
        redisKey,
        type: RedisGetTypes.hashMap
      }));
    });
    return promises;

  }

  getTopRateFieldOfSet(setFields: SetFields = this.mapSetFields): Array<Promise<any>> {
    const promises = [];
    setFields.forEach((value, redisKey) => {
      promises.push(this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores,
          GetRangeSorted.limit, GetRangeSorted.zero, GetRangeSorted.one, {
            type: RedisGetTypes.set,
            redisKey
          }));
    });
    return promises;
  }

  createObjectOfEntity(arr: Array<{ argsToResolve: { redisKey: string, type: RedisGetTypes }, response: string }>) {
    const newMissionAnswer = {};
    if (arr && arr.length) {
      arr.forEach((answer) => {
        if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.hashMap) {
          const mapHashFieldsValue = this.mapHashFields.get(answer.argsToResolve.redisKey);
          const subField = {};
          if (typeof mapHashFieldsValue.subFields === RedisAnswerTypes.object) {
            mapHashFieldsValue.subFields.forEach((f, i) => {
              subField[f] = answer.response[i];
            });
            newMissionAnswer[mapHashFieldsValue.mainField] = subField;
          }
          else {
            newMissionAnswer[mapHashFieldsValue.mainField] = answer.response;
            newMissionAnswer[RedisAnswerTypes.missionId] = mapHashFieldsValue.missionId;
          }
          newMissionAnswer[RedisAnswerTypes.entityId] = mapHashFieldsValue.entityId;

        }
        else if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.set) {
          const mapSetFieldsValue = this.mapSetFields.get(answer.argsToResolve.redisKey);
          newMissionAnswer[mapSetFieldsValue.mainField] = GoldDbService.fromRedisArrayToObject(answer.response);
        }
      });
    }
    // console.log(newMissionAnswer);
    return newMissionAnswer;

  }

  createQuery(entityId, missionId, options?) {
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
    return entityQuery;
  }


  public getFieldsOfMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max, min) {
    return new Promise((resolve, reject) => {
      this.getMission({ type, missionId, mainFieldId }, max, min)
          .then((entityIds: Array<string>) => {
            this.mapHashFields = new Map();
            this.mapSetFields = new Map();
            const entityQueue: Array<RedisQueryGetInterception> = [];
            entityIds.forEach((entityId, index) => {
              const query = this.createQuery(entityId, missionId);
              entityQueue.push(query);
              if (index === SizeOfBatch.size) {
                this.getDataFromBatchOfEntities(entityQueue)
                    .then((a) => {
                      console.log('res');
                      // console.log(a);
                      // console.log(response);
                      // const missionAnswer = this.createObנjectOfEntity(response);
                      resolve(a);
                      // resolve(missionAnswer);
                    });
              }
            });

          }).catch(err => console.log(err));
    });
  }


  public getMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max, min) {
    return new Promise((resolve, reject) => {
      const redisKey = `${type}_${missionId}_${mainFieldId}`;
      this.redis.getRangeSetByScoreHighToLow(redisKey,
          '+inf',
          '-inf',
          GetRangeSorted.withscores,
          GetRangeSorted.limit, min, max)
          .then((res: any) => {
            const mission = GoldDbService.fromRedisArrayToObject(res);
            resolve(mission);
          });
      this.redis.execData()
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }


  public getTopInRangeOfScore({ type, missionId, mainFieldId }: RedisQueryGetMission, max: number, min: number) {
    return new Promise((resolve, reject) => {
      const redisKey = `${type}_${missionId}_${mainFieldId}`;
      // console.log(redisKey);
      const prom = this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores,
          GetRangeSorted.limit, max, min);
      this.redis.execData()
          .then(() => {
            prom.then((res) => {
              const stretcheredObject = GoldDbService.fromRedisArrayToObject(res);
              resolve(stretcheredObject);
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
    });
  }

}


