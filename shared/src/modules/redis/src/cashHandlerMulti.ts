import { CashHandler } from './cashHandler';
import { RedisDataType, RedisQueryGetInterception, RedisQueryGetMission } from './entity/redisQuer';


export class CashHandlerMulti {

  cashHandler: CashHandler;

  constructor() {
    this.cashHandler = new CashHandler();
  }

  public getFieldsOfMission({ type, missionId, mainFieldId }: RedisQueryGetMission, max, min) {
    return new Promise((resolve, reject) => {
      this.cashHandler.getMission({ type, missionId, mainFieldId }, max, min)
          .then((entityIds: Array<string>) => {
            this.cashHandler.mapHashFields = new Map();
            this.cashHandler.mapSetFields = new Map();
            const entityQueue: Array<RedisQueryGetInterception> = [];

            entityIds.forEach((entityId) => {
              const query = this.createQuery(entityId, missionId);
              entityQueue.push(query);
            });
            const arrayOfChunks = this.splipToChunksOfQueries(entityQueue, 2);

            arrayOfChunks.forEach((chunk) => {
              // console.log(chunk);
              this.cashHandler.getDataFromBatchOfEntities(chunk)
                  .then((a) => {
                    console.log('res');
                    console.log(a);
                    console.log('\n');

                    // console.log(response);
                    // const missionAnswer = this.createObנjectOfEntity(response);
                    // resolve(a);
                    // resolve(missionAnswer);
                  });

            });


          }).catch(err => console.log(err));
    });
  }

  private splipToChunksOfQueries(array: Array<any>, numberInChunk: number): Array<any> {
    const arrayOfChunks = [];
    while (array.length) {
      arrayOfChunks.push(array.splice(0, 2));
    }
    return arrayOfChunks;
  }


  private createQuery(entityId, missionId, options?) {
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

}