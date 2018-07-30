import { RedisAdapter } from './redisAdapter';
import { RedisInterceptionCoreFields, RedisQuestion, RedisReturnCB } from './entity/redisQuer';
import { Parser } from './parser';
import { GetRangeSorted } from './cashHandler';

export enum RedisGetTypes {
  set = 'set',
  hashMap = 'hashMap'
}

export enum RedisAnswerTypes {
  object = 'object',
  missionId = 'missionId',
  entityId = 'entityId'
}


export type SomeFields = Map<string, { entityId: string, mainField: string, subFields: Array<string>, missionId?: string }>;
export type SetFields = Map<string, { entityId: string, mainField: string, missionId?: string }>;

export class GetEntities {

  private redis: RedisAdapter;
  private mapSetFields: SetFields;
  private mapHashFields: SomeFields;


  constructor(redis?: RedisAdapter) {
    this.redis = redis;
    this.mapSetFields = new Map();
    this.mapHashFields = new Map();
  }


  public getBatchOfEntities(ArrayOfQueries: Map<string, RedisQuestion>): Array<Promise<RedisReturnCB>> {
    this.mapSetFields = new Map();
    this.mapHashFields = new Map();
    ArrayOfQueries.forEach(query => this.redisKeyBuilder(query));
    return [...this.getSetFields(), ...this.getHashMapFields()];

  }


  private redisKeyBuilder(obj): void {
    Object.keys(obj).forEach(key => {
      const redisKey = obj.type + '_' + obj.entityId + '_' + key;
      switch (key) {
        case RedisInterceptionCoreFields.dynamic:
          this.mapSetFields.set(redisKey, {
            entityId: obj.entityId,
            mainField: key,
            missionId: obj.missionId
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
        default :
          break;
      }
    });
  }

  private getHashMapFields(someFields: SomeFields = this.mapHashFields): Array<Promise<RedisReturnCB>> {
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

  private getSetFields(setFields: SetFields = this.mapSetFields): Array<Promise<RedisReturnCB>> {
    const promises = [];
    setFields.forEach((value, redisKey) => {
      promises.push(this.redis.getRangeSetByScoreHighToLow(redisKey, '+inf', '-inf', GetRangeSorted.withscores,
          GetRangeSorted.limit, GetRangeSorted.zero, GetRangeSorted.tenThousand, {
            type: RedisGetTypes.set,
            redisKey
          }));
    });
    return promises;
  }


  public createObjectOfEntity(arr: Array<RedisReturnCB>): any {
    const entityMap: Map<string, any> = new Map();
    if (arr && arr.length) {
      arr.forEach((answer: { argsToResolve: { type: string, redisKey: string }, response: any }) => {
        if (answer.argsToResolve && answer.argsToResolve.type && answer.argsToResolve.redisKey) {
          const redisKey = answer.argsToResolve.redisKey;
          const entityKey = redisKey.split('_')[1];
          const entity = entityMap.get(entityKey) || {};
          switch (answer.argsToResolve.type) {
            case RedisGetTypes.hashMap : {
              const entityQueryFields = this.mapHashFields.get(redisKey);
              const subField = {};
              if (typeof entityQueryFields.subFields === RedisAnswerTypes.object) {
                entityQueryFields.subFields.forEach((f, i) => {
                  subField[f] = answer.response[i];
                });
                entity.static = subField;
              }
              else {
                entity[entityQueryFields.mainField] = answer.response[0];
                // entity[RedisAnswerTypes.missionId] = entityQueryFields.missionId;
                // entity[RedisAnswerTypes.id] = entityQueryFields.id;
              }
              entityMap.set(entityKey, entity);
              break;
            }
            case RedisGetTypes.set: {
              const missionQuestionDataFields = this.mapSetFields.get(redisKey);
              entity[missionQuestionDataFields.mainField] = Parser.fromRedisArrayToMap(missionQuestionDataFields.missionId, answer.response);
              entityMap.set(missionQuestionDataFields.entityId, entity);
              break;
            }
          }
        }
      });
    }
    return entityMap;
  }

}