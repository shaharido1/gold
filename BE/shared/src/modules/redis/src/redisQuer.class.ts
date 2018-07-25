import { EntityQueryInterface, RedisQuerInterface, StaticFields } from './goldDbService';
import { RedisDataType } from './model/dbInterface';


export class RedisQuer {
  type: RedisDataType ;
  entityId: string;
  missionId: string;
  entFields: EntityQueryInterface = {
    static : {
      address: true,
      sureName: true,
      name: true
    },
    dynamic: undefined,
    rank: true,
    tag: true
  };

constructor(redisQuer ? : RedisQuerInterface) {
  if (redisQuer) {
    if (redisQuer.entFields) {
      this.entFields = redisQuer.entFields;
    }
    this.missionId = redisQuer.missionId;
    this.type = redisQuer.type;
    this.entityId = redisQuer.entityId
  }
  else {
    this.generateRandom();
  }

  }
  generateRandom() {

    // this.entityId = Math.random()

  }

}
