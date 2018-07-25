import { expect, assert } from 'chai';
import { GoldDbService } from '../src/goldDbService';
import {
  RedisDataType,
  RedisInterceptionCoreFields, RedisQueryGetInterception,
  RedisQuerySet
} from '../src/entity/redisQuer';
import { DockerAdapter } from '../../dockerode/dockerAdapter';
import {
  entity1,
  entity2,
  entity3,
  MissinWithFielsd,
  missions,
  oneEntityFromRedis,
  oneMissionFromRedis
} from './mokData';
import { error } from 'util';


let dbService: GoldDbService;


describe('Test gold db service.', () => {

  // before((done) => {
  //   redisDocker = new DockerAdapter();
  //   redisDocker.checkImageExist('redis').then();
  //   redisDocker.startContainer('redis')
  //       .then(() => {
  //             done();
  //           }
  //       );
  // });


  it('create redis adapter', (done) => {
    dbService = new GoldDbService();
    done();
  });

  it('redis connection to default configuration', (done) => {
    expect(dbService.config).to.be.a('object');
    expect(dbService.config).to.have.nested.property('config_redisHost');
    expect(dbService.config).to.have.nested.property('config_redisPort');
    done();

  });


  it('redis connection', () => {
    return dbService.connectToDataBase()
        .then((status: string) => {
          expect(status).to.equal('redis is ready');
        })
        .catch(notOk)
  });

  // xit('redis connection after falling', (done) => {
  //   this.redisDocker.killContainer()
  //       .then(() => {
  //         redisDocker.startContainer('redis')
  //             .then(() => {
  //               done();
  //             });
  //       });
  //
  // });

  it('write to redis entity1', function () {
    return dbService.writeBatchToRedis(entity1)
        .then(res => {
          expect(res).to.be.ok;
        })
        .catch(notOk)
  });
  it('write to redis entity2', function () {
    return dbService.writeBatchToRedis(entity2)
        .then(res => {
          expect(res).to.be.ok;
        }).catch(notOk)

  });
  it('write to redis entity3', function () {
    return dbService.writeBatchToRedis(entity3)
        .then(res => {
          expect(res).to.be.ok;
        })
        .catch(notOk)
  });

  it('write to redis missions', function () {
    return dbService.writeBatchToRedis(missions.map(mission => {
      return { ...mission, entityId: mission.missionId };
    })).then(res => {
      expect(res).to.be.ok;
    }).catch(notOk)
  });


  it('Get one mission1 from redis with the top 10,000 score', () => {
    return dbService.getTopInRangeOfScore(oneMissionFromRedis.missionQuery1, oneMissionFromRedis.min, oneMissionFromRedis.max)
        .then((res) => {
          // console.log(res);
          expect(res).to.deep.equal(oneMissionFromRedis.missionQueryAnswer1);
        }).catch(notOk)
  });

  it('Get entity from redis with all marked fields', () => {
    return dbService.getDataOfEntity(oneEntityFromRedis.queryOfEntity1)
        .then((res) => {
          // console.log(res);
          expect(res).to.deep.equal(oneEntityFromRedis.queryOfEntity1Answer);
        })
        .catch(notOk)
  });


  it('Get mission with all entities fields', () => {
    return dbService.getFieldsOfMission(MissinWithFielsd.mission1, MissinWithFielsd.max, MissinWithFielsd.min)
        .then((res) => {
          console.log(res);
          // expect(res).to.deep.equal(query2Answer);
        })
        .catch(notOk)
  });


  // xit('Get mission1 with the Highest score in the set ', (done) => {
  //   const redisKey = 'M_12541_byRank';
  //   const answer = [{ key: 'E_123456444', score: 8.5 }];
  //   dbService.getHighestScore(redisKey)
  //       .then((res) => {
  //         expect(res).to.deep.equal(answer);
  //         done();
  //       });
  // });

  // xit('Get mission1 with range from max to min', (done) => {
  //   const redisKey = 'M_12541_byRank';
  //   const answer = [{ key: 'E_123456444', score: 8.5 },
  //     { key: 'E_123456422', score: 5.5 },
  //     { key: 'E_12345645345', score: 3.9 },
  //     { key: 'E_1234567', score: 0.5 },
  //     { key: 'E_12345634', score: 0.5 },
  //     { key: 'E_1234562', score: 0.5 },
  //     { key: 'E_1234563', score: 0.3 },
  //     { key: 'E_1231321', score: 0.2 },
  //     { key: 'E_1234569', score: 0.1 }
  //   ];
  //
  //   dbService.getTopInRangeOfScore(redisKey, 0, 100)
  //       .then((res) => {
  //         expect(res).to.deep.equal(answer);
  //         done();
  //       });
  // });


});

function notOk(err) {
  assert.isNotOk(err, 'Promise error');
}