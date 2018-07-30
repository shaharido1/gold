import { expect, assert } from 'chai';
import { oneMissionFromRedis } from './mokData';
import { RedisAdapter } from '../src/redisAdapter';
import { GetMission } from '../src/getMission';
import { CashHandler } from '../src/cashHandler';


let redis: RedisAdapter;
let getMission: GetMission;


xdescribe('Test get missions from redis.', () => {


  it('create and connect', (done) => {
    redis = new RedisAdapter();
    redis.initClientConnection()
        .then((status: any) => {
          expect(status).to.be.a('object');
          expect(status.connected).to.be.true;
          getMission = new GetMission(redis);
          done();

        })
        .catch((err) => {
          console.log(err);
        });
  });

  it('get missions from redis and exec', () => {
    const promise = [];
    const redisKey = CashHandler.rediskeyConvertor(oneMissionFromRedis.missionQuery1);

    promise.push(getMission.getMission(redisKey, oneMissionFromRedis.max, oneMissionFromRedis.min));
    redis.execData()
        .then(() => {
          Promise.all(promise)
              .then((res) => {
                expect(res).to.deep.equal(oneMissionFromRedis.missionQueryAnswer1);
              });
        });
  });

});

function notOk(err) {
  assert.isNotOk(err, 'Promise error');
}