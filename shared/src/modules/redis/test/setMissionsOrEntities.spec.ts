import { expect, assert } from 'chai';
import { entity1, entity2, entity3, missions } from './mokData';
import { RedisAdapter } from '../src/redisAdapter';
import { SetManager } from '../src/setManager';


let redis: RedisAdapter;
let setMissionOrEntity: SetManager;


xdescribe('Test write batch to redis.', () => {


  it('create and connect', (done) => {
    redis = new RedisAdapter();
    redis.initClientConnection()
        .then((status: any) => {
          expect(status).to.be.a('object');
          expect(status.connected).to.be.true;
          setMissionOrEntity = new SetManager(redis);

          done();

        })
        .catch((err) => {
          console.log(err);
        });
  });

  it('write to redis entity0', function () {
    return setMissionOrEntity.writeBatchToRedis(entity1)
        .then(res => {
          expect(res).to.be.ok;
        }).catch(notOk);
  });

  it('write to redis entity1', function () {
    return setMissionOrEntity.writeBatchToRedis(entity2)
        .then(res => {
          expect(res).to.be.ok;
        }).catch(notOk);

  });
  it('write to redis entity2', function () {
    return setMissionOrEntity.writeBatchToRedis(entity3)
        .then(res => {
          expect(res).to.be.ok;
        })
        .catch(notOk);
  });

  it('write to redis missions', function () {
    return setMissionOrEntity.writeBatchToRedis(missions.map(mission => {
      return { ...mission, entityId: mission.missionId };
    })).then(res => {
      expect(res).to.be.ok;
    }).catch(notOk);
  });


});

function notOk(err) {
  assert.isNotOk(err, 'Promise error');
}