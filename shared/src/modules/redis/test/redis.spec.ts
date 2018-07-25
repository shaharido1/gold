import { expect } from 'chai';
import { RedisClient } from 'redis';
import { DockerAdapter } from '../../dockerode/dockerAdapter';
import { GoldDbService } from '../GoldDbService';
import {
  RedisDataType,
  RedisEntity,
  RedisInterceptionCoreFields,
  RedisInterceptionMissionRelatedFields,
  RedisInterceptionQuery
} from '../model/dbInterface';


enum settings {
  Environment = 'config_env',
  CustomPath = '../redis/test/custom.json'
}


const batch: Array<RedisEntity> = [
  {
    type: RedisDataType.interception, entityId: '1234564',
    mainField: RedisInterceptionCoreFields.static,
    redisInput: [
      { subField: 'name', value: 'ido' },
      { subField: 'surName', value: 'shahar' },
      { subField: 'address', value: '{City: "Tel-Aviv"}' }
    ]
  },
  {
    type: RedisDataType.interception, entityId: '1234564',
    mainField: RedisInterceptionCoreFields.dynamic,
    redisInput: [
      { subField: 'location1', value: 'here' },
      { subField: 'location1', value: 'there' }
    ]
  },
  {
    type: RedisDataType.interception, entityId: '1234564',
    mainField: RedisInterceptionMissionRelatedFields.related_missions,
    redisInput: [
      { subField: 'M_12321', value: 'T' },
      { subField: 'M_12541', value: 'T' }
    ]
  },
  {
    type: RedisDataType.interception, entityId: '1234564',
    mainField: RedisInterceptionMissionRelatedFields.rank,
    redisInput: [
      { subField: 'M_12321', value: '2' },
      { subField: 'M_12541', value: '6' }
    ]
  },
  {
    type: RedisDataType.interception, entityId: '1234564',
    mainField: RedisInterceptionMissionRelatedFields.tags,
    redisInput: [
      { subField: 'M_12321', value: '[tag1,tag2,tag3]' },
      { subField: 'M_12541', value: '[tag1,tag4]' }
    ]
  },
  {
    type: RedisDataType.mission,
    entityId: '12321',
    redisInput: [
      { subField: 'E_1234564', value: 'T' },
      { subField: 'E_1235231', value: 'T' }
    ]
  },
  {
    type: RedisDataType.mission,
    entityId: '12541',
    redisInput: [
      { subField: 'E_1234564', value: 'T' },
      { subField: 'E_9999999', value: 'T' }
    ]
  }
];

let dbService: GoldDbService;
let redisDocker: DockerAdapter;


describe('Test redis Adapter.', () => {

  before((done) => {
    redisDocker = new DockerAdapter();
    redisDocker.startContainer('redis')
        .then(() => {

              done();
            }
        );
  });


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


  it('redis connection', (done) => {

    dbService.connectToDataBase()
        .then((status: string) => {
          expect(status).to.equal('redis is ready');
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
          expect(res.length).is.equal(batch.length);
          expect(res.every(memmber => memmber === 'OK')).is.true;
          done();
        }).catch(e => console.log(e));

  });

  const mission = [{
        type: RedisDataType.mission,
        entityId: '333',
        coreFields: [{ type: RedisInterceptionCoreFields.static, entityId: '1245' }, '1221245']
      }
      ]
  ;

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



