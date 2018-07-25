"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const goldDbService_1 = require("../src/goldDbService");
const mokData_1 = require("./mokData");
let dbService;
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
        dbService = new goldDbService_1.GoldDbService();
        done();
    });
    it('redis connection to default configuration', (done) => {
        chai_1.expect(dbService.config).to.be.a('object');
        chai_1.expect(dbService.config).to.have.nested.property('config_redisHost');
        chai_1.expect(dbService.config).to.have.nested.property('config_redisPort');
        done();
    });
    it('redis connection', () => {
        return dbService.connectToDataBase()
            .then((status) => {
            chai_1.expect(status).to.equal('redis is ready');
        })
            .catch(err => {
            console.error(err);
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
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
        return dbService.writeBatchToRedis(mokData_1.entity1)
            .then(res => {
            chai_1.expect(res).to.be.ok;
        })
            .catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
    });
    it('write to redis entity2', function () {
        return dbService.writeBatchToRedis(mokData_1.entity2)
            .then(res => {
            chai_1.expect(res).to.be.ok;
        }).catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
    });
    it('write to redis entity3', function () {
        return dbService.writeBatchToRedis(mokData_1.entity3)
            .then(res => {
            chai_1.expect(res).to.be.ok;
        })
            .catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
    });
    it('write to redis missions', function () {
        return dbService.writeBatchToRedis(mokData_1.missions.map(mission => {
            return Object.assign({}, mission, { entityId: mission.missionId });
        })).then(res => {
            chai_1.expect(res).to.be.ok;
        }).catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
    });
    it('Get one mission1 from redis with the top 10,000 score', () => {
        return dbService.getTopInRangeOfScore(mokData_1.oneMissionFromRedis.missionQuery1, mokData_1.oneMissionFromRedis.min, mokData_1.oneMissionFromRedis.max)
            .then((res) => {
            // console.log(res);
            chai_1.expect(res).to.deep.equal(mokData_1.oneMissionFromRedis.missionQueryAnswer1);
        }).catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
    });
    it('Get entity from redis with all marked fields', () => {
        return dbService.getDataOfEntity(mokData_1.oneEntityFromRedis.queryOfEntity1)
            .then((res) => {
            // console.log(res);
            chai_1.expect(res).to.deep.equal(mokData_1.oneEntityFromRedis.queryOfEntity1Answer);
        })
            .catch(err => {
            console.log(err);
            chai_1.assert.isNotOk(err, 'Promise error');
        });
    });
    it('Get mission with all entities fields', () => {
        return dbService.getFieldsOfMission(mokData_1.MissinWithFielsd.mission1, mokData_1.MissinWithFielsd.max, mokData_1.MissinWithFielsd.min)
            .then((res) => {
            console.log(res);
            // expect(res).to.deep.equal(query2Answer);
        })
            .catch(err => {
            chai_1.assert.isNotOk(err, 'Promise error');
            throw err;
        });
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
//# sourceMappingURL=goldDbService.spec.js.map