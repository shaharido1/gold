"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const dockerAdapter_1 = require("../../dockerode/dockerAdapter");
const GoldDbService_1 = require("../GoldDbService");
const dbInterface_1 = require("../model/dbInterface");
var settings;
(function (settings) {
    settings["Environment"] = "config_env";
    settings["CustomPath"] = "../redis/test/custom.json";
})(settings || (settings = {}));
const batch = [
    {
        type: dbInterface_1.RedisDataType.interception, entityId: '1234564',
        mainField: dbInterface_1.RedisInterceptionCoreFields.static,
        redisInput: [
            { subField: 'name', value: 'ido' },
            { subField: 'surName', value: 'shahar' },
            { subField: 'address', value: '{City: "Tel-Aviv"}' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.interception, entityId: '1234564',
        mainField: dbInterface_1.RedisInterceptionCoreFields.dynamic,
        redisInput: [
            { subField: 'location1', value: 'here' },
            { subField: 'location1', value: 'there' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.interception, entityId: '1234564',
        mainField: dbInterface_1.RedisInterceptionMissionRelatedFields.related_missions,
        redisInput: [
            { subField: 'M_12321', value: 'T' },
            { subField: 'M_12541', value: 'T' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.interception, entityId: '1234564',
        mainField: dbInterface_1.RedisInterceptionMissionRelatedFields.rank,
        redisInput: [
            { subField: 'M_12321', value: '2' },
            { subField: 'M_12541', value: '6' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.interception, entityId: '1234564',
        mainField: dbInterface_1.RedisInterceptionMissionRelatedFields.tags,
        redisInput: [
            { subField: 'M_12321', value: '[tag1,tag2,tag3]' },
            { subField: 'M_12541', value: '[tag1,tag4]' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.mission,
        entityId: '12321',
        redisInput: [
            { subField: 'E_1234564', value: 'T' },
            { subField: 'E_1235231', value: 'T' }
        ]
    },
    {
        type: dbInterface_1.RedisDataType.mission,
        entityId: '12541',
        redisInput: [
            { subField: 'E_1234564', value: 'T' },
            { subField: 'E_9999999', value: 'T' }
        ]
    }
];
let dbService;
let redisDocker;
describe('Test redis Adapter.', () => {
    before((done) => {
        redisDocker = new dockerAdapter_1.DockerAdapter();
        redisDocker.startContainer('redis')
            .then(() => {
            done();
        });
    });
    it('create redis adapter', (done) => {
        dbService = new GoldDbService_1.GoldDbService();
        done();
    });
    it('redis connection to default configuration', (done) => {
        chai_1.expect(dbService.config).to.be.a('object');
        chai_1.expect(dbService.config).to.have.nested.property('config_redisHost');
        chai_1.expect(dbService.config).to.have.nested.property('config_redisPort');
        done();
    });
    it('redis connection', (done) => {
        dbService.connectToDataBase()
            .then((status) => {
            chai_1.expect(status).to.equal('redis is ready');
            done();
        })
            .catch(err => console.error(err));
    });
    // it('redis connection after falling', (done) => {
    //   this.redisDocker.killContainer()
    //       .then(() => {
    //         redisDocker.startContainer('redis')
    //             .then(() => {
    //               done();
    //             });
    //       });
    //
    // });
    it('write to redis', (done) => {
        dbService.writeBatchToRedis(batch)
            .then((res) => {
            chai_1.expect(res.length).is.equal(batch.length);
            chai_1.expect(res.every(memmber => memmber === 'OK')).is.true;
            done();
        }).catch(e => console.log(e));
    });
    const mission = [{
            type: dbInterface_1.RedisDataType.mission,
            entityId: '333',
            coreFields: [{ type: dbInterface_1.RedisInterceptionCoreFields.static, entityId: '1245' }, '1221245']
        }
    ];
    // it('read from redis', (done) => {
    //   redis.getAllEntityFields(mission)
    //       .then((res) => {
    //         expect(res.length).is.equal(batch.length);
    //         expect(res.every(memmber => memmber === 'OK')).is.true;
    //         done();
    //       }).catch(e => console.log(e));
    //
    // });
    // test redis connection from settings.
});
//# sourceMappingURL=redis.spec.js.map