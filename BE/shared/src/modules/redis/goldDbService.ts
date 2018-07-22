import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../interface/redisConfig';
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
  one = 1

}

export type SomeFields = Map<string, { entityId: string, mainField: string, subFields: Array<string>, missionId?: string }>;
export type SetFields = Map<string, { entityId: string, mainField: string }>;
export class GoldDbService {

  public redis: RedisAdapter;
  public config: RedisConfig;
  mapSetFields: SetFields;
  mapSomeFields: SomeFields;

  constructor() {
    this.redis = new RedisAdapter();
    this.config = this.redis.config;
    this.mapSetFields = new Map();
    this.mapSomeFields = new Map();
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
          this.mapSomeFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key,
            subFields: stringFields

          });
          break;
        case RedisInterceptionCoreFields.related_missions:
        case RedisInterceptionCoreFields.rank:
        case RedisInterceptionCoreFields.tags:
          this.mapSomeFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key,
            subFields: obj.missionId,
            missionId: obj.missionId
          });
          break;
      }
    });
  }


  getAllEntityData(query: RedisQueryGetInterception): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisKeyBuilder(query);
      const promises = [];
      promises.push(this.getAllEntitiesSubFields());
      promises.push(this.getTopRateFieldOfSet(this.mapSetFields));
      this.redis.execData()
          .then(() => {
            Promise.all(promises).then((response) => {
              const missionAnswer = this.missionParser(response);
              this.mapSomeFields = new Map();
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

  getAllEntitiesSubFields(someFields : SomeFields = this.mapSomeFields) {
    const promises = [];
    someFields.forEach(({subFields}, redisKey) => {
      promises.push(this.redis.getValue(redisKey, subFields, {
        redisKey,
        type: RedisGetTypes.hashMap
      }));
    });
    return promises;
  }

  getTopRateFieldOfSet(setFields : SetFields = this.mapSetFields) {
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

  missionParser(arr : Array<Array<{argsToResolve : {redisKey: string, type: RedisGetTypes}, response: string}>>) {
    const newMissionAnswer = {};
    arr.forEach((wrapper) => {
      wrapper.forEach((answer) => {
        if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.hashMap) {
          const val = this.mapSomeFields.get(answer.argsToResolve.redisKey);
          const st = {};
          if (typeof val.subFields === RedisAnswerTypes.object) {
            val.subFields.forEach((f, i) => {
              st[f] = answer.response[i];
            });
            newMissionAnswer[val.mainField] = st;
          }
          else {
            newMissionAnswer[val.mainField] = answer.response;
            newMissionAnswer[RedisAnswerTypes.missionId] = val.missionId;
          }
          newMissionAnswer[RedisAnswerTypes.entityId] = val.entityId;

        }
        else if (answer.argsToResolve && answer.argsToResolve.type === RedisGetTypes.set) {
          const val = this.mapSetFields.get(answer.argsToResolve.redisKey);
          newMissionAnswer[val.mainField] = GoldDbService.fromRedisArrayToObject(answer.response);
        }
      });

    });
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
          .then((entityIds : Array<string>) => {
            this.mapSomeFields = new Map();
            this.mapSetFields = new Map();
            entityIds.forEach((entityId) => {
              const query = this.createQuery(entityId, missionId);
              console.log(query);
              console.log('\n');
              this.getAllEntityData(query);
              // .then((entityDetails) => {
              //   console.log(entityDetails);
              // resolve(entityDetails);
              // });
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
      console.log(redisKey);
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


