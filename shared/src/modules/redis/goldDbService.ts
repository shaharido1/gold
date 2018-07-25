import {
  RedisEntity,
  RedisInput,
  RedisInterceptionQuery,
  RedisQueryCore,
  RedisQueryMissionRelated
} from './model/dbInterface';
import { RedisAdapter } from './redisAdapter';
import { RedisConfig } from '../../interface/redisConfig';

export class GoldDbService {

  public redis: RedisAdapter;
  public config: RedisConfig;

  constructor() {
    this.redis = new RedisAdapter();
    this.config = this.redis.config;
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

  writeBatchToRedis(batch: Array<RedisEntity>): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        batch.forEach(entity => this.writeEntityToRedis(entity)
            .catch(err => {
              console.log('err');
            }));
        this.redis.execData()
            .then((res) => resolve(res))
            .catch(() => reject());
      }
      catch (e) {
        console.log(e);
        return reject(e);
      }
    });
  }

  private writeEntityToRedis({ type, entityId, mainField, redisInput}: RedisEntity): Promise<any> {
      const redisKey = mainField ? `${type}_${entityId}_${mainField}` : `${type}_${entityId}`;
      return this.redis.setMultiFieldsToMultival(redisKey, GoldDbService.redisInputIntoArrayString(redisInput))
  }


  private static redisInputIntoArrayString(redisInput : Array<RedisInput>) {
    const redisInputArray = [];
    redisInput.forEach(input => {
      redisInputArray.push(input.subField, input.value)
    });
    return redisInputArray
  }

  getAllEntityData(redisInterceptionQuery: RedisInterceptionQuery) {
    // this.getAllEntityFields(redisInterceptionQuery);
    // this.getAllEntitySubfields(redisInterceptionQuery);
  }

  getAllEntityFields({ type, entityId, coreFields }: RedisQueryCore): void {
    coreFields.forEach(field => {
      const redisKey = `${type}_${entityId}_${field}`;
      return this.redis.getAllFieldsAndValues(redisKey);
    });
  }

  getAllEntitySubfields({ type, entityId, subField, missionRelatedFields }: RedisQueryMissionRelated) {
    missionRelatedFields.forEach(field => {
      const redisKey = `${type}_${entityId}_${field}`;
      this.redis.getValue(redisKey, subField);
    });
  }


  public getAllSubKeys(key) {
    return new Promise((resolve, reject) => {
      this.redis.getAllFields(key)
          .then(() => {

          });
    });
  }


}


