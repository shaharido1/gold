import { RedisAdapter } from './redisAdapter';
import { OldCashHandler, SetFields, SomeFields } from './old--CashHandler';
import { RedisInterceptionCoreFields, RedisQueryGetInterception } from './entity/redisQuer';
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
export type SetFields = Map<string, { entityId: string, mainField: string }>;

export class GetEntities {

  private redis: RedisAdapter;
  private mapSetFields: SetFields;
  private mapHashFields: SomeFields;


  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
  }


  public getBatchOfEntities(ArrayOfQueries: Array<RedisQueryGetInterception>): Promise<any> {
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

  private getAllEntitiesOfSubFields(someFields: SomeFields = this.mapHashFields): Array<Promise<any>> {
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

  private getTopRateFieldOfSet(setFields: SetFields = this.mapSetFields): Array<Promise<any>> {
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


  private createObjectOfEntity(arr: Array<{ argsToResolve: { redisKey: string, type: RedisGetTypes }, response: string }>) {
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
          newMissionAnswer[mapSetFieldsValue.mainField] = Parser.fromRedisArrayToObject(answer.response);
        }
      });
    }
    // console.log(newMissionAnswer);
    return newMissionAnswer;

  }


}