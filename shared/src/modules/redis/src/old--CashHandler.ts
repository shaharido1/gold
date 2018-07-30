import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../../interface/redisConfig';
import {
  RedisDataType,
  RedisInput,
  RedisInterceptionCoreFields,
  RedisQuestion,
  RedisQueryGetMission,
  RedisSetFormat
} from './entity/redisQuer';
import { Parser } from './parser';


export type SomeFields = Map<string, { entityId: string, mainField: string, subFields: Array<string>, missionId?: string }>;
export type SetFields = Map<string, { entityId: string, mainField: string }>;

export class OldCashHandler {

  public redis: RedisAdapter;
  public config: RedisConfig;
  mapSetFields: SetFields;
  mapHashFields: SomeFields;

  constructor(redis?: RedisAdapter) {
    this.redis = redis || new RedisAdapter();
    this.config = this.redis.config;
    this.mapSetFields = new Map();
    this.mapHashFields = new Map();
  }

  connectToDataBase() {
    return this.redis.initClientConnection();
  }








  // getDataOfEntity(query: RedisQuestion): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.redisKeyBuilder(query);
  //     const promises = [];
  //     promises.push(...this.getAllEntitiesOfSubFields());
  //     promises.push(...this.getTopRateFieldOfSet());
  //     this.redis.execData()
  //         .then(() => {
  //           Promise.all(promises).then((response) => {
  //             // console.log(response);
  //             const missionAnswer = this.createObjectOfEntity(response);
  //             this.mapHashFields = new Map();
  //             this.mapSetFields = new Map();
  //             resolve(missionAnswer);
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           reject(err);
  //         });
  //   });
  // }



}


