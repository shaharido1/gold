import { expect, assert } from 'chai';
import { types, missions, entities, getEntities, missionQueryMap, relatedMissionMap, rankMap } from './mokData';
import { CashHandler } from '../src/cashHandler';
import { KeyScore, RedisQuestion } from '../src/entity/redisQuer';

let cashHandler: CashHandler;


describe('Test cash handler db service.', () => {

  // before((done) => {
  //   redisDocker = new DockerAdapter();
  //   redisDocker.checkImageExist('redis').then();
  //   redisDocker.startContainer('redis')
  //       .then(() => {
  //             done();
  //           }
  //       );
  // });


  it('create and connect to cash handler', (done) => {
    cashHandler = new CashHandler();
    cashHandler.connect()
        .then((status: any) => {
          expect(status).to.be.a('object');
          expect(status.connected).to.be.true;
          done();

        })
        .catch((err) => {
          console.log(err);
        });
  });

  it('redis connection to default configuration', (done) => {
    expect(cashHandler.config).to.be.a('object');
    expect(cashHandler.config).to.have.nested.property('config_redisHost');
    expect(cashHandler.config).to.have.nested.property('config_redisPort');
    done();

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

  it('write missions to redis.', () => {
    return cashHandler.setMissionsOrEntities(missions)
        .then(res => {
          // todo expect
          expect(res).to.be.an('array').that.does.not.include(-1);
          console.log(res);
        }).catch(notOk);
  });

  it('write to redis entities', () => {
    return cashHandler.setMissionsOrEntities(entities)
        .then((res: any) => {
          res.forEach((x) => {
            if (typeof x === 'object') {
              expect(x.response).to.be.eql('OK');
            }
            expect(res).to.be.an('array').that.does.not.include(-1);
            console.log(x);
          });

        }).catch(notOk);
  });


  it('get missions', () => {
    return cashHandler.getMission(missionQueryMap, types.max, types.min)
        .then((res: Map<string, number>) => {
          expect(res).not.to.be.a('null');
          expect(res).not.to.be.a('undefined');
          expect(res).not.to.be.an('array').that.is.empty;
          expect(res.has(types.missionId0)).to.be.true;


          res.forEach((val, key) => {
            expect(key).to.eql(types.missionId0);
            val.forEach((subField) => {
              expect(subField).to.be.an(types.object);
              expect(subField).to.have.all.keys('key', 'score');
            });
          });
        }).catch(notOk);
  });


  it('Get entities', () => {
    return cashHandler.getEntities(getEntities)
        .then((res: any) => {
          expect(res).not.to.be.a('null');
          expect(res).not.to.be.a('undefined');
          expect(res).not.to.be.an('array').that.is.empty;
          expect(res.has(types.entity0Id)).to.be.true;

          res.forEach((val) => {
            expect(val).to.have.all.keys('dynamic', 'static', 'rank', 'tags');
          });
        })
        .catch(notOk);
  });


  it('get related entities to missions', () => {
    return cashHandler.generatedEntitiesToMission(relatedMissionMap, types.max, types.min)
        .then((res: any) => {
          expect(res).not.to.be.a('null');
          expect(res).not.to.be.a('undefined');
          expect(res).not.to.be.an('array').that.is.empty;

          console.log(res);
          res.forEach((val) => {
            expect(val).to.have.all.keys('dynamic', 'static', 'rank', 'tags');
          });
          expect(res.has(types.entity0Id)).to.be.true;
          expect(res.has(types.entity1Id)).to.be.true;
          expect(res.has(types.entity2Id)).to.be.true;

        });

  });

  it('update rank', () => {
      return cashHandler.updateFields(rankMap)
  });

});

function notOk(err) {
  assert.isNotOk(err, 'Promise error');
}