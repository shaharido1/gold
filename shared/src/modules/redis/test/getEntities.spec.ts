import { expect, assert } from 'chai';
import { RedisAdapter } from '../src/redisAdapter';
import { GetEntities } from '../src/getEntities';
import { oneEntityFromRedis } from './mokData';


let redis: RedisAdapter;
let getEntities: GetEntities;


xdescribe('Test get entities from redis.', () => {


  it('create and connect', (done) => {
    redis = new RedisAdapter();
    redis.initClientConnection()
        .then((status: any) => {
          expect(status).to.be.a('object');
          expect(status.connected).to.be.true;
          getEntities = new GetEntities(redis);
          done();
        })
        .catch((err) => {
          console.log(err);
        });
  });

  it('get batch of entities from redis and exec', () => {
    const promises = getEntities.getBatchOfEntities([oneEntityFromRedis.queryOfEntity1, oneEntityFromRedis.queryOfEntity2]);
    redis.execData()
        .then(() => {
          Promise.all(promises)
              .then((response) => {
                // Todo: fix createObjectOfEntity to return mor thene one object
                const missionAnswer = getEntities.createObjectOfEntity(response);
                console.log(missionAnswer);
                this.mapHashFields = new Map();
                this.mapSetFields = new Map();
                return (missionAnswer);
              });
        });
  });
});

